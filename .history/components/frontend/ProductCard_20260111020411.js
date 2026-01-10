import Image from 'next/image'
import React from 'react'
import ProductBox from './ProductBox'

const ProductCard = ({ productName, basePrice, brandName, imageUrls, _id, slug }) => {

  return (
    
      <ProductBox
        productName={productName}
        basePrice={basePrice}
        brandName={brandName}
        imageUrls={imageUrls}
        slug={slug}

      />

  )
}

export default ProductCard