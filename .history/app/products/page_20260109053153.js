import { getCategories } from '@/actions/categories';
import { getProductFilter, getProducts } from '@/actions/products'
import ProductsPage from '@/components/frontend/Products'
import React, { Suspense } from 'react'


const productsPage = async () => {

  const { products } = await getProducts();
  const categories = await getCategories()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage
        slug={"All Product"}
        products={JSON.parse(JSON.stringify(products))}
        categories={JSON.parse(JSON.stringify(categories))}
      />
    </Suspense>
  )

}

export default productsPage

