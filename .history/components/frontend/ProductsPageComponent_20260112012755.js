"use client";
import ProductBox from "@/components/frontend/ProductBox";
import React, { useState } from "react";

export const ProductsPageComponent = ({ products}) => {

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


