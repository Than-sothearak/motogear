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

            <div className="mt-4 border-t pt-4 space-y-2 overflow-y-auto text-sm">
                <div className='flex justify-between text-right'>
                    <div className='text-left'>Product</div>
                    <div className='text-left'>Unit Price</div>
                    <div className=''>Qty</div>
                    <div className=''>Total</div>
                </div>
                {order.line_items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                        <div className=''>
                            <p className="text-sm">{item.price_data.product_data.name}</p>

                        </div>
                        <div className='text-left'>
                            <p className="text-sm">  {formatPrice(item.price_data.unit_amount)} x</p>
                        </div>
                        <div className='text-right'>

                            {item.quantity}
                        </div>
                        <div className='text-right'>
                            <p className="font-semibold">{formatPrice(item.quantity * item.price_data.unit_amount)}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};
