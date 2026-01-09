"use client";

import { Ban } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProductSinglePage({ product }) {
  const { productName, basePrice, brandName, description, variants, imageUrls } = product;

  const [mainImage, setMainImage] = useState(imageUrls[0]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [stock, setStock] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Init colors & sizes
  useEffect(() => {
    setAvailableColors([...new Set(variants.map(v => v.color))]);
    setAvailableSizes([...new Set(variants.map(v => v.size))]);
  }, [variants]);


  // Update stock & image when color or size changes
  useEffect(() => {
    if (selectedColor) {
      const variant = variants.find(
        v => v.color === selectedColor 
      );
      if (variant) {
        setStock(variant.stock);
        setMainImage(variant.images || imageUrls[0]);
      } else {
        setStock(0);
      }
    }
  }, [selectedColor, selectedSize, variants, imageUrls]);

  return (
    <div className="container mx-auto p-4 lg:flex lg:gap-8">
      {/* Left: Image gallery */}
      <div className="lg:w-1/2 flex flex-col justify-center items-center">
        <div className="relative w-1/2 aspect-square  rounded-md overflow-hidden mb-4">
          <Image src={mainImage} alt={productName} fill className="object-contain" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {imageUrls.map((img, idx) => (
            <div
              key={idx}
              className={`relative  w-20 h-20 border rounded-md overflow-hidden cursor-pointer ${mainImage === img ? "ring-2 ring-primary" : ""
                }`}
              onClick={() => setMainImage(img)}
            >
              <Image src={img} alt={`${productName} ${idx}`} fill className="object-contain" />
            </div>
          ))}
        </div>
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
          onClick={() => setSelectedColor(color)}
          className={`relative px-4 py-2 border rounded-md transition-all
            ${
              selectedColor === color
                        ? "bg-tertiary text-primary"
                      : "bg-primary text-primarytext"
            }
           ${!hasStock
                      ? "opacity-100 cursor-not-allowed"
                      : "hover:border-primary"
                    }
          `}
        >
          {color}
               {!hasStock && <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-thin opacity-30" ><Ban size={40} /></div>}
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
                  onClick={() => setSelectedSize(size)}
                  className={`relative px-4 py-2 border rounded-md transition-all
            ${selectedSize === size
                      ? "bg-tertiary text-primary"
                      : "bg-primary text-primarytext"
                    }
            ${!hasStock
                      ? "opacity-100 cursor-not-allowed"
                      : "hover:border-primary"
                    }
          `}
                >
                  {size}
                  {!hasStock && <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-thin opacity-30" ><Ban size={40} /></div>}
                </button>
              );
            })}
          </div>
        </div>


        {/* Stock info */}
        {selectedColor && selectedSize && (
          <p className={`mt-2 ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </p>
        )}

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
            className={`bg-tertiary text-primary px-6 py-2 border rounded-md font-semibold hover:bg-primary hover:text-primarytext transition-all ${stock === 0 ? "opacity-50 cursor-not-allowed" : ""
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
