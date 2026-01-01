"use client";

import { useState, useEffect, useActionState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addProduct, updateProduct } from "@/actions/products";
import VariantForm from "./product/VariantForm";

function ProductForm({ productData, categories, productId }) {
  const router = useRouter();
  // Images and variants state
  const [images, setImages] = useState(
    productData?.images?.map(url => ({ file: null, preview: url })) || []
  );

  // Product form state
  const [formData, setFormData] = useState({
    productName: productData?.productName || "",
    brandName: productData?.brandName || "",
    description: productData?.description || "",
    basePrice: productData?.basePrice || 0,
    discount: productData?.discount || 0,
    category: productData?.category || "",
    status: productData?.status || "active",
    variants: productData?.variant || [""],
  });

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Remove image
  function removeImage(index) {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       ...formData,
//       variants,
//       images,
//     };

//     try {
//       if (productId && updateProduct) {
//         await updateProduct(productId, data);
//         toast.success("Product updated successfully");
//       } else if (addProducts) {
//         await addProducts(data);
//         toast.success("Product added successfully");
//       }
//       router.refresh();
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

  const updateProductWIthId = updateProduct.bind(null, productData?._id);

  const [state, action] = useActionState(
    productId ? updateProductWIthId : addProduct, // Use update action if editing
    undefined,
    productId
  );
  useEffect(() => {
    if (state?.success) {
      const notify = () => toast(state.message);
      notify();
      router.refresh();
    }
  }, [state]);

  return (
    <div className="max-w-full mx-auto p-6 max-sm:px-2 max-sm:py-3 bg-white rounded-xl shadow-md">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">
          {productId ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-sm">Manage your product details</p>
      </header>

      <form
        action={action}
        className="space-y-4 bg-primary flex flex-col justify-end"
      >
        <div className="flex max-sm:flex-col gap-4">
          {/* LEFT */}
          <div className="border rounded-md py-4 w-full">
            <div className="block mb-2 font-bold border-b px-3 pb-2">
              <h1>Name and Description</h1>
            </div>

            <div className="space-y-3 px-3">
              <div className="space-y-2 text-sm">
                <div className="flex gap-4">
                    <label className={`${state?.errors?.brandName ? 'text-red-500' : 'text-primarytext'}`}>Brand name</label>
                {state?.errors?.brandName && <p className="text-red-500">*{state?.errors.brandName}</p>}
                </div>
                <input
                  type="text"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  placeholder="Brand Name"
                  className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2 text-sm">
                 <div className="flex gap-4">
                    <label className={`${state?.errors?.productName ? 'text-red-500' : 'text-primarytext'}`}>Product name</label>
                {state?.errors?.productName && <p className="text-red-500">*{state?.errors.productName}</p>}
                </div>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2 text-sm">
                <label className="text-primarytext">Product Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="border rounded-md py-4 w-full">
            <div className="block mb-2 font-bold border-b px-3 pb-2">
              <h1>Product Details</h1>
            </div>

            <div className="space-y-3 px-3">
              <div className="space-y-2 text-sm">
                      <div className="flex gap-4">
                    <label className={`${state?.errors?.basePrice ? 'text-red-500' : 'text-primarytext'}`}>Base Price</label>
                {state?.errors?.basePrice && <p className="text-red-500">*{state?.errors.basePrice}</p>}
                </div>
                <input
                  type="number"
                  name="basePrice"
                  id="basePrice"
                  value={formData.basePrice}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2 text-sm">
                <label className="text-primarytext">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="0"
                  className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2 text-sm">
                    <div className="flex gap-4">
                    <label className={`${state?.errors?.category ? 'text-red-500' : 'text-primarytext'}`}>Category</label>
                {state?.errors?.category && <p className="text-red-500">*{state?.errors.category}</p>}
                </div>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 text-sm">
                <label className="text-primarytext">Status</label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="out_of_stock">Out of stock</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <VariantForm productData={productData} />
        {/* IMAGES */}
        <div className="border rounded-md py-4">
          <div className="block mb-2 font-bold border-b px-3 pb-2">
            <h1>Product Images</h1>
          </div>

          <div className="px-3">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition">
              <span className="text-gray-500 text-sm">
                Click or drag images here to upload
              </span>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full aspect-square rounded-lg overflow-hidden border hover:shadow-lg transition"
                >
                  {img.preview && (
                    <Image
                      src={img.preview}
                      alt="preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    ✕
                  </button>

                  <span className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                    {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-tertiary text-white px-6 py-2 rounded-lg hover:bg-tertiary/80"
          >
            {productId ? "Update Product" : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
