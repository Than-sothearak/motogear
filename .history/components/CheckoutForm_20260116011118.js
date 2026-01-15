"use client"
import React from 'react'

const CheckoutForm = ({ cartProducts, session }) => {
 
    async function goToPayment() {
        if (session) {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({cartProducts}),
            });
          console.log(response)
            if (response.data.url) {
                window.location = response.data.url;
            }
        } else {
            alert("You must sign in firstd!");
        }
    }

    return (
        <div className='w-full m-auto text-center'>
            <button onClick={goToPayment} className='px-2 py-4 w-full bg-tertiary text-primary rounded-sm '>Continue to payment</button>
        </div>
    )
}

export default CheckoutForm