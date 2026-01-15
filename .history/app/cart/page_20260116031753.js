import React from "react";

const CartPage = async ({ searchParams }) => {
  // searchParams is already an object
  const  cart  = await searchParams;

  console.log(cart.cancel);

  return (
    <div className="w-full text-center flex justify-center h-48">
      <div>
        {cart.sccuess === "1" ? (
          <p>✅ Payment successful!</p>
        ) : (
          <p>❌ Payment canceled or not completed</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;