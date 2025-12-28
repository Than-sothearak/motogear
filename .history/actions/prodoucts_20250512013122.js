"use server";
import { Product } from "@/models/Product";
import { mongoDb } from "@/utils/connectDB";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteFileFromS3, uploadFileToS3 } from "@/utils/uploadFileToS3";
await mongoDb();

export async function getProduct(query, page) {
  const ITEM_PER_PAGE= 20;

  
  try {
    if (query) {
      const products = await Product.find({
        $or: [
          { productName: { $regex: query, $options: "i" } },

          { BrandName: { $regex: query, $options: "i" } },
        ],
      })
        .lean()
        .populate("category")
        .populate("parentCategory");
        const count = products.length
      return {products, count}
    }
    const products = await Product.find()
    .sort({ createdAt: -1 })
    .populate("category")
    .populate("parentCategory").limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page -1));
    const count = await Product.countDocuments();
    return {products, count}
  } catch (err) {
    console.error("Error fetching products:", err);
    return { error: "Failed to fetch due to a server error" };
  }
}

export async function addProduct(prevState, formData) {


  try {
    if (!formData || typeof formData.get !== "function") {
      console.error("Invalid or missing formData:", formData);
      return { error: "No valid form data received" };
    }

    const productName = formData.get("productName");
    const brandName = formData.get("brandName");
    const category = formData.get("category");
    const price = formData.get("price");
    const stock = formData.get("stock");
    const status = formData.get("status");
    const discription = formData.get("discription");
    const parentCategory = formData.get("parentCategory");
    const imageFiles = formData.getAll("images");
    const properties = propertiesFormData(formData);

    let imageUrls = [];

    if (imageFiles && imageFiles.length > 0) {
      for (const imageFile of imageFiles) {
        if (imageFile.size > 0) {
          const imageUrl = await uploadFileToS3(imageFile);
          imageUrls.push(imageUrl);
          console.log("Image uploaded to S3:", imageUrl);
        }
      }
    } else {
      console.log("No image provided");
    }

    const productData = {
      productName,
      brandName,
      category,
      price,
      stock,
      status,
      discription,
      parentCategory: parentCategory || null,
      imageUrls,
      properties,
    };

    const errors = validateProductFields(productData);
    if (Object.keys(errors).length > 0) return { errors };

    const existingName = await Product.findOne({
      productName: formData.get("productName"),
    });
    if (existingName) {
      errors.productName = "This product is already have";
      return { errors };
    }

    if (!productName) {
      if (!productName) errors.productName = "Product is required";
      return { errors };
    }

    await Product.create(productData);
  } catch (err) {
    console.error("Error saving category:", err);
    return { error: "Failed to save due to a server error" };
  }

  revalidatePath(`/dashboard/products/`);
  redirect("/dashboard/products/");
}

export async function updateProduct(productId, prevState, formData) {
  const product = await Product.findById(productId);

  if (!product) {
    return { error: "Product not found" };
  }

  try {
    const productName = formData.get("productName");
    const brandName = formData.get("brandName");
    const category = formData.get("category");
    const price = formData.get("price");
    const stock = formData.get("stock");
    const status = formData.get("status");
    const description = formData.get("description");
    const parentCategory = formData.get("parentCategory");
    const imageFiles = formData.getAll("images");
    let removedImages = formData.getAll("removeImages") || [];
    const properties = propertiesFormData(formData);

    const updatedImageUrls = product.imageUrls.filter(
      (imageUrl) => !removedImages.includes(imageUrl) // Remove only matching URLs
    );
    let imageUrls = updatedImageUrls || [];

    try {
      if (removedImages && removedImages.length > 0) {
        for (const removeImage of removedImages) {
          const oldkey = removeImage.split("/").pop();
          if (oldkey) {
            await deleteFileFromS3(oldkey);
          }
        }
      } else {
        console.log("No images remove!");
      }
    } catch (err) {
      console.log(err);
    }

    if (imageFiles && imageFiles.length > 0 && imageFiles[0].size > 0) {
      for (const imageFile of imageFiles) {
        if (imageFile.size > 0) {
          const imageUrl = await uploadFileToS3(imageFile);
          imageUrls.push(imageUrl);
          console.log("Image uploaded to S3:", imageUrl);
        }
      }
      console.log(
        "-----------------------------------------------------------------------------------------------------------------------------"
      );
      console.log(
        `Total file ${imageFiles.length} uploaded to S3 successfully`
      );
    }

    const productData = {
      productName,
      brandName,
      category,
      price,
      stock,
      status,
      description,
      parentCategory,
      imageUrls,
      properties,
    };

    const errors = validateProductFields(productData);
    if (Object.keys(errors).length > 0) return { errors };

    // Update the product
    await Product.updateOne({ _id: productId }, productData);
    console.log("Product updated!");
    revalidatePath(`/dashboard/products/${productId}`);
    return { success: true, message: "Product update successfully!" };
  } catch (err) {
    console.error("Error updating product:", err);
    return { error: "Failed to update product due to a server error" };
  }
}

// Helper function to parse FormData
function propertiesFormData(formData) {
  let properties = [];
  let currentPart = null;

  for (const [name, value] of formData.entries()) {
    if (name === "part") {
      currentPart = { part: value, value: "" };
      properties.push(currentPart);
    } else if (name === "value" && currentPart) {
      currentPart.value = value;
    }
  }

  return properties;
}

function validateProductFields({
  productName,
  brandName,
  category,
  price,
  stock,
  parentCategory,
}) {
  const errors = {};
  if (!productName) errors.productName = "Name is required";
  if (!parentCategory) errors.parentCategory = "ParentCategory is required";
  if (!brandName) errors.brandName = "Brand name is required";
  if (!category) errors.category = "Category is required";
  if (!price) errors.price = "Price is required";
  if (!stock) errors.stock = "Stock is required";
  return errors;
}
