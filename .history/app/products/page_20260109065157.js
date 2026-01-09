import { getCategories } from '@/actions/categories';
import { getProductFilter } from '@/actions/products';
import ProductsPage from '@/components/frontend/Products'
import React from 'react'


const productsPage = async ({params, searchParams}) => {

    const { slug } = await params
    const catParams = await searchParams
  
    const { query } = await searchParams;
  
    const { products,} = await getProductFilter(slug, catParams, query);
    const categories = await getCategories();
    console.log(categories)
    const cat = categories.filter(c => !c.parent)
  return (
    
      <ProductsPage
        slug={slug}
        products={JSON.parse(JSON.stringify(products))}
        categories={JSON.parse(JSON.stringify(cat))}
      />
    
  )

}

export default productsPage

