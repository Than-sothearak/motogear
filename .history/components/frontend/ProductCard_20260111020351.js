import Image from 'next/image'
import React from 'react'
import ProductBox from './ProductBox'

const ProductCard = ({ productName, basePrice, brandName, imageUrls, _id, slug }) => {

  return (
    <div
      key={_id}
      className=" flex-shrink-0 rounded-md hover:shadow-lg transition"
    >
      <ProductBox
        productName={productName}
        basePrice={basePrice}
        brandName={brandName}
        imageUrls={imageUrls}
        slug={slug}

      />

    </div>
  )
}

export default ProductCard