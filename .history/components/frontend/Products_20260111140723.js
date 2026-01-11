"use client";
import ProductBox from "@/components/frontend/ProductBox";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ProductsPage = ({ slug, categories, products, groupedProducts }) => {
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  const [limit, setLimit] = useState(searchParams.get("limit") || "10");
  const catParams = searchParams.get("cat")

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
    <div className="w-full bg-primary mx-auto flex gap-10 flex-col max-lg:h-screen">
      <div className="container mx-auto my-10 space-y-10 bg-primary px-2">
        <div className="flex justify-between items-center max-lg:flex-col gap-4 max-md:justify-center">
          <div className="flex justify-center">
            <Link
              href={`/products`}
              className="font-bold text-3xl uppercase hover:underline"
            >
              All product
            </Link>
          </div>
          <div className="flex gap-2 items-end max-md:flex-wrap max-md:gap-6 justify-center">
            {slug ? (
              <Link href={`${slug}`} className="font-bold text-3xl uppercase  hover:underline">
                {slug}
              </Link>
            ) : (
              <Link
                href={`${slug}`}
                className="font-bold text-3xl uppercase  hover:underline"
              ></Link>
            )}
            {slug ? ( <Link href={`/categories/${slug}`} className="hover:underline">
              All
            </Link>) : ( <Link href={`/categories`} className="hover:underline">
              All
            </Link>)}
          <div className="flex max-md:flex-wrap gap-6 md:gap-2 max-lg:justify-center">
              {categories.length !== 0 &&
              <div className="text-tertiary/50 border h-6"></div>}
            {categories.map((cat, index) => (
              <div key={cat._id} className="flex gap-2">
                {slug ? (
                  <Link
                    href={`/categories/${slug}/?cat=${cat.slug}`}
                    className={`hover:underline whitespace-nowrap ${catParams === cat.slug ? 'underline font-black' : ''}`}
                  >
                    {cat.name} 
                  </Link>
                ) : (
                  <Link
                    href={`/categories/${cat.slug}`}
                    className={`hover:underline whitespace-nowrap ${catParams === cat.slug ? 'underline font-black' : ''}`}
                  >
                    {cat.name} {catParams}
                  </Link>
                )}
                {categories.length - 1 !== index &&
                  <div className="text-tertiary/50 border h-6">{cat.length}</div>
                }
              </div>
            ))}

          </div>
                 <div className="flex items-end gap-2 ml-6">
              <label>Limit</label>
              <select value={limit} onChange={handleChange} className="border px-2">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>
  
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
            <div className='w-full h-screen lg:h-full flex justify-center items-center"'>No product</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
