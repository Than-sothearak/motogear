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
}) => {

    const [editingIndex, setEditingIndex] = useState(null); // index of variant being edited
    const [isAdd, setIsAdd] = useState(false)
  // Add/remove variants
  const addVariants = () => {
    setVariants((prev) => [
      ...prev,
      { id: nanoid(), size: "", color: "", stock: 0, price: 0, sku: "" },
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
      prev.map((v, i) => (i === variantIndex ? { ...v, image } : v))
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
          new Set([...(prevFormData.removedImages || []), removedImage])
        ),
      }));
    }
  };

  return (
    <div className="flex gap-4 max-2xl:flex-col">
      {/* Properties */}
      <div className="border rounded-md py-4 h-full lg:w-1/2">
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
      <div className="border rounded-md py-4 w-full h-full">
        <div className="flex justify-between items-center mb-2 font-bold border-b px-3 pb-2">
          <h1>Variants</h1>
          <button onClick={() => setIsAdd(true)} type="button">+</button>
        </div>
        <div className="px-3 space-y-2">
          <button
            onClick={addVariants}
            type="button"
            className="flex gap-2 mt-2 bg-tertiary hover:bg-tertiary/80 text-white px-2 py-2 rounded-lg whitespace-nowrap"
          >
            <BiPlusCircle size={22} /> <p>Add variant</p>
          </button>
          <div className="space-y-2 text-sm flex flex-col-reverse">
          </div>
        </div>
       <div className="flex flex-col gap-2 text-sm">
         {variants.map((v, index) => (
<div key={v.sku} className="flex justify-between items-center">
            <div className="flex gap-2 items-center w-full ">
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
                      </div>
                    )}
                    {!v.images && (
                      <div className="">
                        <label
                          className={`${
                            !v.image ? "" : "hidden"
                          } flex flex-col items-center justify-center w-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-tertiary/40 transition`}
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
             <p className="bg-tertiary text-primary  p-2 rounded-xl">{v.size}</p>
           </div>
            <div className="border-l px-2 flex flex-col items-center justify-center">
            <p className="">Color</p>
             <p className="bg-tertiary text-primary flex p-2 rounded-xl">{v.color}</p>
           </div>

              <div className="border-l px-2">
            <p className="">Stock</p>
             <p className="bg-tertiary text-primary flex p-2 rounded-xl w-full">{v.stock}</p>
           </div>

               <div className="border-l px-2">
            <p className="">Price</p>
             <p className="bg-tertiary text-primary flex p-2 rounded-xl w-full">{v.price}$</p>
           </div>

               <div className="border-l px-2">
            <p className="">SKU</p>
             <p className="bg-tertiary text-primary flex p-2 rounded-xl w-full whitespace-nowrap">{v.sku}</p>
           </div>
       

          </div>

              <div className="w-full">
               
     <button
                onClick={() => setEditingIndex(index)}
                type="button"
                className="bg-blue-500 text-white px-2 py-1 rounded-lg"
              >
                Edit
              </button>
                 <button
                    onClick={() => removeVariants(index)}
                    type="button"
                    className="bg-red-500 text-white px-2 py-1 rounded-lg h-9"
                  >
                   <TrashIcon />
                  </button>
    </div>
</div>
        ))}
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

  // {variants.map((variant, index) => (
  //             <div key={variant.id} className="flex-col flex gap-4">
  //               <div className="flex gap-2 max-sm:flex-wrap justify-end items-end">
  //                 <div className="w-full flex flex-col">
  //                   <label>Size</label>
  //                   <select
  //                     name="variantSize[]"
  //                     className="p-2 border rounded bg-white "
  //                     required
  //                     placeholder="Size"
  //                     value={variant.size}
  //                     onChange={(e) => {
  //                       const newVariants = [...variants];
  //                       const size = e.target.value;

  //                       newVariants[index].size = size;

  //                       newVariants[index].sku = generateSKU({
  //                         product: productData.productName,
  //                         size,
  //                         color: newVariants[index].color,
  //                       });

  //                       setVariants(newVariants);
  //                     }}
  //                   >
  //                     <option value="">Size</option>
  //                     {SIZES.map((s) => (
  //                       <option key={s} value={s}>
  //                         {s}
  //                       </option>
  //                     ))}
  //                   </select>
  //                 </div>
  //                 <div className="w-full flex flex-col">
  //                   <label>Color</label>
  //                   <select
  //                     name="variantSize[]"
  //                     className="p-2 border rounded bg-white w-full"
  //                     placeholder="Color"
  //                     value={variant.color}
  //                     onChange={(e) => {
  //                       const newVariants = [...variants];
  //                       const color = e.target.value;

  //                       newVariants[index].color = color;

  //                       newVariants[index].sku = generateSKU({
  //                         product: productData.productName,
  //                         size: newVariants[index].size,
  //                         color,
  //                       });

  //                       setVariants(newVariants);
  //                     }}
  //                   >
  //                     <option value="">Color</option>
  //                     {COLORS.map((c) => (
  //                       <option key={c.name} value={c.name}>
  //                         {c.name}
  //                       </option>
  //                     ))}
  //                   </select>
  //                 </div>

  //                 <div className="flex flex-col w-full">
  //                   <label>Stock</label>
  //                   <input
  //                     required
  //                     className="p-2 border rounded-lg w-full"
  //                     placeholder="Stock"
  //                     type="number"
  //                     value={variant.stock}
  //                     onChange={(e) => {
  //                       const newVariants = [...variants];
  //                       newVariants[index].stock = Number(e.target.value);
  //                       setVariants(newVariants);
  //                     }}
  //                   />
  //                 </div>

  //                 <div className="flex flex-col w-full">
  //                   <label>Price USD</label>
  //                  <input
  //                     required
  //                     className="p-2 border rounded-lg w-full"
  //                     placeholder="Price"
  //                     type="number"
  //                     value={variant.price}
  //                     onChange={(e) => {
  //                       const newVariants = [...variants];
  //                       newVariants[index].price = Number(e.target.value);
  //                       setVariants(newVariants);
  //                     }}
  //                   />
  //                 </div>
  //                 <div>
  //                   <label>SKU</label>
  //                   <input
  //                     required
  //                     className="p-2 border rounded-lg"
  //                     placeholder="SKU"
  //                     value={variant.sku}
  //                     onChange={(e) => {
  //                       const newVariants = [...variants];
  //                       newVariants[index].sku = e.target.value;
  //                       setVariants(newVariants);
  //                     }}
  //                   />
  //                 </div>
  //                 <button
  //                   onClick={() => removeVariants(index)}
  //                   type="button"
  //                   className="bg-red-500 text-white px-2 py-1 rounded-lg h-9"
  //                 >
  //                   Remove
  //                 </button>
  //               </div>

  //               {/* Variant Images */}
             
  //             </div>
  //           ))}