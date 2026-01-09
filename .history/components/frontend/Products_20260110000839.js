"use client";
import ProductBox from "@/components/frontend/ProductBox";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ProductSlideCard from "./ProductSlideCard";

const ProductsPage = ({ slug, categories, products, groupedProducts }) => {
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams.toString());
  const router = useRouter();

 const [limit, setLimit] = useState(searchParams.get("limit") || "10");

  const handleChange = (e) => {
    const value = e.target.value;
    setLimit(value);

    // Update URL param ?limit=VALUE
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("limit", value);
    } else {
      params.delete("limit");
    }

    router.replace(`${window.location.pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="w-full bg-primary mx-auto h-full flex gap-10 flex-col min-h-screen">
      <div className="container mx-auto mt-10 space-y-10 bg-primary px-2">
        <div className="flex justify-between items-center max-md:flex-col gap-4 max-md:justify-center">
          <div className="flex justify-center">
            <Link
              href={`/products`}
              className="font-bold text-3xl uppercase hover:underline"
            >
              All product
            </Link>
          </div>
          <div className="flex gap-2 items-end max-md:flex-wrap max-md:gap-1 justify-center">
            {slug ? (
              <Link href={`${slug}`} className="font-bold text-3xl uppercase">
                {slug}
              </Link>
            ) : (
              <Link
                href={`${slug}`}
                className="font-bold text-3xl uppercase"
              ></Link>
            )}
              <div className="flex items-end gap-2">
      <label>Limit</label>
      <select value={limit} onChange={handleChange} className="border px-2">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
            <Link href={`/categories/${slug}`} className="hover:underline">
              All
            </Link>
            {categories.length !== 0 && 
            <div className="text-tertiary/50 border h-6"></div>}
            {categories.map((cat, index) => (
              <div key={cat._id} className="flex gap-2">
                {slug ? (
                  <Link
                    href={`/categories/${slug}/?cat=${cat.slug}`}
                    className="hover:underline whitespace-nowrap"
                  >
                    {cat.name}
                  </Link>
                ) : (
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="hover:underline whitespace-nowrap"
                  >
                    {cat.name}
                  </Link>
                )}
                {categories.length - 1 !== index && 
                <div className="text-tertiary/50 border h-6">{cat.length}</div>
                } 
              </div>
            ))}
          </div>
        </div>
        {/* {groupedProducts &&
          groupedProducts.map((category, index) => (
            <ProductSlideCard key={category._id} category={category} />
          ))} */}

        <div>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-4">
              {products.map((item, index) => (
                <div key={item._id} className="">
                  <ProductBox {...item} />
                </div>
              ))}
            </div>
          ) : (
            <div className='w-full  space-y-4"'>No product</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
