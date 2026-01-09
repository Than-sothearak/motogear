import { getAllCategoryIdsBySlug } from '@/actions/categories'
import ProductBox from '@/components/frontend/ProductBox'
import ProductCard from '@/components/frontend/ProductCard'
import { Product } from '@/models/Product'
import { StarsIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { RiStarSLine } from 'react-icons/ri'



const oneCatPage = async ({ params }) => {
  const { slug } = await params

   const categoryIds = await getAllCategoryIdsBySlug(slug);
   console.log(categoryIds)
     if (!categoryIds.length) {
    return res.status(404).json({ message: "Category not found" });
  }

  const products = JSON.parse(JSON.stringify(await Product.find({ category: { $in: categoryIds } })
    .populate("category")
    .sort({ createdAt: -1 })
    .lean()))

  return (
    <div className='w-full bg-primary mx-auto h-full flex gap-10 flex-col'>
      <div className='container mx-auto mt-10 space-y-10 bg-primary px-2'>
        <div>
          <h1 className='font-bold text-3xl uppercase'>Products (home page): {slug}</h1>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
          {products.map(item => (
          <div key={item}>
            <ProductBox />
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default oneCatPage