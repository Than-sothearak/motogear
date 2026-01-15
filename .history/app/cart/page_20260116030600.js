import React from "react";

const cartPage = async ({ searchParams }) => {
  // Get query parameter
  const  cart  = await searchParams;

  console.log("Query param cart:", cart);

  return (
    <div className="w-full text-center flex justify-center">
      <div>
     
      {cart.success = 1 ? <p>✅ Payment successful!</p> : <p>Cancel</p>}
   
      </div>
    </div>
  );
};


export default cartPage;