import { getProductFilter, getProducts } from '@/actions/products'
import ProductsPage from '@/components/frontend/Products'
import React, { Suspense } from 'react'


const productsPage = async () => {

  const { products } = await getProducts();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage
        slug={"All Product"}
        products={JSON.parse(JSON.stringify(products))}
        childCategories={JSON.parse(JSON.stringify(childCategories))}
      />
    </Suspense>
  )

}

export default productsPage

