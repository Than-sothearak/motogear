import { auth } from "@/auth";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { mongoDb } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await mongoDb();
  const { cartProducts } = await req.json();
  try {
 const variantMap = {};

for (const item of cartProducts) {
  const key = `${item._id}-${item.color}-${item.size}`;

  variantMap[key] = {
    productId: item._id,
    color: item.color,
    size: item.size,
    quantity: (variantMap[key]?.quantity || 0) + 1
  };
}

const groupedVariants = Object.values(variantMap);

    let line_items = [];
    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(
        (p) => p._id.toString() === productId
      );
      const quantity =
        productsIds.filter((id) => id === productId)?.length || 0;
      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: "USD",
            product_data: { name: productInfo.productName },
            unit_amount: quantity * productInfo.basePrice * 100,
          },
        });
      }
    }
    const session = await auth()
    const orderDoc = await Order.create({
      line_items,
      paid: false,
      userEmail: session.user.email,
    });

    try {
      // const StripeSession = await stripe.checkout.sessions.create({
      //   line_items,
      //   mode: "payment",
      //   customer_email: session.user.email,
      //   success_url: process.env.PUBLIC_URL + "/cart?success=1",
      //   cancel_url: process.env.PUBLIC_URL + "/cart?cancel=1",
      //   payment_intent_data: {
      //     metadata: { orderId: orderDoc._id.toString() }
      //   },
      //   metadata: { orderId: orderDoc._id.toString() },
      //   //   shipping_options: [
      //   //     {
      //   //       shipping_rate_data: {
      //   //         display_name: 'shipping fee',
      //   //         type: 'fixed_amount',
      //   //         fixed_amount: {
      //   //           amount: shippingFeeCents, currency: 'USD'
      //   //         }
      //   //       },
      //   //     }
      //   //   ]
      // });
      // return NextResponse.json({ url: StripeSession.url });
    } catch (error) {
      // Format the error for client consumption
      const errorMessage =
        error.param === "success_url"
          ? "Invalid URL: Please make sure all website URLs include http:// or https://"
          : error.message || "An error occurred with the payment system";
      return NextResponse.json(
        {
          error: {
            message: errorMessage,
            code: error.code,
            type: error.type,
          },
        },
        { status: 400 }
      );
    }
  } catch (err) {
    return NextResponse.json(err);
  }
}
