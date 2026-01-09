"use client"
import ProductBox from '@/components/frontend/ProductBox'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'


const ProductsPage = ({ slug, categories, products }) => {

  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  const handleChangeSort = (e) => {
    current.set("cat", e.target.value);
    router.push(`?${current.toString().toLowerCase()}`);
  };


  return (
    <div className='w-full bg-primary mx-auto h-full flex gap-10 flex-col'>
      <div className='container mx-auto mt-10 space-y-10 bg-primary px-2'>
        <div className='flex justify-between items-center max-md:flex-wrap gap-4'>
          <h1 className='font-bold text-3xl uppercase'>All {slug}</h1>
          <div className='flex gap-4 items-center max-md:flex-wrap max-md:gap-1 justify-center'>

            <Link href={`/categories/${slug}`} className='hover:underline'>All</Link>
            <div className='text-tertiary/50'>|</div>
            {categories.map(cat => (
              <div key={cat._id} className='flex gap-2'>
                <Link
                  href={!slug
                    ? `/categories/cat=${cat.slug}`
                    : `/categories/${slug}?cat=${cat.slug}`
                  }
                  className="hover:underline whitespace-nowrap"
                >
                  {cat.name}
                </Link>
                <div className='text-tertiary/50'>|</div>
              </div>
            ))}
            {/* <select   onChange={handleChangeSort}>
              {categories?.map(cat => (
                <option key={cat._id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select> */}

          </div>
        </div>

        {products.length > 0 ?
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 space-y-4">
            {products.map((item, index) => (
              <div key={item._id} className='p-4 space-y-10'>
                <ProductBox {...item} />
              </div>
            ))}
          </div> : <div className='w-full  space-y-4"'>
            No product
          </div>
        }
      </div>
    </div>
  )
}

export default ProductsPage