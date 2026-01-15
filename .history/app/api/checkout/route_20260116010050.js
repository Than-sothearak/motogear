import { auth } from "@/auth";
import { Product } from "@/models/Product";
import { mongoDb } from "@/utils/connectDB";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
      await mongoDb();
    try {
        console.log(req.cartProducts)
        const {cartProducts} = await req.json()

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
                    product_data: { name: productInfo.title },
                    unit_amount: quantity * productInfo.price * 100,
                },
            });
        }
    }

    const session = await auth()

    // const orderDoc = await Order.create({
    //   line_items,
    //   name,
    //   email,
    //   city,
    //   postalCode,
    //   country,
    //   streetAddress,
    //   paid: false,
    //   userEmail: session?.user?.email,
    // });

    // const shppingFeeSetting = await Setting.findOne({name: 'shippingFee'})
    // const shippingFeeCents = parseInt(shppingFeeSetting.value || '0') * 100;

    const StripeSession = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        customer_email: session.user.email,
        success_url: process.env.PUBLIC_URL + "/cart?success=1",
        cancel_url: process.env.PUBLIC_URL + "/cart?cancel=1",
        // metadata: { orderId: orderDoc._id.toString() },
        // shipping_options: [
        //     {
        //         shipping_rate_data: {
        //             display_name: 'shipping fee',
        //             type: 'fixed_amount',
        //             fixed_amount: {
        //                 amount: shippingFeeCents, currency: 'USD'
        //             }
        //         },
        //     }
        // ]
    });
return NextResponse.json(
     { url: StripeSession.url}
    );
   
    } catch (err) {
        console.log(err)
    }

}
