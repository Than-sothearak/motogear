"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import VariantForm from "./VariantForm";
import { validateProduct } from "@/lib/validateData";
import ChooseImageFiles from "../ChooseImageFiles";
import ProductDescription from "./ProductDescription";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import DescriptionView from "./DescriptionView";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

function ProductForm({ productData, categories }) {
  const router = useRouter();

  // Edit mode state
  const [isEditing, setIsEditing] = useState(!productData ? true : false);

  // Main form state
  const [formData, setFormData] = useState({
    productName: productData?.productName || "",
    brandName: productData?.brandName || "",
    slug: productData?.slug || "",
    description: productData?.description || "",
    basePrice: productData?.basePrice || 0,
    discount: productData?.discount || 0,
    category: productData?.category._id || "",
    status: productData?.status || "active",
    imageUrls: productData?.imageUrls || "",
  });

  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState(productData?.files || []);
  const [variants, setVariants] = useState(productData?.variants ||
    [{ size: "", color: "", stock: "", price: "", sku: "" }]
  );
  const [properties, setProperties] = useState(productData?.properties || []);

  // Input handler
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue =
      type === "number" ? (value === "" ? "" : Number(value)) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  // Payload for submit
  const payload = {

    productName: formData.productName,
    brandName: formData.brandName,
    slug: formData.slug,
    description: formData.description,
    basePrice: formData.basePrice,
    discount: formData.discount,
    category: formData.category,
    status: formData.status,
    removedImages: formData?.removedImages,
    variants: variants.map((v) => ({
      size: v.size,
      color: v.color,
      stock: v.stock,
      price: v.price,
      sku: v.sku,
    })),
  };
  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    let method
    let url
    if (productData) {
      method = "PUT"
      url = "/api/products/" + productData._id

    }
    else {
      method = "POST"
      url = "/api/products"
      formData.append("data", JSON.stringify(payload));
    }


    variants.forEach((variant, index) => {
      if (variant.image?.file) {
        formData.append(`variantImages[${index}]`, variant.image.file);
      }
    });

    if (files.length > 0) {
      files.forEach((file, index) => {
        formData.append("imageFiles", file.file);
        // 👆 SAME key name for multiple files
      });
    }
    const validationErrors = validateProduct({ ...payload });
    setErrors(validationErrors);


    try {
      const res = await fetch(url, {
        method: method,
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
        router.push("/dashboard/products/");
      } else {
        console.log(data);
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // Cancel handler
  const handleCancel = () => {
    setFormData({
      _id: productData?._id || "",
      productName: productData?.productName || "",
      brandName: productData?.brandName || "",
      slug: productData?.slug || "",
      description: productData?.description || "",
      basePrice: productData?.basePrice || 0,
      discount: productData?.discount || 0,
      category: productData?.category || "",
      status: productData?.status || "active",
      imageUrls: productData?.imageUrls,
    });
    setVariants(productData?.variants || []);
    setProperties(productData?.properties || []);
    setFiles(productData?.files || []);
    setIsEditing(false);
    setErrors({});
  };

  const handleRemoveImage = (index) => {
    setFormData((prevFormData) => {
      const removedImage = prevFormData.imageUrls[index]; // Get the removed image URL

      return {
        ...prevFormData,
        imageUrls: prevFormData.imageUrls.filter((_, i) => i !== index), // Remove from imageUrls
        removedImages: [...(prevFormData.removedImages || []), removedImage], // Store removed image properly
      };
    });
  };
  return (
    <div className="w-1/2 flex justify-center p-6 max-sm:px-2 max-sm:py-3 bg-white rounded-xl shadow-md">
      <form className="mb-4" onSubmit={handleSubmit}>
        {/* Header + Edit/Cancel */}
        <div className=" ">
      <div className="flex justify-between">
            {!productData ?
            <h1 className="text-2xl font-bold">
              {isEditing ? "Add Product" : "Product Details"}   
            </h1>
               
            :
         <div className="flex gap-2 items-center">
             <h1 className="text-2xl font-bold">
              {isEditing ? "Edit Product" : "Product Details"} 
            </h1>
            <Link href={`/products/${productData?.slug}`} ><EyeIcon /></Link>
         </div>
            }
      
          <div>
            <div className="flex gap-2">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="border text-primarytext px-4 py-2 rounded hover:bg-tertiary/80 hover:text-primary"
              >
                Edit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}

            {/* Submit Button */}
            {isEditing && (
              <div className="flex justify-end ">
                <button
                  type="submit"
                  className="bg-tertiary text-white px-6 py-2 rounded-md hover:bg-tertiary/80"
                >
                  {productData ? "Update Product" : "Save Product"}
                </button>
              </div>
            )}
          </div>
          </div>
      </div>
    <p className="text-sm">Manage your product details</p>        
        </div>
        <div>
          <div
            className="space-y-4 flex flex-col justify-end"
          >
            <div className="flex max-sm:flex-col gap-4">
              {/* LEFT */}
              <div className="border rounded-md py-4 w-full">
                <div className="block mb-2 font-bold border-b px-3 pb-2">
                  <h1>Name and Description</h1>
                </div>

                <div className="space-y-3 px-3">
                  {/* Brand Name */}
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <label className="text-primarytext">Brand name</label>
                      {errors?.brandName && (
                        <p className="text-red-500">*{errors.brandName}</p>
                      )}
                    </div>
                    <input
                      id="brandName"
                      type="text"
                      name="brandName"
                      value={formData.brandName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Brand Name"
                      className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                        }`}
                    />
                  </div>

                  {/* Product Name */}
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <label className="text-primarytext">Product name</label>
                      {errors?.productName && (
                        <p className="text-red-500">*{errors.productName}</p>
                      )}
                    </div>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Product Name"
                      className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                        }`}
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <label className="text-primarytext">Slug</label>
                      {errors?.slug && (
                        <p className="text-red-500">*{errors.slug}</p>
                      )}
                    </div>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Slug"
                      className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                        }`}
                    />
                  </div>

                  {/* Product Description */}
                  {isEditing ? <div className="space-y-2 text-sm">
                    <label className="text-primarytext">Product Description</label>
                    <ProductDescription
                      value={formData.description}
                      onChange={(html) =>
                        setFormData((prev) => ({ ...prev, description: html }))
                      }
                      editable={isEditing}
                    />
                  </div> : <DescriptionView content={formData.description} />}


                </div>
              </div>

              {/* RIGHT */}
              <div className="border rounded-md py-4 w-full">
                <div className="block mb-2 font-bold border-b px-3 pb-2">
                  <h1>Product Details</h1>
                </div>

                <div className="space-y-3 px-3">
                  {/* Base Price */}
                  <div className="space-y-2 text-sm">
                    <label className="text-primarytext">Base Price</label>
                    {errors?.basePrice && (
                      <p className="text-red-500">*{errors.basePrice}</p>
                    )}
                    <input
                      type="number"
                      name="basePrice"
                      min="0"
                      step="0.01"
                      value={formData.basePrice}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                        }`}
                    />
                  </div>

                  {/* Discount */}
                  <div className="space-y-2 text-sm">
                    <label className="text-primarytext">Discount (%)</label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                        }`}
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2 text-sm">
                    <label className="text-primarytext">Category</label>
                    {errors?.category && (
                      <p className="text-red-500">*{errors.category}</p>
                    )}

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                        }`}
                    >
                      <option value="">Select category</option>
                      {categories?.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div className="space-y-2 text-sm">
                    <label className="text-primarytext">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                        }`}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="out_of_stock">Out of stock</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="border p-3 rounded-md">
              <label className="font-bold text-md">Product Image</label>
              <div className="flex justify-start gap-8">
                {formData?.imageUrls &&
                  formData?.imageUrls.map((image, index) => (
                    <div
                      className={`relative z-0 aspect-square rounded-md bg-tertiary/10 group w-80 gap-4`}
                      key={index}
                    >
                      <Image
                        fill
                        sizes="(max-width: 300px) 10vw, (max-width: 100px) 50vw, 33vw"
                        alt={`Image ${index}`}
                        className="rounded-md object-cover transition-opacity duration-300 group-hover:opacity-25"
                        src={`${image}`}
                      />
                      {isEditing &&
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="flex justify-center items-center absolute top-1/2 left-1/2  text-slate-200
               opacity-0 group-hover:opacity-100 transition-opacity duration-300 
               transform -translate-x-1/2 -translate-y-1/2 "
                        >
                          <BiTrash
                            className="duration-300 rounded-full p-2 w-9 h-9
               transform hover:scale-125 scale-100 bg-black opacity-50 hover:opacity-90 "
                            size={20}
                          />
                        </button>}
                    </div>
                  ))}
              </div>
              {isEditing && (
                <ChooseImageFiles
                  files={files}
                  setFiles={setFiles}
                  isEditing={isEditing}
                  setFormData={setFormData}
                />
              )}
            </div>

            {/* Variant Form */}
            {isEditing && (
              <VariantForm
                giveErrors={errors}
                productData={productData}
                setVariants={setVariants}
                variants={variants}
                setFormData={setFormData}
                properties={properties}
                setProperties={setProperties}
                isEditing={isEditing} // Pass editing state
              />
            )}

            {/* Submit Button */}
            {isEditing && (
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-tertiary text-white px-6 py-2 rounded-lg hover:bg-tertiary/80"
                >
                  {productData ? "Update Product" : "Save Product"}
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
