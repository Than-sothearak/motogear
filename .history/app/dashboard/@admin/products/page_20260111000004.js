import { getProducts } from "@/actions/products";
import { auth } from "@/auth";
import ProductTable from "@/components/dashboard/product/ProductTable";
import Pagination from "@/components/Pagination";
import SearchCompoenent from "@/components/SearchComponent";
import Link from "next/link";
import React from "react";

const productPage = async ({ pageName, searchParams }) => {

  const session = await auth();
  if (!session || !session.user?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
      </div>
    );
  }

  const { query } = await searchParams;
  const { status } = await searchParams

  const { page } = await searchParams || 1;
  const { products, count, ITEM_PER_PAGE } = await getProducts(query, page, status);
  const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;
  return (
    <div className="p-4 justify-center bg-primary rounded-lg space-y-3 h-11">
      <div className="flex justify-between items-center gap-4">
        <div>
          <SearchCompoenent
            placeHolder="Search for product..."
            linkPage={`/dashboard/products`}
          />
        </div>
        <Link
          href={`/dashboard/products/add`}
          className="bg-tertiary px-2 py-1 text-center rounded-md hover:bg-secondary hover:text-tertiary text-sm text-secondarytext"
        >
          Add new
        </Link>
      </div>
    <div>

        <ProductTable

        products={JSON.parse(JSON.stringify(products))}
        totalPages={countPage}
        currentPage={page}
        query={query}
      />

      <Pagination
        pathname={`products`}
        totalPages={countPage}
        currentPage={page}
        query={query}
      />
    </div>
    </div>
  );
};

export default productPage;
