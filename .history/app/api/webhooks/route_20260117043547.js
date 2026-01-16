// app/api/webhook/route.js
import Stripe from "stripe";
import { buffer } from "micro";
import { NextResponse } from "next/server";
import { mongoDb } from "@/utils/connectDB";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const buf = Buffer.from(await req.arrayBuffer());
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
      const lineItems = await stripe.checkout.sessions.listLineItems(
  session.id
);
console.log(stripe.checkout.sessions.lineItems)
      // Mark order as paid
      if (session.metadata?.orderId) {
        try {
          await Order.updateOne(
            { _id: session.metadata.orderId },
            { $set: { paid: true, stripeSessionId: session.id, } }
          );
          console.log("Order marked as paid:", session.metadata.orderId);
        } catch (err) {
          console.error("Error updating order:", err);
        }
      }
      // for (const item of session.line_items.data) {
      //   const { productId, color, size } = item.price.product.metadata;

      //   await Product.updateOne(
      //     {
      //       _id: productId,
      //       "variants.color": color,
      //       "variants.size": size
      //     },
      //     {
      //       $inc: { "variants.$.stock": -item.quantity }
      //     }
      //   );
      // }

      break;

    case "payment_intent.payment_failed":
      console.log("Payment failed:", event.data.object.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
