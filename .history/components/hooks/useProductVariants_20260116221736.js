import { useEffect } from "react";

export function useProductVariants(variants, imageUrls) {
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [stock, setStock] = useState(0);
  const [mainImage, setMainImage] = useState(imageUrls?.[0] || null);

  useEffect(() => {
    const colors = [...new Set(variants.map(v => v.color).filter(Boolean))];
    const sizes = [...new Set(variants.map(v => v.size).filter(Boolean))];

    setAvailableColors(colors);
    setAvailableSizes(sizes);

    // If no variants with color/size, just use first variant
    if (colors.length === 0 && sizes.length === 0 && variants.length > 0) {
      setStock(variants[0].stock);
      setMainImage(variants[0].images || imageUrls?.[0]);
    }
  }, [variants, imageUrls]);

  useEffect(() => {
    if (!selectedColor && !selectedSize) {
      // If product has no options, keep stock from first variant
      if (availableColors.length === 0 && availableSizes.length === 0 && variants.length > 0) {
        setStock(variants[0].stock);
        setMainImage(variants[0].images || imageUrls?.[0]);
      } else {
        setStock(0);
      }
      return;
    }

    const variant = variants.find(
      v =>
        (selectedColor ? v.color === selectedColor : true) &&
        (selectedSize ? v.size === selectedSize : true)
    );

    if (variant) {
      setStock(variant.stock);
      setMainImage(variant.images || imageUrls?.[0]);
    } else {
      setStock(0);
    }
  }, [selectedColor, selectedSize, variants, imageUrls, availableColors, availableSizes]);

  return {
    availableColors,
    availableSizes,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    stock,
    mainImage,
  };
}
