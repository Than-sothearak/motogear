import React from 'react'
import { ProductsPageComponent } from '../frontend/ProductsPageComponent'
import PaginationFrontend from '../frontend/PaginationFrontend';
import { getCategories } from '@/actions/categories';
import { getProductFilter } from '@/actions/products';

export const ProductsFetch = async ({slug, catParams, query, limit, page }) => {

    const { products, count, ITEM_PER_PAGE } = await getProductFilter(slug, catParams, query, limit, page);
    const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;

    return (
        <div>
            <ProductsPageComponent products={JSON.parse(JSON.stringify(products))} />
            <PaginationFrontend
                pathname={"products"}
                totalPages={countPage} currentPage={page} query={query} ITEM_PER_PAGE={ITEM_PER_PAGE} />
        </div>
    )
}
