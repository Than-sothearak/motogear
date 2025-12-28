"use client";
import { BiCheck } from "react-icons/bi";
import ChooseImageFile from "./ChooseImageFile";
import { useActionState, useState } from "react";
import ProductPropertyForm from "./ProductPropertyForm";
import { addProduct, updateProduct } from "@/actions/prodoucts";

export default function ProductForm({
  categories,
  productId,
  parentCategory,
  product,
}) {
  const [formData, setFormData] = useState({
    brandName: product?.brandName || "",
    productName: product?.productName || "",
    category: product?.category || "",
    parentCategory: product?.parentCategory || "",
    stock: product?.stock || "",
    price: product?.price || "",
    status: product?.status ? 1 : 0,
    imageUrl: product?.imageUrl || "",
    properties: product?.properties || [],
  });

  const [currentProperties, setCurrentProperties] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    const categoryId = e.target.value;

    setCurrentProperties(
      categories.find((category) => category._id === categoryId)?.properties
    );
  };

  const updateProductWithId = updateProduct.bind(null, productId);
  const [state, action, isPending] = useActionState(
    productId ? updateProductWithId : addProduct,
    undefined
  );

  const renderCheckIcon = (fieldValue) => {
    return fieldValue ? <BiCheck size={24} className="text-green-500" /> : null;
  };

  return (
    <div className="mt-4 rounded-lg">
      <form action={action} className="space-y-2 text-sm">
        <div className="flex max-lg:flex-wrap gap-4">
          <div className="space-y-4 w-full p-4 bg-primary rounded-lg">
            <h1 className="font-bold text-lg">Basic Information</h1>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-1 font-medium">Brand Name {renderCheckIcon(formData?.brandName)}</label>
                <div className="flex items-center">
                  <input
                    defaultValue={formData?.brandName}
                    onChange={handleChange}
                    type="text"
                    name="brandName"
                    placeholder="Enter brand name..."
                    className="w-full p-2 rounded-md mt-2 bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                  />
                 
                </div>
                {state?.errors?.brandName && (
                  <p className="text-red-500 mt-2">{state.errors.brandName}</p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="w-full">
                  <label className="mb-2 block font-medium">Category</label>
                  <select
                    name="category"
                    required
                    defaultValue={formData?.category}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-secondary border-none text-xs focus:ring-0 focus:outline-none"
                  >
                    {formData?.category && (
                      <option value={formData?.category._id}>
                        {formData?.category.category}
                      </option>
                    )}
                    <option value="">Select a category</option>
                    {categories?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                  {state?.errors?.category && (
                    <p className="text-red-500 mt-2">{state.errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Price</label>
                  {renderCheckIcon(formData?.price)}
                  <div className="flex items-center">
                    <input
                      name="price"
                      onChange={handleChange}
                      placeholder="202.09$"
                      type="number"
                      defaultValue={formData?.price}
                      className="w-full p-2 rounded-md mt-2 bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                    />
               
                  </div>
                  {state?.errors?.price && (
                    <p className="text-red-500 mt-2">{state.errors.price}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium">Product Name</label>
                <div className="flex items-center">
                  <input
                    name="productName"
                    onChange={handleChange}
                    value={formData?.productName}
                    placeholder="Enter product name..."
                    className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                  />
                  {renderCheckIcon(formData?.productName)}
                </div>
                {state?.errors?.productName && (
                  <p className="text-red-500 mt-2">
                    {state.errors.productName}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium">Stock</label>
                <div className="flex items-center">
                  <input
                    onChange={handleChange}
                    defaultValue={formData?.stock}
                    placeholder="Enter stock"
                    name="stock"
                    type="number"
                    className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                  />
                  {renderCheckIcon(formData?.stock)}
                </div>
                {state?.errors?.stock && (
                  <p className="text-red-500 mt-2">{state.errors.stock}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-medium">Description</label>
              <textarea
                name="decription"
                placeholder="Write a product description"
                className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                rows="4"
              ></textarea>
            </div>
            <ProductPropertyForm
              setCurrentProperties={setCurrentProperties}
              categoryProperties={currentProperties}
              productProperties={formData?.properties}
            />
            <ChooseImageFile />
          </div>
          {/* ... The rest of the form ... */}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`p-2 bg-blue-600 w-full mt-6 hover:bg-blue-500 hover:text-slate-200 rounded-md ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isPending
            ? productId
              ? "Updating..."
              : "Adding..."
            : productId
            ? "Update"
            : "Add"}
        </button>

        {state?.success && (
          <p className="text-green-400 text-sm mt-4 text-center">
            Product {productId ? "updated" : "added"} successfully!
          </p>
        )}
        {state?.errors && (
          <p className="text-red-400 text-sm mt-4 text-center"></p>
        )}
      </form>
    </div>
  );
}
