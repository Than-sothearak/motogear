import { getCategories } from '@/actions/categories';
import { auth } from '@/auth';
import ProductForm from '@/components/dashboard/product/ProductForm';
import { Product } from '@/models/Product';
import { mongoDb } from '@/utils/connectDB';
import React from 'react'

const productEditPage = async (props) => {

      await mongoDb();
      const session = await auth();
    
      const params = await props.params;
      const id = await params.id;
      
        const product = await Product.findOne({_id: id}).lean().populate("category");
        const categories = await getCategories();
        if (! product) {
          return <p className="text-red-500">product not found!</p>;
        }
     
  return (
    <div>
        <ProductForm 
        productData={JSON.parse(JSON.stringify(product))}
          categories={JSON.parse(JSON.stringify(categories))}
       />
    </div>
  )
}

export default productEditPage