import { getAllCategoryIdsBySlug } from '@/actions/categories'
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
            <div key={item._id} className='space-y-4'>
              <div

                className="relative w-full mt-10 h-40 sm:h-56 md:h-64 lg:h-96 group transition cursor-pointer overflow-hidden rounded-sm"
              >
                <Image
                  src={item.imageUrls[0]}
                  alt={item.productName}
                  fill
                  className="object-center object-cover z-0 transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw,
               (max-width: 1024px) 33vw,
               25vw"
                />

              </div>
              <div className='flex justify-between max-md:flex-wrap gap-2'>
                <div>
                  <p className='text-xs w-full'>{item.productName} {item.brandName}</p>
                  <h1 className='font-black text-2xl'>${item.basePrice} USD</h1>
                </div>
                <button className='bg-tertiary text-primary px-4 py-2 rounded-sm hover:bg-tertiary/80 whitespace-nowrap h-11'>Add to cart</button>
              </div>
              <div className='flex justify-center'>
                <RiStarSLine size={24}/>
                 <RiStarSLine size={24}/>
                  <RiStarSLine size={24}/>
                   <RiStarSLine size={24}/>
                    <RiStarSLine size={24}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default oneCatPage