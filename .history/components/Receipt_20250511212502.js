import React from 'react'

const Receipt = ({ payment }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 text-sm text-gray-800 font-mono">
      <div className="text-center border-b border-gray-300 pb-4 mb-4">
        <h2 className="text-xl font-bold">🧾 Receipt</h2>
        <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleString()}</p>
      </div>

      <div className="mb-4">
        <p><span className="font-semibold">Customer ID:</span> {payment.customerID}</p>
        <p><span className="font-semibold">Phone:</span> {payment.customerPhone}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold border-b border-dashed border-gray-300 pb-1 mb-2">Items</h3>
        <ul className="space-y-1">
          {payment?.items.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.productName} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-300 pt-4 mb-4">
        <div className="flex justify-between text-base font-bold">
          <span>Total</span>
          <span>${payment.totalAmount}</span>
        </div>
      </div>

      <div className="text-xs text-center text-gray-500">
        <p>Payment Method: <span className="font-semibold">{payment.paymentMethod}</span></p>
        <p>Status: <span className={`font-semibold ${payment.paymentStatus === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{payment.paymentStatus}</span></p>
      </div>

      <div className="text-center mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
          onClick={() => window.print()}
        >
          Print
        </button>
      </div>
    </div>
  );
};


export default Receipt