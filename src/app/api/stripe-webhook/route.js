import { NextResponse } from "next/server";
import { constructWebhookEvent } from "@/lib/stripe";
import { updateUserPaymentStatus, syncUserToSupabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe signature" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event;
    try {
      event = constructWebhookEvent(body, signature);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const clerkId = session.metadata?.clerkId;
        const customerEmail = session.customer_email;

        if (!clerkId) {
          console.error("No clerkId in session metadata");
          break;
        }

        // Ensure user exists in Supabase
        await syncUserToSupabase(clerkId, customerEmail);

        // Update payment status
        await updateUserPaymentStatus(
          clerkId,
          session.payment_intent,
          session.amount_total
        );

        console.log(`Payment successful for user ${clerkId}`);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.error(`Payment failed for PaymentIntent ${paymentIntent.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
