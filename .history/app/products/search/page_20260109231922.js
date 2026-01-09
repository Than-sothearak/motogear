import { getCategories } from "@/actions/categories";
import { getProductFilter } from "@/actions/products";
import ProductsSearchPage from "@/components/frontend/ProductsSearchPage";
import React from "react";

const searchPage = async ({ params, searchParams }) => {
  const { slug } = await params;
  const catParams = await searchParams;
  const { query } = await searchParams;

  const { products } = await getProductFilter(slug, catParams, query);
  const categories = await getCategories();
  const onlyParentCats = categories.filter((c) => !c.parentCategory);

  return (
    <ProductsSearchPage
      slug={slug}
      products={JSON.parse(JSON.stringify(products))}
      categories={JSON.parse(JSON.stringify(onlyParentCats))}
    
    />
  );
};

export default searchPage;
