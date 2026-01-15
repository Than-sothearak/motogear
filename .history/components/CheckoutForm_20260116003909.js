"use client"
import React from 'react'

const CheckoutForm = ({ cartProducts,session }) => {

    async function goToPayment() {
        if (session) {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cartProducts }),
            });

            if (response.data.url) {
                window.location = response.data.url;
            }
        } else {
            alert("You must sign in first!");
        }
    }

    return (
        <button onClick={goToPayment}>Continue to payment</button>
    )
}

export default CheckoutForm