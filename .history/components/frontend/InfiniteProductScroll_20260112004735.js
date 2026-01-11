"use client";
import { getAllProducts } from "@/actions/products";
import ProductBox from "@/components/frontend/ProductBox";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProductGridSkeleton from "./ProductSkeleton";

export const InfiniteProductScroll = ({ initialProducts }) => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()

  async function loadProducts() {
    const next = page + 1
     console.log(inView)
    const {products} = await getAllProducts({ page: next })
    console.log(products)
    if (products?.length) {
      setPage(next)
      setProducts((prev => [
        ...(prev?.length ? prev : []),
        ...products
      ]))
    }
  }
 
  useEffect(() => {
    if (inView) {
      loadProducts()
    }
  }, [inView])
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
        <div ref={ref}>
          <ProductGridSkeleton count={2} />
        </div>
      </div>
    </div>
  );
}


