import { getCategories } from "@/actions/categories";
import { getProductFilter, getProductsGroupedByParent } from "@/actions/products";
import PaginationFrontend from "@/components/frontend/PaginationFrontend";
import { ProductPageHeader } from "@/components/frontend/ProductPageHeader";
import ProductGridSkeleton from "@/components/frontend/ProductSkeleton";
import ProductsPage, { ProductsPageComponent } from "@/components/frontend/ProductsPageComponent";
import Skeleton from "@/components/frontend/Skeleton";
import { ProductsFetch } from "@/components/server/productsFetch";
import React, { Suspense } from "react";

const productsPage = async ({ params, searchParams}) => {

  const { query, limit, page, catParams , slug} = await searchParams;
  const categories = await getCategories();
  const onlyParentCats = categories.filter((c) => !c.parentCategory);


  return (
    <div>
     
      <ProductPageHeader slug={slug} categories={JSON.parse(JSON.stringify(onlyParentCats))}/>
      
      <Suspense fallback={<ProductGridSkeleton count={limit}/>}>
          <ProductsFetch 
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
