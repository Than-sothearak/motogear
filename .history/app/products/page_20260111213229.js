import { getCategories } from "@/actions/categories";
import { getProductFilter, getProductsGroupedByParent } from "@/actions/products";
import PaginationFrontend from "@/components/frontend/PaginationFrontend";
import { ProductPageHeader } from "@/components/frontend/ProductPageHeader";
import ProductsPage, { ProductsPageComponent } from "@/components/frontend/ProductsPageComponent";
import { ProductsFetch } from "@/components/server/productsFetch";
import React, { Suspense } from "react";

const productsPage = async ({ params, searchParams}) => {

    const { query, limit, page, catParams , slug} = await searchParams;
      const categories = await getCategories();
  const onlyParentCats = categories.filter((c) => !c.parentCategory);


  return (
    <div>
      <div>Header</div>
      <ProductPageHeader slug={slug} categories={JSON.parse(JSON.stringify(onlyParentCats))}/>
      
      <Suspense fallback={<div>Loading...</div>}>
          <ProductsFetch 
          
          />
      </Suspense>
      
    </div>
  );
};

export default productsPage;
