const { useProductVariant } = require("../hooks/useProductVariants");

export default function ProductBox({ product }) {
  const {
    availableColors,
    availableSizes,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    stock,
    mainImage,
    selectedVariantId,
  } = useProductVariant(product.variants, product.imageUrls);

  const { addProduct } = useContext(CartContext);

  return (
    <div>
      <img src={mainImage} alt={product.productName} />
      <div>
        {availableColors.map(c => (
          <button key={c} onClick={() => setSelectedColor(c)}>{c}</button>
        ))}
        {availableSizes.map(s => (
          <button key={s} onClick={() => setSelectedSize(s)}>{s}</button>
        ))}
      </div>
      <button
        disabled={!selectedVariantId || stock === 0}
        onClick={() => addProduct(selectedVariantId, product.productName)}
      >
        Add to Cart
      </button>
    </div>
  );
}
