"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import VariantForm from "./product/VariantForm";
import { validatedData, validateProduct } from "@/lib/validateData";

function ProductForm({ productData, categories }) {
  const router = useRouter();

  // Main form state
  const [formData, setFormData] = useState({
    productName: productData?.productName || "",
    brandName: productData?.brandName || "",
    slug: productData?.slug || "",
    description: productData?.description || "",
    basePrice: productData?.basePrice || 0,
    discount: productData?.discount || 0,
    category: productData?.category || "",
    status: productData?.status || "active",
  });
  const [variants, setVariants] = useState(
    productData?.variants || [
      { size: "", color: "", stock: "", price: "", sku: "", images: [] },
    ]
  );

  const [properties, setProperties] = useState(
    productData?.properties || [{ name: "", part: "" }]
  );

  const [images, setImages] = useState(
    productData?.images?.map((url) => ({ file: null, preview: url })) || []
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      variants,
      properties,
      images: images.map((img) => img.preview),
    };

   const validationErrors = validateProduct({ ...formData, variants, properties });
  setErrors(validationErrors);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        alert("Product saved!");
        router.refresh();
      } else {
        console.error(data.errors || data.message);
        alert("Error saving product");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 max-sm:px-2 max-sm:py-3 bg-white rounded-xl shadow-md">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">
          {productData ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-sm">Manage your product details</p>
      </header>

      <form
        onSubmit={handleSubmit}
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
                {errors?.brandName && <p className="text-red-500">*{state?.errors.brandName}</p>}
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
                <label className="text-primarytext">Base Price</label>
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

        {/* Variant Form */}
        <VariantForm 
          productData={productData}
          setVariants={setVariants}
          variants={variants}
          properties={properties}
          setProperties={setProperties}
        />

        {/* Submit */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-tertiary text-white px-6 py-2 rounded-lg hover:bg-tertiary/80"
          >
            {productData ? "Update Product" : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
