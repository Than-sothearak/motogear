import { getProductFilter } from '@/actions/products'
import ProductsPage from '@/components/frontend/Products'
import React, { Suspense } from 'react'


const oneCatPage = async ({ params, searchParams }) => {
  const { slug } = await params
  const catParams = await searchParams

  const { query } = await searchParams;

  const { products, categories} = await getProductFilter(slug, catParams, query);
  return (

      <ProductsPage
        slug={slug}
        products={JSON.parse(JSON.stringify(products))}
        categories={JSON.parse(JSON.stringify(categories))}
      />

  )

}

export default oneCatPage
