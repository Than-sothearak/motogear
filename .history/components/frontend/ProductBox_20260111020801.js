import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductBox = ({ productName, basePrice, brandName, imageUrls, slug }) => {
  return (
    <Link href={`/products/${slug}`} className="">

      <div className='relative h-48 bg-white overflow-hidden p-4 rounded-sm hover:scale-105 transition-all duration-300 scale-100 '>
        <Image
          src={imageUrls[0] || "https://images.unsplash.com/photo-1633783714421-332b7f929148?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bm8lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"}
          fill
          alt={productName}
          className="object-contain"
        />
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
    </Link>
  )
}

export default ProductBox