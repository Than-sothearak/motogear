"use client"
import React, { useState } from 'react'

const VariantForm = ({productData}) => {
  const [variants, setVariants] = useState(
    productData?.variants || [{ size: "", color: "", stock: "", price: "", sku: "" }]
  );

  const [properties, setProperties] = useState([{
    part: "", value: ""
  }])
  
      // Add/remove variants
  function addVariants() {
    setVariants((prev) => [
      ...prev,
      { size: "", color: "", stock: "", price: "", sku: "" },
    ]);
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
  return (
    <div className="flex gap-4 max-2xl:flex-col">
     
        <div className="border rounded-md py-4 h-full">
          <div className="block mb-2 font-bold border-b px-3 pb-2">
            <h1>Property</h1>
          </div>

              <input
                defaultValuevalue={JSON.stringify(properties)} 
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
                  value={property.name}
                  onChange={(e) => {
                    const newProperties = [...properties];
                    newProperties[index].name = e.target.name;
                    setVariants(newProperties);
                  }}
                />
                <input
                  className="p-2 border rounded-lg w-full"
                  placeholder="Value"
                  value={property.part}
                  onChange={(e) => {
                    const newProperties = [...properties];
                    newProperties[index].part = e.target.part;
                    setVariants(newProperties);
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
              />

          <div className="px-3 space-y-2 text-sm">
            {variants.map((variant, index) => (
              <div
                key={index}
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