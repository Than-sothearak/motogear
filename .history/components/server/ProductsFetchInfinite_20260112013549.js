import React from 'react'
import { getAllProducts,  } from '@/actions/products';
import { InfiniteProductScroll } from '../frontend/InfiniteProductScroll';

export const ProductsFetchInfinite = async ({page}) => {
        const {products, count} = await getAllProducts(page)
    return (
        <div>
            <InfiniteProductScroll initialProducts={JSON.parse(JSON.stringify(products))} total={count}/>
        </div>
    )
}
