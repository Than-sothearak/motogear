import React from 'react'
import { ProductsPageComponent } from '../frontend/ProductsPageComponent'
import PaginationFrontend from '../frontend/PaginationFrontend';

export const ProductsFetch = async ({ params, searchParams }) => {
    const catParams = await searchParams;
    const { query, limit, page,} = await searchParams;

    const { products, count, ITEM_PER_PAGE } = await getProductFilter(slug, catParams, query, limit, page);
    const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;
    const categories = await getCategories();
    const onlyParentCats = categories.filter((c) => !c.parentCategory);

    const groupedProducts = await getProductsGroupedByParent()
    return (
        <div>
            <ProductsPageComponent products={JSON.parse(JSON.stringify(products))} />
            <PaginationFrontend
                pathname={"products"}
                totalPages={countPage} currentPage={page} query={query} ITEM_PER_PAGE={ITEM_PER_PAGE} />
        </div>
    )
}
