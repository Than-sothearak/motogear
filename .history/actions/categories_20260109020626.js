"use server";

import { revalidatePath } from 'next/cache'
import { auth } from "@/auth";
import { mongoDb } from "@/utils/connectDB";
import { Category } from '@/models/Category';

export async function getAllCategoryIdsBySlug(slug) {
  const parent = await Category.findOne({ slug }).lean();
  if (!parent) return [];

  async function getChildIds(parentId) {
    const children = await Category.find({ parentCategory: parentId }).lean();
    let ids = children.map(c => c._id);
    for (const child of children) {
      ids = ids.concat(await getChildIds(child._id));
    }
    return ids;
  }

  const childIds = await getChildIds(parent._id);
  return [parent._id, ...childIds]; // include parent
}

export async function getCategories(query) {
  await mongoDb()
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied! you are not admin");
  }

  await new Promise((resolve) => setTimeout(resolve, 500));
  try {
    if (query) {
      return await Category.find({
        $or: [{ category: { $regex: query, $options: "i" } }],
      });
    }
    return await Category.find().sort({ createdAt: -1 })

  } catch (err) {
    console.error("Error fetching categories:", err);
    return { error: "Failed to fetch due to a server error" };
  }
}

export async function getSingleCategory(catId) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied! you are not admin");
  }

  try {
    if (!catId) {
      return { error: "No category ID provided" };
    }
    const category = await Category.findById(catId);
    return category;
  }
  catch (err) {
    console.error("Error fetching category:", err);
    return { error: "Failed to fetch due to a server error" };
  }
}

export async function addCategory(prevState, formData) {

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied! you are not admin");
  }


  if (!formData || typeof formData.get !== "function") {
    console.error("Invalid or missing formData:", formData);
    return { error: "No valid form data received" };
  }


  const parsedData = parseFormData(formData);
  const category = parsedData.name;
  const slug = parsedData.slug;

  console.log(slug)
  let errors = {};

  const existingCatByName = await Category.findOne({ name: formData.get('name') });
  if (existingCatByName) {
    errors.category = "This category is already have";
    return { errors, message: "This category is already have" };
  }

  if (!category) {
     errors.category = "Category is required";
  }
  
  if (!slug) {
     errors.slug = "Slug is required";
  }
    if (Object.keys(errors).length > 0) return { errors, success: false };
  try {
    await Category.create(parsedData);

  } catch (err) {
    console.error("Error saving category:", err);
    return { message: "Failed to save due to a server error" };
  }

  console.log("******Category add sucessfully add by:" + session.user?.username + "******")
  return { success: "Category add sucessfully", message: "Category add sucessfully" };
}

export async function updateCategory(catId, prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied! you are not admin");
  }
  try {
    const parsedData = parseFormData(formData);
    const category = await Category.findById(catId);

    if (!category) {
      return { error: "Category not found" };
    }

    await Category.updateOne({ _id: catId }, parsedData);

    console.log("******Category update sucessfully update by:" + session.user?.username + "******")
    return { success: "Category update sucessfully", message: "Category update sucessfully" };
  } catch (err) {
    console.error("Error updating category:", err);
    return { message: "Failed to update category due to a server error" };
  }

  revalidatePath(`/dashboard/categories/${catId}`);

}

// Helper function to parse FormData
function parseFormData(formData) {
  const result = {
    name: "",
    slug: "",
    parentCategory: null,
    properties: [],
  };

  let currentPart = null;

  for (const [name, value] of formData.entries()) {
    if (name === "name") {
      result.name = value;
    } else if (name === "slug") {
      result.slug = value;
    } 
    else if (name === "parentCategory") {
      result.parentCategory = value || null;
    } else if (name === "part") {
      currentPart = { part: value, values: [] };
      result.properties.push(currentPart);
    } else if (name === "values" && currentPart) {
      const splitValues = value.split(";");
      currentPart.values = [...currentPart.values, ...splitValues];
    }
  }

  return result;
}
