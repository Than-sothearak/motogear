import React from "react";

export const cartPage = ({ searchParams }) => {
  // Get query parameter
  const { cat } = searchParams;

  console.log("Query param cat:", cat);

  return (
    <div>
      <h1>Cart Page</h1>
      {cat === "success" && <p>✅ Payment successful!</p>}
      {cat && cat !== "success" && <p>Query: {cat}</p>}
    </div>
  );
};


