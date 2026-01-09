import { getProductFilter} from '@/actions/products'
import React, { Suspense } from 'react'


const oneCatPage = async ({ params, searchParams }) => {
  const { slug } = await params
  const catParams = await searchParams

  const prodocts = await getProductFilter(slug, catParams);

  console.log("prodocts"+ prodocts)
  
  return (
      <Suspense fallback={<div>Loading...</div>}>
    {/* <ProductsPage slug={slug}/> */}
  </Suspense>
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
