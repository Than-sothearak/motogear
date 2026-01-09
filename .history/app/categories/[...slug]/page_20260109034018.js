import { getAllCategoryBySlug } from '@/actions/categories'
import ProductBox from '@/components/frontend/ProductBox'
import { Category } from '@/models/Category'
import { Product } from '@/models/Product'
import Link from 'next/link'
import React from 'react'



const oneCatPage = async ({ params, searchParams }) => {
  const { slug } = await params
  const sp = await searchParams

  const parentSlug = slug[0]
  const selectedCatSlug = sp?.cat || 'all'

  const { parent, childCategories } =
    await getAllCategoryBySlug(parentSlug)

  if (!parent) {
    return <div>Category not found</div>
  }

  let categoryIds = []

  if (selectedCatSlug === 'all') {
    // 🔹 Parent + all children
    categoryIds = [
      parent._id,
      ...childCategories.map(c => c._id),
    ]
  } else {
    // 🔹 Convert slug → ObjectId
    const selectedCategory = await Category.findOne({
      slug: selectedCatSlug,
    }).select('_id')

    if (!selectedCategory) {
      return <div>Category not found</div>
    }

    categoryIds = [selectedCategory._id]
  }

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
          <div className='flex gap-8 items-center'>
            <label>Type</label>
            <Link href={`/categories/${slug}`} className='hover:underline'>All</Link>
            <div className='text-tertiary/50'>|</div>
            {JSON.parse(JSON.stringify(childCategories)).map(cat => (
              <div key={cat._id} className='flex gap-2'>
                <Link href={`/categories/${slug}?cat=${cat.slug}`} className='hover:underline'>
                  {cat.name}
                </Link>
                <div className='text-tertiary/50'>|</div>
              </div>
            ))}

          </div>
        </div>

        {products.lengh === 0 ?
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 space-y-4">
            {products.map((item, index) => (
              <div key={item._id} className='p-4 space-y-10'>
                <ProductBox {...item} />
              </div>
            ))}
          </div> : <div className='w-full bg-black space-y-4"'>
            No product
          </div>
        }
      </div>
    </div>
  )
}

export default oneCatPage