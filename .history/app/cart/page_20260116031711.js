import React from "react";

const CartPage = async ({ searchParams }) => {
  // searchParams is already an object
  const  success  = await searchParams;

  console.log(success.cancel);

  return (
    <div className="w-full text-center flex justify-center">
      <div>
        {success === "1" ? (
          <p>✅ Payment successful!</p>
        ) : (
          <p>❌ Payment canceled or not completed</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;