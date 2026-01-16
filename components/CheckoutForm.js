"use client";
import React, { useState } from "react";
const CheckoutForm = ({ cartProducts, session }) => {
  const [isLoading, setIsLoading] = useState(false);
  async function goToPayment() {
    if (session) {
      setIsLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartProducts }),
      });
      const data = await response.json();
      if (!response.ok) {
        // Handle error from server
        alert(data.error?.message || "Something went wrong with the payment system")
        throw new Error(
          data.error?.message || "Something went wrong with the payment system"
        );
      }
      const { url } = data;
      if (url) {
        window.location = url;
      }
      setIsLoading(false);
    } else {
      alert("You must sign in firstd!");
    }
  }

  return (
    <div className="w-full m-auto text-center">
      <button
        disabled={isLoading}
        onClick={goToPayment}
        className={`px-2 py-4 w-full bg-tertiary text-primary rounded-sm ${
          isLoading ? "opacity-35" : "opacity-100"
        }`}
      >
        {!isLoading ? "Continue to payment" : "Processing..."}
      </button>
    </div>
  );
};

export default CheckoutForm;
