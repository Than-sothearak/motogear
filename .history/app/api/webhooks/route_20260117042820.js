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

async function getProductMetadataFromLineItem(lineItem) {
  // Step 1: Retrieve the Price object
  const price = await stripe.prices.retrieve(lineItem.price);

  // Step 2: Retrieve the Product object
  const product = await stripe.products.retrieve(price.product);

  // Step 3: Access the metadata
  return product.metadata;
}
  // Handle events
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("Checkout session completed:", session.id);
      const lineItems = await stripe.checkout.sessions.listLineItems(
  session.id
);
getProductMetadataFromLineItem(lineItems)
  .then(metadata => {
    console.log('Product metadata:', metadata);
  })
  .catch(error => {
    console.error('Error:', error);
  });
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
     
      break;

    case "payment_intent.payment_failed":
      console.log("Payment failed:", event.data.object.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
