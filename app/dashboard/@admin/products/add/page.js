import { getCategories } from '@/actions/categories'
import ProductForm from '@/components/dashboard/product/ProductForm';
import React from 'react'

const addProductPage = async () => {

  
  const categories = await getCategories();

  return (
    <div>
     <ProductForm categories={JSON.parse(JSON.stringify(categories))}/>
    </div>
  )
}

export default addProductPage