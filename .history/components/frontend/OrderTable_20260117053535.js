import { formatDateTime } from '@/utils/formatDate';
import React, { useState } from 'react';
import { OrderCard } from './OrderCard';

export const OrderTable = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-h-full">
      <h2 className="text-lg font-semibold mb-4">Order History</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500 text-left">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Date</th>
              <th className="py-2">Total</th>
              <th className="py-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const total = order.line_items.reduce(
                (sum, item) => sum + item.quantity * (item.price_data.unit_amount || 0),
                0
              );
              return (
                <tr
                  key={order._id}
                  className="border-b last:border-0 text-left cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="py-3 font-medium text-left">#{order._id}</td>
                  <td className="text-left">{formatDateTime(order.updatedAt)}</td>
                  <td>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(total / 100)}
                  </td>
                  <td className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        order.paid === true
                          ? 'bg-green-100 text-green-700'
                          : order.paid === false
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.paid ? 'Succeeded' : 'Unpaid'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* OrderCard shows only if a row is clicked */}
      {selectedOrder && (
        <div className="mt-6">
          <OrderCard order={selectedOrder} />
        </div>
      )}
    </div>
  );
};
