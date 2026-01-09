import { getProductsGroupedByParent } from '@/actions/products'
import ProductBox from '@/components/frontend/ProductBox'
import ProductSlideCard from '@/components/frontend/ProductSlideCard'
import { Product } from '@/models/Product'
import React from 'react'

const categoriesPage = async () => {

    const groupedProducts = JSON.parse(JSON.stringify(await getProductsGroupedByParent()))
  return (
    <div className='w-full bg-primary mx-auto h-full flex gap-10 flex-col'>
      <div className='container mx-auto mt-10 space-y-10 bg-primary px-2'>
        <div>
          <h1 className='font-bold text-3xl uppercase'>All Categories</h1>
        </div>

           {groupedProducts &&
          groupedProducts.map((category, index) => (
            <ProductSlideCard key={category._id} category={category} />
          ))}

      </div>
    </div>
  )
}

export default categoriesPage