// app/api/webhook/route.js
import Stripe from "stripe";
import { buffer } from "micro";
import { NextResponse } from "next/server";
import { mongoDb } from "@/utils/connectDB";
import { Order } from "@/models/Order"; // Your Order model

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// App Router requires raw body for Stripe
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const buf = await buffer(req); // get raw body
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  console.log("✅ Webhook received:", event.id, "Type:", event.type);

  // Connect to MongoDB
  await mongoDb();

  // Handle events
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("Checkout session completed:", session.id);

      // Mark order as paid
      if (session.metadata?.orderId) {
        try {
          await Order.updateOne(
            { _id: session.metadata.orderId },
            { $set: { paid: true, stripeSessionId: session.id } }
          );
          console.log("Order marked as paid:", session.metadata.orderId);
        } catch (err) {
          console.error("Error updating order:", err);
        }
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
