import { auth } from "@/auth";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { mongoDb } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await mongoDb()
const {cartProducts} = await req.json()
     try {
        
    const productsIds = cartProducts
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({ _id: uniqueIds });

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
            unit_amount: quantity * productInfo.basePrice,
          },
        });
      }
    }
    const orderDoc = await Order.create({
      line_items,
      paid: false,
      userEmail: "userguest@gmail.com"
    });

    
    const StripeSession = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: "userguest@gmail.com",
      success_url: process.env.PUBLIC_URL + "/cart?success=1",
      cancel_url: process.env.PUBLIC_URL + "/cart?cancel=1",
      metadata: { orderId: orderDoc._id.toString()},
    //   shipping_options: [
    //     {
    //       shipping_rate_data: {
    //         display_name: 'shipping fee',
    //         type: 'fixed_amount',
    //         fixed_amount: {
    //           amount: shippingFeeCents, currency: 'USD'
    //         }
    //       },
    //     }
    //   ]
    });
      console.log(orderDoc)
     return NextResponse.json(
        {url: StripeSession.url}
      );
     } catch (err) {
        return NextResponse.json(err);
     }
  }

