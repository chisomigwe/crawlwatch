import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { siteConfig } from "@/config/site.config";

export async function POST(request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    // Get optional metadata from request body
    const body = await request.json().catch(() => ({}));
    const { metadata = {} } = body;

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      priceId: siteConfig.pricing.stripePriceId,
      clerkId: userId,
      customerEmail: email,
      successUrl: `${siteConfig.url}/dashboard?success=true`,
      cancelUrl: `${siteConfig.url}/pricing?canceled=true`,
      metadata,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
