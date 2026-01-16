"use client";

import { Ban, PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useProductVariant } from "../hooks/useProductVariants";

export default function ProductSinglePage({ product, session }) {
  const { productName, basePrice, brandName, description, variants, imageUrls, _id } = product;

  const [quantity, setQuantity] = useState(1);
  
  const isStock = product.variants.some(v => v.stock > 0)
  // Init colors & sizes
const { availableColors, availableSizes, selectedColor, setSelectedColor, selectedSize, setSelectedSize, stock, mainImage, selectedVariantId, } = useProductVariant(product.variants, product.imageUrls);

  return (
    <div className="container mx-auto lg:flex lg:gap-8 my-10 lg:px-0 px-4">
      {/* Left: Image gallery */}
      <div className="lg:w-1/2 flex flex-col justify-start items-center gap-4 mb-10 relative">
        <div className="md:w-1/2 p-4 lg:p-0 w-full ">
          <div className="relative w-full aspect-square  rounded-md overflow-hidden mb-4">
            <Image src={mainImage} alt={productName} fill className="object-contain" />
          </div>
        </div>
        <div className="flex gap-2 pb-2 max-w-full overflow-x-auto ">
          {imageUrls.map((img, idx) => (
            <div
              key={`main-${idx}`}
              className={`relative w-20 h-20 border rounded-md cursor-pointer shrink-0
        ${mainImage === img ? "ring-2 ring-primary" : ""}
      `}
              onClick={() => setMainImage(img)}
            >
              <Image
                src={img}
                alt={`${productName} ${idx}`}
                fill
                className="object-contain"
              />
            </div>
          ))}

          {variants
            .filter(v => v.images && v.images.trim() !== "")
            .map((v, idx) => (
              <div
                key={`variant-${idx}`}
                className={`relative w-20 h-20 border rounded-md overflow-hidden cursor-pointer shrink-0
          ${mainImage === v.images ? "ring-2 ring-primary" : ""}
        `}
                onClick={() => setMainImage(v.images)}
              >
                <Image
                  src={v.images}
                  alt={`${productName} variant ${idx}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
        </div>
        {session?.user?.isAdmin && (
          <Link href={`/dashboard/products/${_id}`} className="absolute right-0">
            <PencilIcon />
          </Link>
        )}


      </div>

      {/* Right: Product info */}
      <div className="lg:w-1/2 flex flex-col">
        <h1 className="text-3xl font-bold">{productName}</h1>
        <p className="text-gray-500 mt-1">{brandName}</p>
        <span className="text-2xl font-semibold mt-4">${basePrice}</span>

        {/* Color selection */}
        <div className="mt-6">
          <h4 className="font-medium mb-2">Color:</h4>
          <div className="flex gap-2 flex-wrap">
            {availableColors.map(color => {
              const hasStock = variants.some(
                v => v.color === color && v.stock > 0
              );

              return (
                <button
                  key={color}
                  disabled={!hasStock}
                  onClick={() => {
                    setSelectedColor(prev =>
                      prev === color ? null : color
                    );
                  }}
                  className={`relative px-4 py-2 border rounded-md transition-all
            ${selectedColor === color
                      ? "bg-tertiary text-primary"
                      : "bg-primary text-primarytext"
                    }
           ${!hasStock
                      ? "opacity-100 cursor-not-allowed"
                      : "hover:border-tertiary"
                    }
          `}
                >
                  {color}
                  {!hasStock && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-thin opacity-30" ><Ban size={40} /></div>}
                </button>
              );
            })}
          </div>
        </div>


        {/* Size selection */}
        <div className="mt-4">
          <h4 className="font-medium mb-2">Size:</h4>
          <div className="flex gap-2 flex-wrap">
            {availableSizes.map(size => {
              const hasStock = variants.some(
                v => v.size === size && v.stock > 0
              );

              return (
                <button
                  key={size}
                  disabled={!hasStock}
                  onClick={() => setSelectedSize(prev => (prev === size ? null : size))}
                  className={`relative px-4 py-2 border rounded-md transition-all
            ${selectedSize === size
                      ? "bg-tertiary text-primary"
                      : "bg-primary text-primarytext"
                    }
            ${!hasStock
                      ? "opacity-100 cursor-not-allowed"
                      : "hover:border-tertiary"
                    }
          `}
                >
                  {size}
                  {!hasStock && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-thin opacity-30" ><Ban size={40} /></div>}
                </button>
              );
            })}
          </div>
        </div>


        {/* Stock info */}
        {selectedColor && selectedSize ? (
          <p className={`mt-2 ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </p>
        ) :
        isStock ? <p className="mt-2 ">Choose the color and size</p> : <p className="mt-2">Unavailable</p>
        }

        {/* Quantity & Add to Cart */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              className="px-3 py-1 hover:bg-gray-200"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={stock === 0}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              className="px-3 py-1 hover:bg-gray-200"
              onClick={() => setQuantity(q => Math.min(stock, q + 1))}
              disabled={stock === 0}
            >
              +
            </button>
          </div>
          <button
            className={`bg-tertiary text-primary px-6 py-2 border rounded-md font-semibold  hover:text-primarytext transition-all ${stock === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={stock === 0}
          >
            Add to Cart
          </button>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h4 className="font-medium mb-2">Description:</h4>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
}