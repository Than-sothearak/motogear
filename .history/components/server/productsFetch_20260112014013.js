import React from 'react'
import { ProductsPageComponent } from '../frontend/ProductsPageComponent'
import PaginationFrontend from '../frontend/PaginationFrontend';
import { ProductPageHeader } from '../frontend/ProductPageHeader';
import { getProductFilter } from '@/actions/products';

export const ProductsFetch = async ({ slug, catParams, query, limit, page, pathname }) => {
    const { products, count, ITEM_PER_PAGE, categories } = await getProductFilter(slug, catParams, query, limit, page);
    const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;
    return (
        <div>
            <ProductPageHeader slug={slug} categories={JSON.parse(JSON.stringify(categories))}/>
            <ProductsPageComponent products={JSON.parse(JSON.stringify(products))} />
            <PaginationFrontend
                pathname={pathname}
                totalPages={countPage}
                currentPage={page}
                query={query}
                ITEM_PER_PAGE={ITEM_PER_PAGE} />
        </div>
    )
}
