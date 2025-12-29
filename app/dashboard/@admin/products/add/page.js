"use client";

import { useState } from "react";
import Image from "next/image";

export default function AddProductForm({ categories }) {
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([
    { size: "", color: "", stock: "", price: "", sku: "" },
  ]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages(urls);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { size: "", color: "", stock: "", price: "", sku: "" },
    ]);
  };

  const removeVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form className="space-y-6">
        {/* Brand & Product Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Brand Name"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Product Name"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Slug & Description */}
        <div>
          <input
            type="text"
            placeholder="Slug"
            className="p-3 border rounded-lg w-full mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Description"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
        </div>

        {/* Base Price & Discount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Base Price"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="number"
            placeholder="Discount"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category & Parent Category */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Select Category</option>
            {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>
          <select className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Parent Category (optional)</option>
            {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>
        </div> */}

        {/* Status */}
        <select className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>

        {/* Images */}
        <div>
          <label className="block mb-2 font-medium">Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex gap-4 mt-3 flex-wrap">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-24 h-24 rounded-lg overflow-hidden border"
              >
                <Image
                  src={img}
                  alt={`img-${idx}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Variants */}
        <div>
          <h2 className="font-semibold mb-2">Variants</h2>
          {variants.map((variant, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-6 gap-2 mb-2 items-end"
            >
              <input
                type="text"
                placeholder="Size"
                value={variant.size}
                onChange={(e) =>
                  handleVariantChange(index, "size", e.target.value)
                }
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Color"
                value={variant.color}
                onChange={(e) =>
                  handleVariantChange(index, "color", e.target.value)
                }
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                placeholder="Stock"
                value={variant.stock}
                onChange={(e) =>
                  handleVariantChange(index, "stock", e.target.value)
                }
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) =>
                  handleVariantChange(index, "price", e.target.value)
                }
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="SKU"
                value={variant.sku}
                onChange={(e) =>
                  handleVariantChange(index, "sku", e.target.value)
                }
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addVariant}
            className="mt-2 bg-secondary text-white px-4 py-2 rounded-lg"
          >
            Add Variant
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
