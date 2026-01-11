import { getCategories } from "@/actions/categories";
import { getProductFilter, getProductsGroupedByParent } from "@/actions/products";
import PaginationFrontend from "@/components/frontend/PaginationFrontend";
import { ProductPageHeader } from "@/components/frontend/ProductPageHeader";
import ProductsPage, { ProductsPageComponent } from "@/components/frontend/ProductsPageComponent";
import React from "react";

const productsPage = async ({ params, searchParams }) => {
  const { slug } = await params;
  const catParams = await searchParams;
  const { query, limit, page } = await searchParams;

  const { products, count, ITEM_PER_PAGE } = await getProductFilter(slug, catParams, query, limit, page);
  const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;
  const categories = await getCategories();
  const onlyParentCats = categories.filter((c) => !c.parentCategory);

  const groupedProducts = await getProductsGroupedByParent()
  return (
    <div>
      <ProductPageHeader slug={slug} categories={JSON.parse(JSON.stringify(onlyParentCats))}/>
      <ProductsPageComponent
        products={JSON.parse(JSON.stringify(products))}
      />
      <PaginationFrontend
        pathname={"products"}
        totalPages={countPage} currentPage={page} query={query} ITEM_PER_PAGE={ITEM_PER_PAGE} />
    </div>
  );
};

export default productsPage;
