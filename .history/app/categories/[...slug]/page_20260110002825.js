import { getProductFilter } from '@/actions/products'
import Loading from '@/components/frontend/loading'
import PaginationFrontend from '@/components/frontend/PaginationFrontend'
import ProductsPage from '@/components/frontend/Products'
import React, { Suspense } from 'react'

const oneCatPage = async ({ params, searchParams }) => {
  const { slug } = await params
  const catParams = await searchParams
  const { query, limit, page } = await searchParams;
  const { products, count, ITEM_PER_PAGE, categories } = await getProductFilter(slug, catParams, query, limit, page);
  const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;

  return (

    <div>
      <Suspense callback={<Loading />}>
        <ProductsPage
          slug={slug}
          products={JSON.parse(JSON.stringify(products))}
          categories={JSON.parse(JSON.stringify(categories))}
        />
      </Suspense>
      <PaginationFrontend
        pathname={"products"}
        totalPages={countPage} currentPage={page} query={query} />
    </div>

  )

}

export default oneCatPage
