import { getAllCategoryIdsBySlug } from '@/actions/categories'
import ProductBox from '@/components/frontend/ProductBox'
import { Product } from '@/models/Product'
import React from 'react'



const categoriesPage = async ({ params }) => {
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

export default categoriesPage