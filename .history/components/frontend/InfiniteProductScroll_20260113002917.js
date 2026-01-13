"use client";
import { getAllProducts } from "@/actions/products";
import ProductBox from "@/components/frontend/ProductBox";
import React, { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ProductGridSkeleton from "./ProductSkeleton";

export const InfiniteProductScroll = ({ initialProducts, total }) => {
  const [products, setProducts] = useState(initialProducts || [])
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()
  const [count, setCount] = useState(total)

  const loadProducts = async () => {
    const nextPage = page + 1
    const { products: newProducts, count } = await getAllProducts(nextPage)

    if (newProducts?.length) {
      setCount(count)
      setProducts(prev => [...prev, ...newProducts])
      setPage(nextPage)
    }

  }
  useEffect(() => {
    if (inView) {
      loadProducts()
    }
  }, [inView])

  return (
    <div className="w-full bg-primary mx-auto flex gap-10 flex-col max-lg:min-h-screen h-full">
      <div className="container mx-auto space-y-10 bg-primary px-2">
        <div>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-4">
              {products.map(item => (
                <div key={item._id}>
                  <ProductBox {...item} />
                </div>
              ))}
            </div>
          ) : (
            <div className='w-full h-screen flex justify-center items-center'>No product</div>
          )}
        </div>
        <div>

        </div>
        {products?.length < count ?
          <div ref={ref}>
            <ProductGridSkeleton count={8} />
          </div> : <div className="container m-auto text-center">No more content</div>

        }
      </div>
    </div>
  )
}
