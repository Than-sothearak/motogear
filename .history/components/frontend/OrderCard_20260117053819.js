import React, { useState } from 'react';

export const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);

  // Calculate total
  const total = order.line_items.reduce(
    (sum, item) => sum + item.quantity * (item.price_data.unit_amount || 0),
    0
  );

  const formatPrice = (cents) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

  return (
    <div className="border rounded-lg shadow-md p-4 mb-4 bg-white">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <h3 className="text font-semibold">Order ID: {order._id}</h3>
          <p className="text-sm text-gray-500">User: {order.userEmail}</p>
        </div>
      
      </div>

  
        <div className="mt-4 border-t pt-4 space-y-2 max-h-64 overflow-y-auto">
          {order.line_items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.price_data.product_data.name}</p>
                <p className="text-sm text-gray-500">
                  {item.price_data.product_data.metadata?.color} /{' '}
                  {item.price_data.product_data.metadata?.size}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">{item.quantity} × {formatPrice(item.price_data.unit_amount)}</p>
                <p className="font-semibold">{formatPrice(item.quantity * item.price_data.unit_amount)}</p>
              </div>
            </div>
          ))}
        </div>
  
    </div>
  );
};
