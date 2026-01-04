"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BiPlusCircle } from "react-icons/bi";

const VariantForm = ({ setVariants, setProperties, properties, variants,
}) => {

  const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const COLORS = [
    { name: "Red", hex: "#EF4444" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Green", hex: "#10B981" },
    { name: "Gray", hex: "#6B7280" },
    { name: "Navy", hex: "#1E3A8A" }
  ];

  // Add/remove variants
  const addVariants = () => {
    setVariants((prev) => [
      ...prev,
      { size: "", color: "", stock: 0, price: 0, sku: "", images: [] },
    ]);
  };

  const removeVariants = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  // Add/remove properties
  const addProperties = () => {
    setProperties((prev) => [...prev, { name: "", part: "" }]);
  };

  const removeProperties = (index) => {
    setProperties((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle image upload
  const handleImageUpload = (e, variantIndex) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const image = {
      file,
      preview: URL.createObjectURL(file),
    };

    setVariants((prev) =>
      prev.map((v, i) =>
        i === variantIndex ? { ...v, image } : v
      )
    );

    e.target.value = "";
  };

  const removeVariantImage = (variantIndex) => {
    setVariants((prev) =>
      prev.map((v, i) => {
        if (i !== variantIndex) return v;
        if (v.image?.preview) URL.revokeObjectURL(v.image.preview);
        return { ...v, image: null };
      })
    );
  };

  return (
    <div className="flex gap-4 max-2xl:flex-col">
      {/* Properties */}
      <div className="border rounded-md py-4 h-full">
        <div className="block mb-2 font-bold border-b px-3 pb-2">
          <h1>Properties</h1>
        </div>

        <div className="px-3 space-y-2 text-sm">
          {properties.map((property, index) => (
            <div key={index} className="flex gap-2">
              <input
                required
                className="p-2 border rounded-lg w-full"
                placeholder="Name"
                value={property.name}
                onChange={(e) => {
                  const newProps = [...properties];
                  newProps[index].name = e.target.value;
                  setProperties(newProps);
                }}
              />
              <input
                required
                className="p-2 border rounded-lg w-full"
                placeholder="Value"
                value={property.part}
                onChange={(e) => {
                  const newProps = [...properties];
                  newProps[index].part = e.target.value;
                  setProperties(newProps);
                }}
              />
              <button
                onClick={() => removeProperties(index)}
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={addProperties}
            type="button"
            className="mt-2 bg-tertiary hover:bg-tertiary/80 text-white px-4 py-2 rounded-lg whitespace-nowrap"
          >
            Add Property
          </button>
        </div>
      </div>

      {/* Variants */}
      <div className="border rounded-md py-4 w-full">
        <div className="flex justify-between items-center mb-2 font-bold border-b px-3 pb-2">

          <h1>Variants</h1>

        </div>

        <div className="px-3 space-y-2">

          <button
            onClick={addVariants}
            type="button"
            className="flex gap-2 mt-2 bg-tertiary hover:bg-tertiary/80 text-white px-2 py-2 rounded-lg whitespace-nowrap"
          >
            <BiPlusCircle size={22} /> <p>Add variant</p>
          </button>
          <div className="space-y-2 text-sm">
            {variants.map((variant, index) => (
              <div key={index} className="flex-col flex gap-4">
                <div className="flex gap-2 max-sm:flex-wrap justify-end items-end">
                <div className="w-full flex flex-col">
                    <label>Size</label>
                  <select
                    name="variantSize[]"
                    className="p-2 border rounded bg-white "
                    required
                    placeholder="Size"
                    value={variant.size}
                    onChange={(e) => {
                      const newVariants = [...variants];
                      newVariants[index].size = e.target.value;
                      setVariants(newVariants);
                    }}
                  >

                    <option value="">Size</option>
                    {SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                  <div className="w-full flex flex-col">
                    <label>Color</label>
                    <select
                    name="variantSize[]"
                    className="p-2 border rounded bg-white w-full"

                    placeholder="Color"
                    value={variant.color}
                    onChange={(e) => {
                      const newVariants = [...variants];
                      newVariants[index].color = e.target.value;
                      setVariants(newVariants);
                    }}
                  >

                    <option value="">Color</option>
                    {COLORS.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  </div>

                      <div className="flex flex-col w-full">
                  <label>Stock</label>
                    <input
                    required
                    className="p-2 border rounded-lg w-full"
                    placeholder="Stock"
                    type="number"
                    value={variant.stock}
                    onChange={(e) => {
                      const newVariants = [...variants];
                      newVariants[index].stock = Number(e.target.value);
                      setVariants(newVariants);
                    }}
                  />
                </div>
            
                <div className="flex flex-col w-full">
                  <label>Price USD</label>
                    <input
                    required
                    className="p-2 border rounded-lg w-full"
                    placeholder="Price"
                    type="number"
                    value={variant.price}
                    onChange={(e) => {
                      const newVariants = [...variants];
                      newVariants[index].price = Number(e.target.value);
                      setVariants(newVariants);
                    }}
                  />
                </div>
                <div>
                  <label>SKU</label>
                    <input
                    required
                    className="p-2 border rounded-lg"
                    placeholder="SKU"
                    value={variant.sku}
                    onChange={(e) => {
                      const newVariants = [...variants];
                      newVariants[index].sku = e.target.value;
                      setVariants(newVariants);
                    }}
                  />
                  
                </div>
                    <button
                    onClick={() => removeVariants(index)}
                    type="button"
                    className="bg-red-500 text-white px-2 py-1 rounded-lg h-9"
                  >
                    Remove
                  </button>
                </div>

                {/* Variant Images */}
                <div className="border rounded-md py-4 w-80">
                  <div className="block mb-2 font-bold border-b px-3 pb-2">
                    <h1>Variant Image</h1>
                  </div>

                  <div className="px-3">
                    <label
                      className={`${!variant.image ? "" : "hidden"
                        } flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-tertiary/40 transition`}
                    >
                      <span className="text-gray-500 text-sm">
                        Click or drag images here to upload
                      </span>
                      <input
                        type="file"
                        name="variantImages"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, index)}
                      />
                    </label>

                    {variant.image && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">

                        <div

                          className="relative w-28 aspect-square rounded-lg overflow-hidden border"
                        >
                          <Image
                            src={variant.image.preview}
                            alt="preview"
                            fill
                            unoptimized
                            className="object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => removeVariantImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                          >
                            ✕
                          </button>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
};

export default VariantForm;
