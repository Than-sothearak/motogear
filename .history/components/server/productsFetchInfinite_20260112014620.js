import React from 'react'
import { getAllProducts,  } from '@/actions/products';
import { InfiniteProductScroll } from '../frontend/InfiniteProductScroll';
import { ProductPageHeader } from '../frontend/ProductPageHeader';
import { Category } from '@/models/Category';

export const ProductsFetchInfinite = async ({page}) => {
        const {products, count} = await getAllProducts(page)
        const categories =  JSON.parse(JSON.stringify(await Category.find()))
        const mainCat = categories.filter(c => !c.parentCategory)
    return (
        <div>
            <ProductPageHeader categories={mainCat} />
            <InfiniteProductScroll initialProducts={JSON.parse(JSON.stringify(products))} total={count}/>
        </div>
    )
}
