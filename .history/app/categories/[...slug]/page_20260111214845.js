import { getProductFilter } from '@/actions/products'
import { ProductPageHeader } from '@/components/frontend/ProductPageHeader'
import ProductGridSkeleton from '@/components/frontend/ProductSkeleton'
import { ProductsFetch } from '@/components/server/productsFetch'
import React, { Suspense } from 'react'

const oneCatPage = async ({ params, searchParams }) => {
  const { slug } = await params
  const catParams = await searchParams
  const { query, limit, page } = await searchParams;
  const { categories } = await getProductFilter(slug, catParams, query, limit, page);

  return (

    <div>
      <ProductPageHeader slug={slug} categories={JSON.parse(JSON.stringify(categories))} />

      <Suspense fallback={<ProductGridSkeleton count={limit} />}>
        <ProductsFetch
          slug={slug}
          catParams={catParams}
          query={query}
          limit={limit}
          page={page}

        />
      </Suspense>
    </div>

  )

}

export default oneCatPage
