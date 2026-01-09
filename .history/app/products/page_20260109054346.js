import { getCategories } from '@/actions/categories';
import {  getProducts } from '@/actions/products'
import ProductsPage from '@/components/frontend/Products'
import React from 'react'


const productsPage = async () => {

  const { products } = await getProducts();
  const categories = await getCategories()
  return (
    
      <ProductsPage
        slug={"Product"}
        products={JSON.parse(JSON.stringify(products))}
        categories={JSON.parse(JSON.stringify(categories))}
      />
    
  )

}

export default productsPage

