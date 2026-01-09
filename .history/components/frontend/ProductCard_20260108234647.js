import Image from 'next/image'
import React from 'react'

const ProductCard = ({ productName, basePrice, brandName, imageUrls }, _id) => {

  return (
    <div
      key={_id}
      className="w-[260px] flex-shrink-0 rounded-md hover:shadow-lg transition"
    >
      <div className="w-full h-56 rounded-sm p-4">
       <div className='relative h-56 w-11 bg-white overflow-hidden '>
         <Image
          src={imageUrls[0]}
          fill
          alt={productName}
          className="object-containe"
        />
       </div>
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