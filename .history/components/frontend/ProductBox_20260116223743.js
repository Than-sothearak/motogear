import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import { useProductVariant } from "../hooks/useProductVariants";

const ProductBox = ({
  productName, basePrice, brandName, description, variants, imageUrls, _id, slug
}) => {
  const { addProduct } = useContext(CartContext);
  const handleClick = (id, title) => {
    addProduct(id, title);
  };

    const {
      availableColors,
      availableSizes,
      selectedColor,
      setSelectedColor,
      selectedSize,
      setSelectedSize,
      stock,
      mainImage,
      setMainImage, // ✅ expose this from your hook
    } = useProductVariant(variants, imageUrls);

  return (
    <div className="border p-4">
      <Link href={`/products/${slug}`} className="w-full space-y-4">
        <div className="relative h-48 bg-white overflow-hidden p-4 rounded-sm hover:scale-105 transition-all duration-300 scale-100 ">
          <Image
            loading="lazy"
            quality={50}
            src={
             mainImage ||
              "https://images.unsplash.com/photo-1633783714421-332b7f929148?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bm8lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
            }
            fill
            alt={productName}
            className="object-contain"
          />
        </div>

        <div className="">
          <h3 className="font-semibold whitespace-nowrap overflow-clip group-hover:underline w-full">
            {productName}
          </h3>
          <p className="text-sm text-gray-500">{brandName}</p>
        </div>
      </Link>

            {/* Variant selectors */}
      {availableColors.length > 0 && (
        <div className="mt-2">
          {availableColors.map(c => (
            <button key={c} onClick={() => setSelectedColor(c)}
              className={selectedColor === c ? "bg-tertiary" : "bg-gray-200"}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {availableSizes.length > 0 && (
        <div className="mt-2">
          {availableSizes.map(s => (
            <button key={s} onClick={() => setSelectedSize(s)}
              className={selectedSize === s ? "bg-tertiary" : "bg-gray-200"}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <span className="font-bold">${basePrice}</span>
        <button
          onClick={() => handleClick(_id, productName)}
          className="text-sm font-semibold uppercase hover:underline bg-tertiary p-2 text-primary rounded-sm"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductBox;
