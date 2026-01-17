"use client"
import { formatDateTime } from '@/utils/formatDate';
import React, { useEffect, useState } from 'react';
import { OrderCard } from './OrderCard';
import { RiCloseLargeLine } from 'react-icons/ri';
import { getOrders } from '@/app/dashboard/@user/page';

export const OrderTable = ({ initialOrders,initialHasMore, page, user }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState(initialOrders)
    const [hasMore, setHasMore] = useState(initialHasMore || true)

     const loadMore = async () => {
    const nextPage = page + 1;
    // Call server action
    const {orders ,hasMore} = await getOrders(nextPage, user);
    if (orders.length > 0) {
      setOrders(prev => [...prev, orders]);
      setPage(nextPage);
      setHasMore(hasMore);
    } else {
      setHasMore(false);
    }
  };

    return (
        <div className="relative bg-white border rounded-xl shadow p-6 w-full max-h-full">
            <h2 className="text-lg font-semibold mb-4">Order History</h2>

            <div className="overflow-x-auto whitespace-nowrap">
                <table className="w-full text-sm max-sm:overflow-x-scroll max-w-full">
                    <thead>
                        <tr className="border-b text-gray-500 text-left">
                            <th className="text-left py-2 px-2">Order ID</th>
                            <th className="text-left py-2  px-2">Date</th>
                            <th className="py-2  px-2">Total</th>
                            <th className="py-2  px-2 text-right">Status</th>
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
                                    <td className="py-3  px-2 font-medium text-left">#{order._id}</td>
                                    <td className="text-left  px-2">{formatDateTime(order.updatedAt)}</td>
                                    <td>
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        }).format(total / 100)}
                                    </td>
                                    <td className="text-right  px-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs ${order.paid === true
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

            {/* Absolute OrderCard Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-96 max-sm:w-full bg-white shadow-xl transform transition-transform duration-500 ease-in-out z-50
          ${selectedOrder ? 'translate-x-0' : 'translate-x-full'}
        `}
            >
                {selectedOrder && (
                    <>
                        {/* Close button */}
                        <div className="flex justify-between p-4 border-b">
                            <h3 className="text-xl font-semibold uppercase">Order</h3>
                            <button onClick={() => setSelectedOrder(null)}>
                                <RiCloseLargeLine size={24} />
                            </button>
                        </div>

                        {/* OrderCard content */}
                        <div className="p-4 overflow-y-auto h-full">
                            <OrderCard order={selectedOrder} />
                        </div>
                    </>
                )}
            </div>

            {/* Optional overlay when panel is open */}
            {selectedOrder && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40"
                    onClick={() => setSelectedOrder(null)}
                ></div>
            )}

        {/* Load More Button */}
      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-4 px-4 py-2 border text-primarytext rounded "
        >
    how More
        </button>
      )}
    </div>
      
    );
};

