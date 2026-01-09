import { getAllCategoryIdsBySlug } from '@/actions/categories'
import ProductBox from '@/components/frontend/ProductBox'
import { Product } from '@/models/Product'
import React from 'react'



const oneCatPage = async ({ params }) => {
  const { slug } = await params

   const categoryIds = await getAllCategoryIdsBySlug(slug);

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
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-3xl uppercase'>Products: All {slug}</h1>
          <div className='flex gap-2 items-center'>
            <label>Type</label>
            <select className='border py-2 px-4'>
              <option>All</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 space-y-4">
          {products.map((item, index) => (
          <div key={item._id} className='p-4 space-y-10'>
            <ProductBox {...item}/>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default oneCatPage