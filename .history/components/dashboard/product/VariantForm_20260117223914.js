"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BiPlusCircle, BiTrash, BiEdit } from "react-icons/bi";
import { nanoid } from "nanoid";

const VariantForm = ({ variants, setVariants, productData }) => {
  const COLORS = [
    { name: "Red", hex: "#EF4444" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
  ];

  const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

  const [editingIndex, setEditingIndex] = useState(null); // index of variant being edited
  const [newVariant, setNewVariant] = useState({
    id: nanoid(),
    size: "",
    color: "",
    stock: 0,
    price: 0,
    sku: "",
    image: null,
  });

  const generateSKU = ({ product, size, color }) =>
    [product, size, color].filter(Boolean).join("-").toUpperCase();

  // Add variant
  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { ...newVariant, id: nanoid() },
    ]);
    setNewVariant({ id: nanoid(), size: "", color: "", stock: 0, price: 0, sku: "", image: null });
  };

  // Remove variant
  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  // Update variant
  const updateVariant = (index, updatedVariant) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? updatedVariant : v))
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Variant List */}
      <div>
        <h2 className="text-lg font-bold mb-2">Variants</h2>
        <div className="space-y-2">
          {variants.map((v, i) => (
            <div
              key={v.id}
              className="flex justify-between items-center border rounded p-2"
            >
              <div className="flex gap-2 items-center">
                <p className="bg-tertiary/50 text-primarytext p-1 text-sm rounded-2xl">Size:{v.size} </p>
                <p className="bg-tertiary/50 text-primarytext p-1 text-sm rounded-2xl">Color:{v.color}  </p>
                
                  SKU: {v.sku || "-"}  Stock: {v.stock} / $
                {v.price}
              </div>
              <div className="flex gap-2">
                <button
                  className="text-blue-600 flex items-center gap-1"
                  onClick={() => setEditingIndex(i)}
                >
                  <BiEdit /> Edit
                </button>
                <button
                  className="text-red-600 flex items-center gap-1"
                  onClick={() => removeVariant(i)}
                >
                  <BiTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Variant */}
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-2">Add New Variant</h3>
        <div className="flex gap-2 flex-wrap">
          <select
            value={newVariant.size}
            onChange={(e) =>
              setNewVariant((prev) => ({
                ...prev,
                size: e.target.value,
                sku: generateSKU({ product: productData.productName, size: e.target.value, color: prev.color }),
              }))
            }
            className="border p-2 rounded"
          >
            <option value="">Size</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={newVariant.color}
            onChange={(e) =>
              setNewVariant((prev) => ({
                ...prev,
                color: e.target.value,
                sku: generateSKU({ product: productData.productName, size: prev.size, color: e.target.value }),
              }))
            }
            className="border p-2 rounded"
          >
            <option value="">Color</option>
            {COLORS.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Stock"
            className="border p-2 rounded w-20"
            value={newVariant.stock}
            onChange={(e) =>
              setNewVariant((prev) => ({ ...prev, stock: Number(e.target.value) }))
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded w-24"
            value={newVariant.price}
            onChange={(e) =>
              setNewVariant((prev) => ({ ...prev, price: Number(e.target.value) }))
            }
          />

          <input
            type="text"
            placeholder="SKU"
            className="border p-2 rounded w-40"
            value={newVariant.sku}
            readOnly
          />

          <button
            onClick={addVariant}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-1"
          >
            <BiPlusCircle /> Add
          </button>
        </div>
      </div>

      {/* Edit Variant Modal */}
      {editingIndex !== null && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setEditingIndex(null)}
          ></div>

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 z-50 w-96 max-w-full transform -translate-x-1/2 -translate-y-1/2 bg-white border rounded p-4 shadow-lg">
            <h3 className="font-semibold mb-2">
              Edit Variant: {variants[editingIndex].sku || "-"}
            </h3>
            <div className="flex gap-2 flex-wrap">
              <select
                value={variants[editingIndex].size}
                onChange={(e) =>
                  updateVariant(editingIndex, {
                    ...variants[editingIndex],
                    size: e.target.value,
                    sku: generateSKU({
                      product: productData.productName,
                      size: e.target.value,
                      color: variants[editingIndex].color,
                    }),
                  })
                }
                className="border p-2 rounded"
              >
                <option value="">Size</option>
                {SIZES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <select
                value={variants[editingIndex].color}
                onChange={(e) =>
                  updateVariant(editingIndex, {
                    ...variants[editingIndex],
                    color: e.target.value,
                    sku: generateSKU({
                      product: productData.productName,
                      size: variants[editingIndex].size,
                      color: e.target.value,
                    }),
                  })
                }
                className="border p-2 rounded"
              >
                <option value="">Color</option>
                {COLORS.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>

              <input
                type="number"
                value={variants[editingIndex].stock}
                onChange={(e) =>
                  updateVariant(editingIndex, { ...variants[editingIndex], stock: Number(e.target.value) })
                }
                placeholder="Stock"
                className="border p-2 rounded w-20"
              />

              <input
                type="number"
                value={variants[editingIndex].price}
                onChange={(e) =>
                  updateVariant(editingIndex, { ...variants[editingIndex], price: Number(e.target.value) })
                }
                placeholder="Price"
                className="border p-2 rounded w-24"
              />

              <input
                type="text"
                value={variants[editingIndex].sku}
                readOnly
                className="border p-2 rounded w-40"
              />

              <button
                onClick={() => setEditingIndex(null)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VariantForm;
