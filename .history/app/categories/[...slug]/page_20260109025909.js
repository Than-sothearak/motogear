import { getAllCategoryBySlug } from '@/actions/categories'
import ProductBox from '@/components/frontend/ProductBox'
import { Product } from '@/models/Product'
import Link from 'next/link'
import React from 'react'



const oneCatPage = async ({ params, searchParams }) => {
  const { slug } = await params
  const selectedCat = await searchParams?.cat || 'all'
     const { parent, childCategories } = await getAllCategoryBySlug(slug);

  if (!parent) {
    return <div>Category not found</div>;
  }
  const categoryIds =
    selectedCat === 'all'
      ? [parent._id, ...childCategories.map(c => c._id)]
      : [selectedCat]

  const products = await Product.find({
    category: { $in: categoryIds },
  })
    .populate('category')
    .sort({ createdAt: -1 })
    .lean()
  return (
    <div className='w-full bg-primary mx-auto h-full flex gap-10 flex-col'>
      <div className='container mx-auto mt-10 space-y-10 bg-primary px-2'>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-3xl uppercase'>Products: All {slug}</h1>
          <div className='flex gap-2 items-center'>
            <label>Type</label>
            <select className='border py-2 px-4'>
              <option value="all">All</option>
              {JSON.parse(JSON.stringify(childCategories)).map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
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