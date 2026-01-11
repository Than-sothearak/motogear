import React from 'react'
import { ProductsPageComponent } from '../frontend/ProductsPageComponent'
import PaginationFrontend from '../frontend/PaginationFrontend';
import { getAllProducts, getProductFilter } from '@/actions/products';
import { ProductPageHeader } from '../frontend/ProductPageHeader';
import { InfiniteProductScroll } from '../frontend/InfiniteProductScroll';

export const ProductsFetch = async ({slug, catParams, query, limit, page, pathname }) => {
    // const { products, count, ITEM_PER_PAGE,categories } = await getProductFilter(slug, catParams, query, limit, page);
    const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;
    const {products} = await getAllProducts(page)
    return (
        <div>
            <ProductPageHeader slug={slug} categories={JSON.parse(JSON.stringify(categories))} />

            <InfiniteProductScroll products={JSON.parse(JSON.stringify(products))}/>
            {/* <ProductsPageComponent products={JSON.parse(JSON.stringify(products))} /> */}
            {/* <PaginationFrontend
                pathname={pathname}
                totalPages={countPage} 
                currentPage={page} 
                query={query} 
                ITEM_PER_PAGE={ITEM_PER_PAGE} /> */}
        </div>
    )
}
