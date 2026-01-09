import { getCategories } from '@/actions/categories';
import ProductsPage from '@/components/frontend/Products'
import React from 'react'


const productsPage = async ({params, searchParams}) => {

    const { slug } = await params
    const catParams = await searchParams
  
    const { query } = await searchParams;
  
    const { products,} = await getProductFilter(slug, catParams, query);
    const categories = await getCategories();
  return (
    
      <ProductsPage
        slug={slug}
        products={JSON.parse(JSON.stringify(products))}
        categories={JSON.parse(JSON.stringify(categories))}
      />
    
  )

}

export default productsPage

