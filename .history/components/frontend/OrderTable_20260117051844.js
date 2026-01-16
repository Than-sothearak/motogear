import React from 'react'

export const OrderTable = ({ orders }) => {

    return (
        <div className=" bg-white rounded-xl shadow p-6 min-h-screen w-full col-span-2">
            <h2 className="text-lg font-semibold mb-4">Order History</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b text-gray-500 text-end">
                            <th className="text-left py-2">Order ID</th>
                            <th className=" py-2">Date</th>
                            <th className=" py-2">Total</th>
                            <th className=" py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b last:border-0 text-end">
                                <td className="py-3 font-medium">#{order._id}</td>
                                <td>{order.date}</td>
                                <td className=''>{new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD"
                                }).format(
                                    order.line_items.reduce((sum, item) => {
                                        return sum + item.quantity * (item.price_data.unit_amount || 0);
                                    }, 0) / 100 // divide by 100 because Stripe uses cents
                                )}</td>
                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs ${order.status === "Completed"
                                            ? "bg-green-100 text-green-700"
                                            : order.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {order.paid}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
