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

  console.log(formData);

  const [currentProperties, setCurrentProperties] = useState(formData.properties);

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

  console.log(currentProperties)

  const updateProductWithId = updateProduct.bind(null, productId);
  const [state, action, isPending] = useActionState(
    productId ? updateProductWithId : addProduct,
    undefined
  );

  return (
    <div className=" mt-4 rounded-lg">
      <form action={action} className="space-y-2 text-sm">
        <div className="flex max-lg:flex-wrap gap-4">
          <div className="space-y-4 w-full p-4 bg-primary rounded-lg">
            <h1 className="font-bold text-lg">Basic Infomation</h1>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Brand Name</label>
                <input
                  defaultValue={formData?.brandName}
                  onChange={handleChange}
                  type="text"
                  name="brandName"
                  placeholder="Enter brand name..."
                  className="w-full p-2 rounded-md mt-2 bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                />
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
                  <input
                    name="price"
                    onChange={handleChange}
                    placeholder="202.09$"
                    type="number"
                    defaultValue={formData?.price}
                    className="w-full p-2 rounded-md mt-2 bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                  />
                  {state?.errors?.price && (
                    <p className="text-red-500 mt-2">{state.errors.price}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium">Product Name</label>
                <input
                  name="productName"
                  onChange={handleChange}
                  value={formData?.productName}
                  placeholder="Enter product name..."
                  className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                />
                {state?.errors?.productName && (
                  <p className="text-red-500 mt-2">
                    {state.errors.productName}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium">Stock</label>
                <input
                  onChange={handleChange}
                  defaultValue={formData?.stock}
                  placeholder="Enter stock"
                  name="stock"
                  type="number"
                  className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                />
                {state?.errors?.stock && (
                  <p className="text-red-500 mt-2">{state.errors.stock}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-medium">Description</label>
              <textarea
                name="decription"
                placeholder="Write a product decrition"
                className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                rows="4"
              ></textarea>
            </div>
            <ProductPropertyForm
              categoryProperties={currentProperties}
              handleChange={handleChange}
            />
            <ChooseImageFile />
          </div>
          <div className="max-xl:w-1/2 max-lg:w-full flex flex-col gap-4">
            <div className=" bg-primary p-4 w-full flex  flex-col  gap-4 rounded-lg">
              <div className="space-y-4 w-full bg-primary rounded-lg">
                <h1 className="text-lg font-bold">Visibility</h1>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex gap-1 items-center">
                  <input
                    type="radio"
                    id="published"
                    name="status"
                    value={1}
                    defaultChecked
                  />
                  <label>Published</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="hidden" name="status" value={0} /> 
                  <label>Hidden</label>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                The product will effect by choose the Visibility.
              </p>
            </div>

            <div className=" bg-primary p-4 w-full flex  flex-col  gap-4 rounded-lg">
              <div className="space-y-4 w-full bg-primary rounded-lg">
                <h1 className="text-lg font-bold">Parent Category</h1>
              </div>
              <select
                className=" w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                name="parentCategory"
                defaultValue={formData?.parentCategory}
                onChange={formData?.parentCategory ? handleChange : handleCategoryChange}
              >
                {formData?.parentCategory && (
                  <option value={formData?.parentCategory._id}>
                    {formData?.parentCategory.category}
                  </option>
                )}
                <option>Select a category</option>
                {parentCategory?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500">
                Select a category that will be the parent of the current one.
              </p>
            </div>
            <div className=" bg-primary p-4 w-full flex  flex-col  gap-4 rounded-lg">
              <div className="flex justify-start items-center gap-2 w-full bg-primary">
                <div>
                  <h1 className="text-lg font-bold">Product Image</h1>
                </div>

                <BiCheck className="bg-slate-300 rounded-full text-black" />
              </div>
              <div className="grid gap-2 grid-cols-2">
                <div className="rounded-md w-full min-h-48  bg-slate-500 col-span-2">
                  <img
                    className="rounded-md object-cover h-full w-full "
                    src="https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/26/0627132/1.jpg?7855"
                  />
                </div>
                <div className="rounded-md w-full min-h-32 bg-slate-500">
                  <img
                    className="rounded-md object-cover h-full w-full "
                    src="https://i.ebayimg.com/images/g/5vsAAeSwWMpnrr5e/s-l300.jpg"
                  />
                </div>
                <div className="rounded-md w-full min-h-32 bg-slate-500">
                  <img
                    className="rounded-md object-cover h-full w-full "
                    src="https://media.takealot.com/covers_images/d5eba0e0756b480181e0aa3f1e430c1a/s-pdpxl.file"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500">Product images.</p>
            </div>
          </div>
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
