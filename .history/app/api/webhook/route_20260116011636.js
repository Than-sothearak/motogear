import Stripe from "stripe";
import { buffer } from "micro";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // IMPORTANT: Stripe requires raw body
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const buf = await buffer(req); // raw body
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Connect to MongoDB


  // Handle different event types
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      try {
        // Update your order as paid
        // await Order.updateOne(
        //   { _id: session.metadata.orderId },
        //   {
        //     $set: {
        //       paid: true,
        //       stripeSessionId: session.id,
        //     },
        //   }
        // );

        // console.log("Order marked as paid:", session.metadata.orderId);
      } catch (err) {
        console.error("Error updating order:", err);
      }
      break;

    case "payment_intent.payment_failed":
      console.log("Payment failed:", event.data.object.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
