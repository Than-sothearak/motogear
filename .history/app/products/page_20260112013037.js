import { getAllProducts } from "@/actions/products";
import { InfiniteProductScroll } from "@/components/frontend/InfiniteProductScroll";
import ProductGridSkeleton from "@/components/frontend/ProductSkeleton";
import { ProductsFetchInfinite } from "@/components/server/ProductsFetchInfinite";
import React, { Suspense } from "react";

const productsPage = async ({ params, searchParams}) => {
  const { query, limit, page, catParams , slug} = await searchParams;
  return (
    <div>

    
 
     <Suspense fallback={<ProductGridSkeleton count={limit}/>}>

             <ProductsFetchInfinite 
          slug={slug}
          catParams={catParams}
          query={query}
          limit={limit}
          page={page}
          pathname={"/products"}
          />
      </Suspense>
      
    </div>
  );
};

export default productsPage;
