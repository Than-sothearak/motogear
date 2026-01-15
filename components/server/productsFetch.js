import React from "react";
import { ProductsPageComponent } from "../frontend/ProductsPageComponent";
import PaginationFrontend from "../frontend/PaginationFrontend";
import { ProductPageHeader } from "../frontend/ProductPageHeader";
import { getProductFilter } from "@/actions/products";
import Link from "next/link";

export const ProductsFetch = async ({
  slug,
  catParams,
  query,
  limit,
  page,
  pathname,
}) => {
  const { products, count, ITEM_PER_PAGE, categories } = await getProductFilter(
    slug,
    catParams,
    query,
    limit,
    page
  );
  const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;

  if (!categories) {
    return (
      <div className="container mx-auto flex justify-center p-10">
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="text-center"><h1 className="text-3xl">No categories found!</h1></div>
          <Link href={`/`} className="underline">Back to home</Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <ProductPageHeader
        slug={slug}
        categories={JSON.parse(JSON.stringify(categories))}
      />
      <ProductsPageComponent products={JSON.parse(JSON.stringify(products))} />
      <PaginationFrontend
        pathname={pathname}
        totalPages={countPage}
        currentPage={page}
        query={query}
        ITEM_PER_PAGE={ITEM_PER_PAGE}
      />
    </div>
  );
};
