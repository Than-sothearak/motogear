import { getAllCategoryBySlug } from '@/actions/categories'
import ProductBox from '@/components/frontend/ProductBox'
import ProductsPage from '@/components/frontend/Products'
import { Category } from '@/models/Category'
import { Product } from '@/models/Product'
import Link from 'next/link'
import React from 'react'


const oneCatPage = async ({ params, searchParams }) => {
  const { slug } = await params
  const sp = await searchParams

  
  return (
    <ProductsPage />
  )
}

export default oneCatPage


// const parentSlug = slug[0]
//   const selectedCatSlug = sp?.cat || 'all'

//   const { parent, childCategories } =
//     await getAllCategoryBySlug(parentSlug)

//   if (!parent) {
//     return <div>Category not found</div>
//   }

//   let categoryIds = []

//   if (selectedCatSlug === 'all') {
//     // 🔹 Parent + all children
//     categoryIds = [
//       parent._id,
//       ...childCategories.map(c => c._id),
//     ]
//   } else {
//     // 🔹 Convert slug → ObjectId
//     const selectedCategory = await Category.findOne({
//       slug: selectedCatSlug,
//     }).select('_id')

//     if (!selectedCategory) {
//       return <div>Category not found</div>
//     }

//     categoryIds = [selectedCategory._id]
//   }

//   const products = await Product.find({
//     category: { $in: categoryIds },
//   })
//     .populate('category')
//     .sort({ createdAt: -1 })
//     .lean()
