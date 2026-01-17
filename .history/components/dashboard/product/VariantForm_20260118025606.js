"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BiPlusCircle, BiTrash } from "react-icons/bi";
import { nanoid } from "nanoid";
import { TrashIcon } from "lucide-react";
import { VariantPopUpForm } from "./VariantPopUpForm";

const VariantForm = ({
  setVariants,
  setProperties,
  properties,
  variants,
  setFormData,
  productData,
  isEditing,
}) => {
  const [editingIndex, setEditingIndex] = useState(null); // index of variant being edited
  const [isAdd, setIsAdd] = useState(false);
  // Add/remove variants
  const addVariants = () => {
    setVariants((prev) => [
      ...prev,
      { id: nanoid(), size: "", color: "", stock: "", price: "", sku: "" },
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
      prev.map((v, i) => (i === variantIndex ? { ...v, image } : v)),
    );

    e.target.value = "";
  };

  const removeVariantImage = (variantIndex) => {
    setVariants((prev) =>
      prev.map((v, i) => {
        if (i !== variantIndex) return v;
        if (v.image?.preview) URL.revokeObjectURL(v.image.preview);
        return { ...v, image: null };
      }),
    );
  };
  const handleRemoveVariantImage = (variantIndex) => {
    const variant = variants[variantIndex];
    if (!variant) return;

    const removedImage = variant.images; // store image URL

    // Remove image from variants
    const newVariants = [...variants];
    newVariants[variantIndex] = { ...variant, images: null, image: null }; // remove both existing and uploaded

    setVariants(newVariants);

    // Update removedImages in formData
    if (removedImage) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        removedImages: Array.from(
          new Set([...(prevFormData.removedImages || []), removedImage]),
        ),
      }));
    }
  };

  const addMoreVarint = () => {
    addVariants();
    setIsAdd(true);
  };

  return (
    <div className="flex gap-4 max-2xl:flex-col">
      {/* Properties */}
      <div className="border rounded-md py-4 h-full w-full">
        <div className="flex justify-between items-center mb-2 font-bold border-b px-3 pb-2">
          <h1>Properties</h1>
        </div>

        <div className="px-3 space-y-2 text-sm">
         {properties.length > 0 ?  properties.map((property, index) => (
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
          )) : <div>No properties</div>}
         
         {isEditing &&
          <button
            onClick={addProperties}
            type="button"
            className=" bg-tertiary hover:bg-tertiary/80 text-white px-4 py-2 rounded-sm whitespace-nowrap"
          >
            Add Property
          </button>}
        </div>
      </div>

      {/* Variants */}
      <div className="border rounded-md py-4 h-full w-full">
        <div className="flex justify-between items-center mb-2 font-bold border-b px-3 pb-2">
          <h1>Variants</h1>
        </div>
    
          <div className="px-3 space-y-2 text-sm">
            
          {variants.length > 0 ? 
          variants.map((v, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full"
            >
              <div className="flex gap-2 items-center w-full h-full max-lg:flex-wrap justify-between">
                <div className="rounded-md">
                  <div className="flex justify-start items-center gap-6 p-1">
                    {v.images && (
                      <div
                        className={`relative z-0 aspect-square rounded-md bg-tertiary/10 group w-16 gap-4 `}
                        key={v.image}
                      >
                        <Image
                          fill
                          sizes="(max-width: 60px) 10vw, (max-width: 50px) 50vw, 33vw"
                          alt={`Image ${v.images}`}
                          className="rounded-md object-cover transition-opacity duration-300 group-hover:opacity-25"
                          src={`${v.images}`}
                        />
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => handleRemoveVariantImage(index)}
                            className="flex justify-center items-center absolute top-1/2 left-1/2  text-slate-200
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                 transform -translate-x-1/2 -translate-y-1/2 "
                          >
                            <BiTrash
                              className="duration-300 rounded-full p-2 w-9 h-9
                                 transform hover:scale-125 scale-100 bg-black opacity-50 hover:opacity-90 "
                              size={20}
                            />
                          </button>
                        )}
                      </div>
                    )}
                    {!v.images && (
                      <div className="">
                        <label
                          className={`${
                            !v.image ? "" : "hidden"
                          } flex flex-col items-center h-5 justify-center w-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-tertiary/40 transition`}
                        >
                          <span className="text-gray-500 text-sm p-3">
                            Upload
                          </span>
                          <input
                            type="file"
                            name="variantImages"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, index)}
                            hidden
                          />
                        </label>

                        {v.image && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center">
                            <div className="relative w-16 aspect-square rounded-lg overflow-hidden border">
                              <Image
                                src={v.image.preview}
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
                    )}
                  </div>
                </div>

                <div className="border-l px-2">
                  <p className="">Size:</p>
                 {v.size &&  <p className="bg-tertiary text-primary  p-2 rounded-xl">
                    {v.size}
                  </p>}
                </div>
                <div className="border-l px-2 flex flex-col items-center justify-center">
                  <p className="">Color</p>
                  {v.color && <p className="bg-tertiary text-primary flex p-2 rounded-xl">
                    {v.color}
                  </p>}
                </div>

                <div className="border-l px-2">
                  <p className="">Stock</p>
                  {v.stock && <p className="bg-tertiary text-primary flex p-2 rounded-xl w-full">
                    {v.stock}
                  </p>}
                </div>

                <div className="border-l px-2">
                  <p className="">Price</p>
                {v.price &&   <p className="bg-tertiary text-primary flex p-2 rounded-xl w-full">
                    {v.price}$
                  </p>}
                </div>

                <div className="border-l px-2">
                  <p className="">SKU</p>
                 {v.sku &&  <p className=" flex py-2 rounded-xl w-full lg:whitespace-nowrap max-w-64 overflow-clip">
                    {v.sku}
                  </p>}
                </div>
              </div>

              {isEditing && (
                <div className="w-full flex gap-2  h-full justify-end">
                  <button
                    onClick={() => setEditingIndex(index)}
                    type="button"
                    className="border text-primaryTex px-2 py-1 rounded-sm hover:bg-tertiary hover:text-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeVariants(index)}
                    type="button"
                    className="border text-primaryText px-2 py-1 rounded-sm hover:bg-tertiary hover:text-primary h-9"
                  >
                    <TrashIcon size={14}/>
                  </button>
                </div>
              )}
            </div>
          )) : <div>No variant</div>}
      

            {isEditing && (
          <div className="space-y-2">
            <button
              onClick={addVariants}
              type="button"
              className=" bg-tertiary hover:bg-tertiary/80 text-white px-4 py-2 rounded-sm whitespace-nowrap flex gap-2"
            >
              <BiPlusCircle size={22} /> <p>Add variant</p>
            </button>
          </div>
        )}
          </div>
      </div>
      <VariantPopUpForm
        editingIndex={editingIndex}
        variants={variants}
        setVariants={setVariants}
        productData={productData}
        setEditingIndex={setEditingIndex}
        setFormData={setFormData}
      />
    </div>
  );
};

export default VariantForm;
