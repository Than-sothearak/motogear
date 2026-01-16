import { useState, useEffect } from "react";

export function useProductVariant(variants = [], imageUrls = []) {
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [stock, setStock] = useState(0);
  const [mainImage, setMainImage] = useState(imageUrls?.[0] || null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

useEffect(() => {
  const colors = [...new Set(variants.map(v => v.color).filter(Boolean))];
  const sizes = [...new Set(variants.map(v => v.size).filter(Boolean))];

  setAvailableColors(colors);
  setAvailableSizes(sizes);

  // If product has no variants, default to first variant
  if (colors.length === 0 && sizes.length === 0 && variants.length > 0) {
    const firstVariant = variants[0];
    // ✅ only update if different
    if (stock !== firstVariant.stock) {
      setStock(firstVariant.stock);
    }
    if (mainImage !== (firstVariant.images || imageUrls?.[0])) {
      setMainImage(firstVariant.images || imageUrls?.[0]);
    }
    if (selectedVariantId !== firstVariant._id) {
      setSelectedVariantId(firstVariant._id);
    }
  }
}, [variants, imageUrls]);


  // Update stock & image when color/size changes
  useEffect(() => {
    if (!selectedColor  ) {
      setSelectedVariantId(null);
      return;
    }

    const variant = variants.find(
      v =>
        (selectedColor ? v.color === selectedColor : true) 
    );

    if (variant) {
      setStock(variant.stock);
      setMainImage(variant.images || imageUrls?.[0]);
      setSelectedVariantId(variant._id);
    } else {
      setStock(0);
      setSelectedVariantId(null);
    }
  }, [selectedColor, selectedSize, variants, imageUrls]);

  return {
    availableColors,
    availableSizes,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    stock,
    mainImage,
    setMainImage,
    selectedVariantId, // ✅ expose variant ID
  };
}
