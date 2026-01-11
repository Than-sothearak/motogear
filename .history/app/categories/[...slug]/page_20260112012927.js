import { getProductFilter } from '@/actions/products'
import ProductGridSkeleton from '@/components/frontend/ProductSkeleton'
import { ProductsFetch } from '@/components/server/ProductsFetchInfinite'
import React, { Suspense } from 'react'

const oneCatPage = async ({ params, searchParams }) => {
  const { slug } = await params
  const catParams = await searchParams
  const { query, limit, page } = await searchParams;

  return (

    <div>
      
    
      <Suspense fallback={<ProductGridSkeleton count={limit} />}>
        <ProductsFetch
          slug={slug}
          catParams={catParams}
          query={query}
          limit={limit}
          page={page}
          pathname={"categories"}

        />
      </Suspense>
    </div>

  )

}

export default oneCatPage
