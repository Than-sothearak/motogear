// components/frontend/ProductBoxSkeleton.jsx
const ProductBoxSkeleton = () => {
  return (
    <div className="rounded-xl space-y-3 animate-pulse bg-white dark:bg-neutral-900">
      {/* Image */}
      <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg" />

      {/* Product name */}
      <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />

      {/* Price */}
      <div className="h-2 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />

      {/* Button */}
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
    </div>
  );
};


const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="container m-auto grid grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductBoxSkeleton key={i} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
