import Image from 'next/image'
import React from 'react'

const ProductCard = ({productName, basePrice, brandName, imageUrls}, _id) => {
 
  return (
     <div
              key={_id}
              className="w-[260px] flex-shrink-0 rounded-md hover:shadow-lg transition"
            >
              <div className="relative h-56 bg-white overflow-hidden">
                <div className="absolute inset-0 " />
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 uppercase z-10">
                  New
                </span>
               {/* <Image src={imageUrls[0]} fill alt={`image ${imageUrls}`} className='object-contain'/> */}
              </div>
              <div className="p-4">
                <h3 className="font-semibold whitespace-nowrap overflow-clip group-hover:underline w-full">
                  {productName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{brandName}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold">${basePrice}</span>
                  <button className="text-sm font-semibold uppercase hover:underline bg-tertiary p-2 text-primary rounded-sm">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
  )
}

export default ProductCard