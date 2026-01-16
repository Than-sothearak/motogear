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
    name: item.name,
    color: item.color,
    size: item.size,
    quantity: (variantMap[key]?.quantity || 0) + (item.quantity || 1)
  };
}
console.log(variantMap)
    const groupedVariants = Object.values(variantMap);
    const productIds = [...new Set(groupedVariants.map(v => v.productId))];

    const products = await Product.find({
      _id: { $in: productIds }
    });

    let line_items = [];

    for (const item of groupedVariants) {
      const product = products.find(
        p => p._id.toString() === item.productId
      );

      const variant = product?.variants.find(
        v => v.color === item.color && v.size === item.size
      );

      if (!variant) {
        throw new Error("Variant not found");
      }

      if (variant.stock < item.quantity) {
        throw new Error(
          `Not enough stock for ${product.productName} (${item.color} / ${item.size})`
        );
      }

      line_items.push({
        quantity: item.quantity,
        price_data: {
          currency: "USD",
          product_data: {
            name: `${product.productName} - ${item.color} / ${item.size}`
          },
          unit_amount: product.basePrice * 100
        }
      });
    }

    console.log(line_items)

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
