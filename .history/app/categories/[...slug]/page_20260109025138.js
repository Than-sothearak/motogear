import { getAllCategoryIdsBySlug } from '@/actions/categories';
import ProductBox from '@/components/frontend/ProductBox';
import { Product } from '@/models/Product';
import React, { useState } from 'react';

const OneCatPage = async ({ params }) => {
  const { slug } = params;

  // 1️⃣ Get parent and child categories
  const { parent, childCategories } = await getAllCategoryIdsBySlug(slug);

  if (!parent) {
    return <div>Category not found</div>;
  }

  // 2️⃣ State for selected child category (client-side)
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 3️⃣ Filter products by selected category
  const categoryIds = selectedCategory === 'all'
    ? [parent._id, ...childCategories.map(c => c._id)]
    : [childCategories.find(c => c._id.toString() === selectedCategory)?._id];

  const products = JSON.parse(JSON.stringify(await Product.find({ category: { $in: categoryIds } })
    .populate('category')
    .sort({ createdAt: -1 })
    .lean()));

  return (
    <div className='w-full bg-primary mx-auto h-full flex gap-10 flex-col'>
      <div className='container mx-auto mt-10 space-y-10 bg-primary px-2'>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-3xl uppercase'>Products: {parent.category}</h1>
          <div className='flex gap-2 items-center'>
            <label>Category</label>
            <select
              className='border py-2 px-4'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value='all'>All</option>
              {childCategories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 space-y-4">
          {products.map((item) => (
            <div key={item._id} className='p-4 space-y-10'>
              <ProductBox {...item}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OneCatPage;
