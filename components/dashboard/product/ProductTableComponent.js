import SearchCompoenent from '@/components/SearchComponent';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const ProductTableComponent = ({ pageName, products }) => {
  return (
      <>
      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-tertiary rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={product.image || '/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 1024px) 50vw,
                         (max-width: 1280px) 33vw,
                         25vw"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-secondarytext font-semibold text-lg truncate">
                  {product.name}
                </h3>
                <p className="text-secondarytext text-sm mt-1 truncate">
                  {product.description || 'No description available.'}
                </p>
                <p className="text-secondarytext font-bold mt-2">
                  ${product.price?.toFixed(2) || '0.00'}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                  <Link
                    href={`/dashboard/${pageName}/edit/${product._id}`}
                    className="text-sm px-3 py-1 rounded-md bg-primary text-tertiary hover:bg-secondary hover:text-tertiary transition-colors duration-200"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                    // onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-secondarytext">
            No products found.
          </p>
        )}
      </div>
  
      </>
  );
};

export default ProductTableComponent;
