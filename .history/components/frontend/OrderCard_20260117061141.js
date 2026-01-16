import { Check } from 'lucide-react';
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
       <div className='text-xs'>
            {order.paid ? <div className='flex items-center text-green-600'><Check size={10}/>Paided</div> : <div className='text-red-600'>Unpaid</div>}
        </div>
 
      </div>

      {/* Line Items Table */}
      <div className="">
        <table className="w-full text-sm ">
          <thead className="">
            <tr>
              <th className="py-2 text-left">Product</th>
              <th className=" text-left px-2 whitespace-nowrap">Price</th>
              <th className="text-center px-2">Qty</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.line_items.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2">{item.price_data.product_data.name}</td>
                <td className=" text-end">{formatPrice(item.price_data.unit_amount)}</td>
                <td className=" text-center">x {item.quantity}</td>
                <td className="text-right font-semibold">
                  {formatPrice(item.quantity * item.price_data.unit_amount)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t font-semibold">
            <tr>
              <td className="text-left" colSpan={3}>
                Total
              </td>
              <td className="text-right">{formatPrice(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
