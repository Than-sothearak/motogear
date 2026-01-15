import React from "react";

const cartPage = async ({ searchParams }) => {
  // Get query parameter
  const  cart  = await searchParams;

  console.log("Query param cart:", cart);

  return (
    <div className="container m-auto">
      <h1>Cart Page</h1>
      {cart === "success=1" && <p>✅ Payment successful!</p>}
      {cart && cart !== "success" && <p>Query: {cart}</p>}
    </div>
  );
};


export default cartPage;