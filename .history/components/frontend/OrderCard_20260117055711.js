import React from 'react';

export const OrderCard = ({ order }) => {
  // Calculate total
  const total = order.line_items.reduce(
    (sum, item) => sum + item.quantity * (item.price_data.unit_amount || 0),
    0
  );

  const formatPrice = (cents) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-lg font-semibold uppercase">Order ID: #{order._id}</h3>
        <p className="text-sm text-gray-500">User: {order.userEmail}</p>
      </div>

      {/* Line Items Table */}
      <div className="">
        <table className="w-full text-sm border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 text-left">Product</th>
              <th className="py-2 px-3 text-center">Unit Price</th>
              <th className="py-2 px-3 text-center">Qty</th>
              <th className="py-2 px-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.line_items.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2 px-3">{item.price_data.product_data.name}</td>
                <td className="py-2 px-3 text-center">{formatPrice(item.price_data.unit_amount)}</td>
                <td className="py-2 px-3 text-center">{item.quantity}</td>
                <td className="py-2 px-3 text-right font-semibold">
                  {formatPrice(item.quantity * item.price_data.unit_amount)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t font-semibold">
            <tr>
              <td className="py-2 px-3 text-left" colSpan={3}>
                Total
              </td>
              <td className="py-2 px-3 text-right">{formatPrice(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
