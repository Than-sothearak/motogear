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
    <div className="w-full bg-primary mx-auto flex gap-10 flex-col max-lg:min-h-screen h-full">
      <div className="container mx-auto my-10 space-y-10 bg-primary px-2">
        
  
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
