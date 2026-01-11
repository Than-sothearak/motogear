import { getAllProducts } from "@/actions/products";
import { InfiniteProductScroll } from "@/components/frontend/InfiniteProductScroll";
import ProductGridSkeleton from "@/components/frontend/ProductSkeleton";
import { ProductsFetch } from "@/components/server/productsFetch";
import React, { Suspense } from "react";

const productsPage = async ({ params, searchParams}) => {
  const { query, limit, page, catParams , slug} = await searchParams;
    const {products} = await getAllProducts(page)
  return (
    <div>

        {/* <InfiniteProductScroll initialProducts={JSON.parse(JSON.stringify(products))}/> */}

             
          <ProductsFetch 
          slug={slug}
          catParams={catParams}
          query={query}
          limit={limit}
          page={page}
          pathname={"/products"}
          />
      {/* <Suspense fallback={<ProductGridSkeleton count={limit}/>}>

    
      </Suspense>
       */}
    </div>
  );
};

export default productsPage;
