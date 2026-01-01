"use client";

import { useState, useEffect, useActionState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addProduct, updateProduct } from "@/actions/products";

function ProductForm({ productData, categories, productId }) {
  const router = useRouter();

  // PRODUCT IMAGES
  const [images, setImages] = useState(
    productData?.images?.map((url) => ({ file: null, preview: url })) || []
  );

  // VARIANTS (✅ images added)
  const [variants, setVariants] = useState(
    productData?.variants || [
      { size: "", color: "", stock: "", price: "", sku: "", images: [] },
    ]
  );

  // PRODUCT DATA
  const [formData, setFormData] = useState({
    productName: productData?.productName || "",
    brandName: productData?.brandName || "",
    description: productData?.description || "",
    basePrice: productData?.basePrice || 0,
    discount: productData?.discount || 0,
    category: productData?.category || "",
    status: productData?.status || "active",
  });

  // FORM CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // PRODUCT IMAGE UPLOAD
  function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...previews]);
  }

  function removeImage(index) {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  // VARIANT IMAGE UPLOAD ✅
  function handleVariantImageUpload(e, variantIndex) {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setVariants((prev) => {
      const updated = [...prev];
      updated[variantIndex].images.push(...previews);
      return updated;
    });
  }

  function removeVariantImage(variantIndex, imageIndex) {
    setVariants((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[variantIndex].images[imageIndex].preview);
      updated[variantIndex].images.splice(imageIndex, 1);
      return updated;
    });
  }

  // VARIANTS
  function addVariants() {
    setVariants((prev) => [
      ...prev,
      { size: "", color: "", stock: "", price: "", sku: "", images: [] },
    ]);
  }

  function removeVariants(index) {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  }

  // SERVER ACTION
  const updateProductWithId = updateProduct.bind(null, productData?._id);
  const [state, action] = useActionState(
    productId ? updateProductWithId : addProduct,
    undefined,
    productId
  );

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state]);

  return (
    <form action={action} className="space-y-6 bg-white p-6 rounded-xl shadow">
      {/* BASIC INFO */}
      <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} placeholder="Brand" />
      <input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="Product Name" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />

      {/* VARIANTS */}
      <input type="hidden" name="variants" value={JSON.stringify(variants)} />

      {variants.map((variant, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-2">
          <div className="flex gap-2">
            <input
              placeholder="Size"
              value={variant.size}
              onChange={(e) => {
                const v = [...variants];
                v[index].size = e.target.value;
                setVariants(v);
              }}
            />
            <input
              placeholder="Color"
              value={variant.color}
              onChange={(e) => {
                const v = [...variants];
                v[index].color = e.target.value;
                setVariants(v);
              }}
            />
            <input
              placeholder="Stock"
              type="number"
              value={variant.stock}
              onChange={(e) => {
                const v = [...variants];
                v[index].stock = e.target.value;
                setVariants(v);
              }}
            />
            <input
              placeholder="Price"
              type="number"
              value={variant.price}
              onChange={(e) => {
                const v = [...variants];
                v[index].price = e.target.value;
                setVariants(v);
              }}
            />
            <input
              placeholder="SKU"
              value={variant.sku}
              onChange={(e) => {
                const v = [...variants];
                v[index].sku = e.target.value;
                setVariants(v);
              }}
            />
          </div>

          {/* VARIANT IMAGES */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleVariantImageUpload(e, index)}
          />

          <div className="flex gap-2 flex-wrap">
            {variant.images.map((img, imgIdx) => (
              <div key={imgIdx} className="relative w-16 h-16 border rounded">
                <Image src={img.preview} alt="" fill unoptimized className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeVariantImage(index, imgIdx)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button type="button" onClick={() => removeVariants(index)} className="text-red-500">
            Remove Variant
          </button>
        </div>
      ))}

      <button type="button" onClick={addVariants}>
        Add Variant
      </button>

      {/* PRODUCT IMAGES */}
      <input type="file" multiple accept="image/*" onChange={handleImageUpload} />

      <div className="flex gap-2 flex-wrap">
        {images.map((img, idx) => (
          <div key={idx} className="relative w-20 h-20 border rounded">
            <Image src={img.preview} alt="" fill unoptimized className="object-cover" />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button type="submit" className="bg-black text-white px-6 py-2 rounded">
        {productId ? "Update Product" : "Save Product"}
      </button>
    </form>
  );
}

export default ProductForm;
