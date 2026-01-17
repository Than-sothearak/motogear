import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function cartPage({ searchParams }) {
  const sessionId = searchParams.success;

  if (!sessionId) {
    return <p>Invalid session</p>;
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product"],
  });

  if (session.payment_status !== "paid") {
    return <p>Payment not completed</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Congratulations! Payment Successful
      </h1>

      <h2 className="text-xl font-semibold mb-3">Your Order</h2>

      <ul className="space-y-3">
        {session.line_items.data.map(item => (
          <li
            key={item.id}
            className="flex justify-between border rounded p-3"
          >
            <span>
              {item.price.product.name} × {item.quantity}
            </span>
            <span>
              ${(item.amount_total / 100).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 font-bold text-lg">
        Total Paid: ${(session.amount_total / 100).toFixed(2)}
      </p>
    </div>
  );
}
