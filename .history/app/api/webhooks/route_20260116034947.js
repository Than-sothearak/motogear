// app/api/webhook/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { mongoDb } from "@/utils/connectDB";
import { Order } from "@/models/Order"; // Your Order model

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  // Get raw body
  const buf = Buffer.from(await req.arrayBuffer());
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
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

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
