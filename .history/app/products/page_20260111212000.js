import { getCategories } from "@/actions/categories";
import { getProductFilter, getProductsGroupedByParent } from "@/actions/products";
import PaginationFrontend from "@/components/frontend/PaginationFrontend";
import { ProductPageHeader } from "@/components/frontend/ProductPageHeader";
import ProductsPage, { ProductsPageComponent } from "@/components/frontend/ProductsPageComponent";
import { ProductsFetch } from "@/components/server/productsFetch";
import React from "react";

const productsPage =  () => {
 
  return (
    <div>
      <ProductPageHeader slug={slug} categories={JSON.parse(JSON.stringify(onlyParentCats))}/>
      <ProductsFetch />
      
    </div>
  );
};

export default productsPage;
