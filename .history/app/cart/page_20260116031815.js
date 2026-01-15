import React from "react";

const CartPage = async ({ searchParams }) => {
  // searchParams is already an object
  const  cart  = await searchParams;
  return (
    <div className="w-full text-center flex justify-center h-48 items-center">
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