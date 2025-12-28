"use client";
import { useEffect, useState } from "react";

export default function ReceiptPage() {
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("paymentInfo"));
    setReceipt(data);
  }, []);

  if (!receipt) return <p>Loading receipt...</p>;

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-6 rounded shadow text-sm font-mono">
      <div className="text-center border-b pb-4 mb-4">
        <h2>Welcome to my shop</h2>
        <h1 className="text-xl font-bold">Receipt</h1>
        <p className="text-gray-500 text-xs">
          {new Date(receipt.date).toLocaleString()}
        </p>
      </div>

      <div className="mb-2">
        <p>
          <strong>Customer ID:</strong> {receipt.customerID}
        </p>
        <p>
          <strong>Phone:</strong> {receipt.customerPhone}
        </p>
      </div>

      <div className=" pb-2 mb-2">
        <table className="">
          <thead className="">
            <tr className="w-full flex justify-between">
              <th className="w-full border-b">Items</th>
              <th className="w-1/2 border-b">Qty</th>
              <th className="w-1/3 border-b text-start">Price</th>
            </tr>
          </thead>
          <tbody>

        {receipt.items.map((item, idx) => (
          <tr key={idx} className="flex justify-between text-sm w-full">
            <td className="w-full border-b">
            
              {item.productName} 
           
            </td>
            <td className="w-1/2 border-b text-center">x {item.quantity}</td>
            <td className="w-1/3 border-b text-start">${(item.quantity * item.price).toFixed(2)}</td>
          </tr>
        ))}
           
          </tbody>
        </table>
       
      </div>

      <div className="flex justify-between text-base font-bold mb-1">
        <span>Total</span>
        <span>${receipt.totalAmount}</span>
      </div>

      <div className="text-center mt-4 text-xs text-gray-600">
        <p>Payment Method: {receipt.paymentMethod}</p>
        <p>Status: {receipt.paymentStatus}</p>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => window.print()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          🖨️ Print
        </button>
      </div>
    </div>
  );
}
