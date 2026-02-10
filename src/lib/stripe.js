import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create a Stripe checkout session for one-time payment
 */
export async function createCheckoutSession({
  priceId,
  clerkId,
  customerEmail,
  successUrl,
  cancelUrl,
  metadata = {},
}) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_email: customerEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      clerkId,
      ...metadata,
    },
  });

  return session;
}

/**
 * Create a Stripe checkout session for subscription
 */
export async function createSubscriptionSession({
  priceId,
  clerkId,
  customerEmail,
  successUrl,
  cancelUrl,
  metadata = {},
}) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_email: customerEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      clerkId,
      ...metadata,
    },
  });

  return session;
}

/**
 * Retrieve a checkout session by ID
 */
export async function getCheckoutSession(sessionId) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer"],
  });

  return session;
}

/**
 * Construct and verify Stripe webhook event
 */
export function constructWebhookEvent(body, signature) {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}

/**
 * Get customer by email
 */
export async function getCustomerByEmail(email) {
  const customers = await stripe.customers.list({
    email,
    limit: 1,
  });

  return customers.data[0] || null;
}

/**
 * Create or retrieve a customer
 */
export async function getOrCreateCustomer(email, clerkId) {
  const existingCustomer = await getCustomerByEmail(email);

  if (existingCustomer) {
    return existingCustomer;
  }

  const customer = await stripe.customers.create({
    email,
    metadata: {
      clerkId,
    },
  });

  return customer;
}
