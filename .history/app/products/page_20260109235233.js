import { getCategories } from "@/actions/categories";
import { getProductFilter, getProductsGroupedByParent } from "@/actions/products";
import PaginationFrontend from "@/components/frontend/PaginationFrontend";
import ProductsPage from "@/components/frontend/Products";
import React from "react";

const productsPage = async ({ params, searchParams }) => {
  const { slug } = await params;
  const catParams = await searchParams;

  const { query, limit, page } = await searchParams;

  const { products, count } = await getProductFilter(slug, catParams, query, limit, page);
  const ITEM_PER_PAGE = 10
  const countPage = Math.ceil(parseFloat(count/ITEM_PER_PAGE)) || 1;
  const categories = await getCategories();
  const onlyParentCats = categories.filter((c) => !c.parentCategory);

  const groupedProducts = await getProductsGroupedByParent()
  return (
<div>
      <ProductsPage
      slug={slug}
      products={JSON.parse(JSON.stringify(products))}
      categories={JSON.parse(JSON.stringify(onlyParentCats))}
      groupedProducts={JSON.parse(JSON.stringify(groupedProducts))}
    />
       <PaginationFrontend 
          pathname={"products"}
          totalPages={countPage} currentPage={page} query={query} />
</div>
  );
};

export default productsPage;
