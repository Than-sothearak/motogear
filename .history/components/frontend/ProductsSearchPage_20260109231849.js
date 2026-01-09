"use client";
import ProductBox from "@/components/frontend/ProductBox";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import ProductSlideCard from "./ProductSlideCard";

const ProductsSearchPage = ({ slug, categories, products, groupedProducts }) => {
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  const handleChangeSort = (e) => {
    current.set("cat", e.target.value);
    router.push(`?${current.toString().toLowerCase()}`);
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
            <Link href={`/categories/${slug}`} className="hover:underline">
              All
            </Link>
       
          </div>
        </div>
        {groupedProducts &&
          groupedProducts.map((category, index) => (
            <ProductSlideCard key={category._id} category={category} />
          ))}

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

export default ProductsSearchPage;
