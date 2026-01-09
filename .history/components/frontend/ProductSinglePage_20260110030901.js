"use client";

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
    if (selectedColor && selectedSize) {
      const variant = variants.find(
        v => v.color === selectedColor && v.size === selectedSize
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
      <div className="lg:w-1/2">
        <div className="relative w-full h-[100px] rounded-md border overflow-hidden mb-4">
          <Image src={mainImage} alt={productName} fill className="object-contain" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {imageUrls.map((img, idx) => (
            <div
              key={idx}
              className={`w-20 h-20 border rounded-md overflow-hidden cursor-pointer ${
                mainImage === img ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setMainImage(img)}
            >
              <Image src={img} alt={`${productName} ${idx}`} width={20} height={20} className="object-contain" />
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
  <div className="flex gap-2">
    {availableColors.map(color => {
      const inStock = variants.some(
        v =>
          v.color === color &&
          (!selectedSize || v.size === selectedSize) &&
          v.stock > 0
      );
      return (
        <button
          key={color}
          onClick={() => setSelectedColor(color)}
          className={`px-3 py-1 border rounded-md relative ${
            selectedColor === color
              ? "bg-tertiary text-primary"
              : "bg-primary text-primarytext"
          }`}
        >
          {color}
      
        </button>
      );
    })}
  </div>
</div>

{/* Size selection */}
<div className="mt-4">
  <h4 className="font-medium mb-2">Size:</h4>
  <div className="flex gap-2">
    {availableSizes.map(size => {
      const inStock = variants.some(
        v =>
          v.size === size &&
          (!selectedColor || v.color === selectedColor) &&
          v.stock > 0
      );
      return (
        <button
          key={size}
          onClick={() => setSelectedSize(size)}
          className={`px-3 py-1 border rounded-md relative ${
            selectedSize === size
               ? "bg-tertiary text-primary"
              : "bg-primary text-primarytext"
          }`}
        >
          {size}
          {!inStock && (
            <span className="absolute inset-0 bg-gray-200 opacity-50 rounded-md flex items-center justify-center text-xs text-red-600 font-bold">
              Out of Stock
            </span>
          )}
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
            className={`bg-tertiary text-primary px-6 py-2 rounded-md font-semibold hover:bg-primary hover:text-white transition-all ${
              stock === 0 ? "opacity-50 cursor-not-allowed" : ""
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
