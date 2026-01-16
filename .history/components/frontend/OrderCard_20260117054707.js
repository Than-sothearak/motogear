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
        <div className=" p- mb-2 bg-white">
            {/* Header */}
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <div>
                    <h3 className="text font-semibold uppercase">Order ID: #{order._id}</h3>
                    <p className="text-sm text-gray-500">User: {order.userEmail}</p>
                </div>

            </div>

            <div className="mt-4 border-t pt-4 space-y-2 overflow-y-auto">
                <div className='flex justify-between'>
                    <div className='w-full'>Product</div>
                    <div className='w-full'>Qty</div>
                    <div className='w-full'>Product</div>
                </div>
                {order.line_items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                        <div>

                            <p className="text-sm">{item.price_data.product_data.name}</p>
                            <p className="text-sm text-gray-500">

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
