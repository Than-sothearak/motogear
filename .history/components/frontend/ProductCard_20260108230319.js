import React from 'react'

const ProductCard = ({item}) => {
  return (
     <div
              key={item._id}
              className="min-w-[260px] flex-shrink-0 rounded-md hover:shadow-lg transition"
            >
              <div className="relative h-56 bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gray-300" />
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 uppercase">
                  New
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold group-hover:underline">
                  {item?.productName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item?.brandName}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold">$249</span>
                  <button className="text-sm font-semibold uppercase hover:underline">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
  )
}

export default ProductCard