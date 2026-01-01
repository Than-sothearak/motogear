"use client"
import Image from 'next/image';
import React, { useState } from 'react'

const VariantForm = ({ productData }) => {
    const [variants, setVariants] = useState(
        productData?.variants || [
            { size: "", color: "", stock: "", price: "", sku: "", images: [] }
        ]
    );
const [properties, setProperties] = useState(
    productData?.properties || [
        {
        name: "", part: ""
    }]
);


    // Add/remove variants
    function addVariants() {
        setVariants((prev) => [
            ...prev,
            { size: "", color: "", stock: "", price: "", sku: "", images: [] },
        ]);
    }

    function removeVariantImage(variantIndex, imageIndex) {
        setVariants((prev) => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[variantIndex].images[imageIndex].preview);
            updated[variantIndex].images.splice(imageIndex, 1);
            return updated;
        });
    }

    function addProperties() {
        setProperties((prev) => [
            ...prev,
            { name: "", part: "" },
        ]);
    }

    function removeVariants(index) {
        setVariants((prev) => prev.filter((_, i) => i !== index));
    }

    function removeProperties(index) {
        setProperties((prev) => prev.filter((_, i) => i !== index));
    }

    // Handle image upload
  function handleImageUpload(e, variantIndex) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const previews = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
    }));

    setVariants((prev) =>
        prev.map((variant, i) =>
            i === variantIndex
                ? {
                      ...variant,
                      images: [...variant.images, ...previews],
                  }
                : variant
        )
    );

    // ✅ reset input to prevent duplicate trigger
    e.target.value = "";
}

   function removeVariantImage(variantIndex, imageIndex) {
    setVariants((prev) =>
        prev.map((variant, i) => {
            if (i !== variantIndex) return variant;

            URL.revokeObjectURL(variant.images[imageIndex].preview);

            return {
                ...variant,
                images: variant.images.filter((_, idx) => idx !== imageIndex),
            };
        })
    );
}


    return (
        <div className="flex gap-4 max-2xl:flex-col">

            <div className="border rounded-md py-4 h-full">
                <div className="block mb-2 font-bold border-b px-3 pb-2">
                    <h1>Property</h1>
                </div>

                <input
                    value={JSON.stringify(properties)}
                    name="property"
                    className="hidden"

                />

                <div className="px-3 space-y-2 text-sm">
                    {properties.map((property, index) => (
                        <div
                            key={index}
                            className="flex gap-2"
                        >
                            <input
                                className="p-2 border rounded-lg w-full"
                                placeholder="Name"
                                value={property?.name}
                                onChange={(e) => {
                                    const newProperties = [...properties];
                                    newProperties[index].name = e.target.name;
                                    setProperties(newProperties);
                                }}
                            />
                            <input
                                className="p-2 border rounded-lg w-full"
                                placeholder="Value"
                                value={property?.part}
                                onChange={(e) => {
                                    const newProperties = [...properties];
                                    newProperties[index].part = e.target.part;
                                    setProperties(newProperties);
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




            {/* VARIANTS */}
            <div className="border rounded-md py-4 w-full">
                <div className="block mb-2 font-bold border-b px-3 pb-2">
                    <h1>Variants</h1>
                </div>

                <input
                    value={JSON.stringify(variants)}
                    name="variants"
                    className="hidden"
                    readOnly
                />

                <div className="px-3 space-y-2 text-sm">
                    {variants?.map((variant, index) => (
                        <div key={index} className='flex-col flex gap-4'>
                            <div

                                className="flex gap-2 max-sm:flex-wrap"
                            >
                                <input
                                    className="p-2 border rounded-lg w-full"
                                    placeholder="Size"
                                    value={variant.size}
                                    onChange={(e) => {
                                        const newVariants = [...variants];
                                        newVariants[index].size = e.target.value;
                                        setVariants(newVariants);
                                    }}
                                />
                                <input
                                    className="p-2 border rounded-lg w-full"
                                    placeholder="Color"
                                    value={variant.color}
                                    onChange={(e) => {
                                        const newVariants = [...variants];
                                        newVariants[index].color = e.target.value;
                                        setVariants(newVariants);
                                    }}
                                />
                                <input
                                    className="p-2 border rounded-lg w-full"
                                    placeholder="Stock"
                                    type="number"
                                    value={variant.stock}
                                    onChange={(e) => {
                                        const newVariants = [...variants];
                                        newVariants[index].stock = e.target.value;
                                        setVariants(newVariants);
                                    }}
                                />
                                <input
                                    className="p-2 border rounded-lg w-full"
                                    placeholder="Price"
                                    type="number"
                                    value={variant.price}
                                    onChange={(e) => {
                                        const newVariants = [...variants];
                                        newVariants[index].price = e.target.value;
                                        setVariants(newVariants);
                                    }}
                                />
                                <input
                                    className="p-2 border rounded-lg"
                                    placeholder="SKU"
                                    value={variant.sku}
                                    onChange={(e) => {
                                        const newVariants = [...variants];
                                        newVariants[index].sku = e.target.value;
                                        setVariants(newVariants);
                                    }}
                                />


                                <button
                                    onClick={() => removeVariants(index)}
                                    type="button"
                                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                                >
                                    Remove
                                </button>


                            </div>
                            <div className="border rounded-md py-4">
                                <div className="block mb-2 font-bold border-b px-3 pb-2">
                                    <h1>Product Images</h1>
                                </div>

                                <div className="px-3">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-tertiary/40 transition">
                                        <span className="text-gray-500 text-sm">
                                            Click or drag images here to upload
                                        </span>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, index)}
                                            className="hidden"
                                        />
                                    </label>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                                        {variant.images?.map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="relative w-full aspect-square rounded-lg overflow-hidden border"
                                            >
                                                <Image
                                                    src={img.preview}
                                                    alt="preview"
                                                    fill
                                                    unoptimized
                                                    className="object-cover"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => removeVariantImage(index, idx)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                                                >
                                                    ✕
                                                </button>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>


                    ))}

                    <button
                        onClick={addVariants}
                        type="button"
                        className="mt-2 bg-tertiary hover:bg-tertiary/80 text-white px-4 py-2 rounded-lg"
                    >
                        Add Variant
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VariantForm