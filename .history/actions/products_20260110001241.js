"use server";
import { Product } from "@/models/Product";
import { mongoDb } from "@/utils/connectDB";
import { deleteFileFromS3, uploadFileToS3 } from "@/utils/uploadImageFileToS3";
import { auth } from "@/auth";
import { getCategories } from "./categories";
import { Category } from "@/models/Category";

export async function getProductsGroupedByParent(limit = 7) {
  const result = await Product.aggregate([
    // Join with category to get parent info
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },

    // Only include parent categories
    {
      $match: {
        "category.parentCategory": null,
      },
    },

    // Sort products newest first
    { $sort: { createdAt: -1 } },

    // Group by category
    {
      $group: {
        _id: "$category._id",
        name: { $first: "$category.name" },
        slug: { $first: "$category.slug" },
        products: { $push: "$$ROOT" },
      },
    },

    // Limit products array to N per category
    {
      $project: {
        _id: 1,
        name: 1,
        slug: 1,
        products: { $slice: ["$products", limit] },
      },
    },
  ]);

  return result;
}

export async function getProductFilter(slug, catParams, query, limit, page) {
  try {
    const parentSlug = slug?.[0] || null;
    let categoryIds;
    const selectedCatSlug = catParams?.cat;
    const ITEM_PER_PAGE = limit || 10

    // ✅ QUERY FILTER (ADD ONLY THIS)
    const productQuery = {};

    if (query) {
      productQuery.productName = {
        $regex: query,
        $options: "i",
      };
    }

    if (query?.min || query?.max) {
      productQuery.basePrice = {};
      if (query.min) productQuery.basePrice.$gte = Number(query.min);
      if (query.max) productQuery.basePrice.$lte = Number(query.max);
    }

    const sortOption =
      query?.sort === "price_asc"
        ? { basePrice: 1 }
        : query?.sort === "price_desc"
        ? { basePrice: -1 }
        : { createdAt: -1 };

    // 1️⃣ Filter by selected category (child)
    if (selectedCatSlug) {
      const parent = await Category.findOne({ slug: parentSlug }).lean();
      if (!parent) return { products: [] };

      const categories = await Category.find({
        parentCategory: parent._id,
      });

      const category = await Category.findOne({ slug: selectedCatSlug });

      const products = await Product.find({
        ...productQuery, // ✅
        category: category._id,
      })
        .select("productName basePrice slug imageUrls category brandName")
        .populate("category", "category slug")
        .sort(sortOption) // ✅
        .lean().limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1));
         const count = products.length
      return {  products, categories, count, ITEM_PER_PAGE };
    }

    // 2️⃣ Filter by parent category + children
    if (parentSlug) {
      const parent = await Category.findOne({ slug: parentSlug }).lean();
      if (!parent) return { products: [] };

      const categories = await Category.find({
        parentCategory: parent._id,
      });

      categoryIds = [parent._id, ...categories.map((c) => c._id)];

      const products = await Product.find({
        ...productQuery, // ✅
        category: { $in: categoryIds },
      })
        .select("productName basePrice slug imageUrls category brandName")
        .populate("category", "category slug")
        .sort(sortOption) // ✅
        .lean()
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1));
      const count = products.length
      return { products, categories, count, ITEM_PER_PAGE };
    }

    // 3️⃣ No filter → get all products
    const categories = await getCategories();
    const count = await Product.countDocuments();
    const products = await Product.find({
      ...productQuery, // ✅
    })
      .populate({
        path: "category",
        select: "name slug parentCategory",
        populate: {
          path: "parentCategory",
          select: "name slug",
        },
      })
      .sort(sortOption) // ✅
      .lean().limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { products, categories, count, ITEM_PER_PAGE };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch products!");
  }
}

// Fetch products with pagination and search
export async function getProducts(query, page, status, category) {
  await mongoDb();
  let queryData = {};
  if (status) {
    queryData.status = status;
  }

  const ITEM_PER_PAGE = 10;

  try {
    if (query) {
      const products = await Product.find({
        $or: [{ productName: { $regex: query, $options: "i" } }],
      }).populate("category");
      const count = products.length;
      return { products, count };
    }

    if (queryData) {
      const products = await Product.find(queryData)
        .sort({ createdAt: -1 })
        .limit(ITEM_PER_PAGE)
        .populate("category")
        .skip(ITEM_PER_PAGE * (page - 1));
      const count = products.length;
      return { products, count };
    }

    //    if (sort) {
    //   switch (sort) {
    //     case "active":
    //       sort = { createdAt: 1 };
    //       break;
    //     case "date-desc":
    //       sort = { createdAt: -1 };
    //       break;
    //     case "status-asc":
    //       sort = { status: 1 };
    //       break;
    //     case "status-desc":
    //       sort = { status: -1 };
    //       break;
    //     case "one bed room":
    //       sort = { status: -1 };
    //       break;
    //     default:
    //       sort = { createdAt: -1 }; // fallback
    //   }
    // }
    const count = await Product.countDocuments();
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .populate("category")
      .skip(ITEM_PER_PAGE * (page - 1));

    return { products, count };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch products!");
  }
}

// // Add new product
// export async function addProduct(prevState, formData) {
//   const session = await auth();
//   if (!session?.user?.isAdmin) {
//     return console.log("Access denied!");
//   }

//   if (!formData || typeof formData.get !== "function") {
//     console.error("Invalid or missing formData:", formData);
//     return { error: "No valid form data received" };
//   }

//   const productName = formData.get("productName");
//   const brandName = formData.get("brandName");
//   const slug = formData.get("slug");
//   const description = formData.get("description");
//   const basePrice = parseFloat(formData.get("basePrice")) || 0;
//   const discount = parseFloat(formData.get("discount")) || 0;
//   const category = formData.get("category");
//   const status = formData.get("status");
//   const variantMetadata = formData.get("variants"); // metadata only
//   const variantFiles = formData.getAll("images"); // multiple images

//   let errors = {};

//   try {
//     // if (!productName) errors.productName = "Product name is required";
//     // if (!brandName) errors.brandName = "Brand name is required";
//     // if (!slug) errors.slug = "Slug is required";
//     // if (!category) errors.category = "Category is required";
//     // if (!basePrice) errors.basePrice = "Base price is required";

//     console.log(errors);
//     if (Object.keys(errors).length > 0) return { errors, success: false };

//     // Upload images to S3
//     // let imageUrls = [];
//     // for (const file of imagesFiles) {
//     //   if (file && file.size > 0) {
//     //     const url = await uploadFileToS3(file);
//     //     imageUrls.push(url);
//     //   }
//     // }

//     // const variants = variantData ? JSON.parse(variantMetadata) : [];
//     // let fileIndex = 0; // to track which file we're reading

//     for (const variant of variantMetadata) {
//       variant.images = [];

//       for (let i = 0; i < variant.imageCount; i++) {
//         const file = variantFiles[fileIndex++]; // get the correct File object
//         if (file && file.size > 0) {
//           const url = await uploadFileToS3(file); // upload to S3
//           variant.images.push(url); // save S3 URL
//         }
//       }
//     }

//     // for (const variant of variants) {
//     //   if (variant.images && variant.images.length > 0) {
//     //     const urls = [];
//     //     for (const file of variant.images) {
//     //       const url = await uploadFileToS3(file, "variants");
//     //       urls.push(url);
//     //     }
//     //     variant.images = urls;
//     //   }
//     // }
//     // const productData = {
//     //   productName,
//     //   brandName,
//     //   slug,
//     //   description,
//     //   basePrice,
//     //   discount,
//     //   category,
//     //   status,
//     //   variants,
//     //   images: imageUrls,
//     // };

//     // console.log(productData)
//     // await Product.create(productData);

//     // revalidatePath("/dashboard/products/");
//   } catch (err) {
//     console.error("Error saving product:", err);
//     if (err.code === 11000) {
//       // Get which field caused it
//       const field = Object.keys(err.keyPattern)[0]; // e.g., "slug"
//       const value = err.keyValue[field]; // e.g., "sds"

//       return {
//         success: false,
//         errors: {
//           [field]: `${field} "${value}" already exists. Please choose another.`,
//         },
//       };
//     }
//   }
// }

// // Update existing product
// export async function updateProduct(productId, prevState, formData) {
//   const session = await auth();
//   if (!session?.user?.isAdmin) {
//     return console.log("Access denied!");
//   }

//   if (!formData || typeof formData.get !== "function") {
//     return { error: "No valid form data received" };
//   }

//   try {
//     const product = await Product.findById(productId);
//     if (!product) {
//       return { error: "Product not found", success: false };
//     }

//     const productName = formData.get("productName");
//     const brandName = formData.get("brandName");
//     const description = formData.get("description");
//     const basePrice = parseFloat(formData.get("basePrice")) || 0;
//     const discount = parseFloat(formData.get("discount")) || 0;
//     const category = formData.get("category");
//     const status = formData.get("status");
//     const variantData = formData.get("variants"); // JSON string
//     const imagesFiles = formData.getAll("images"); // multiple images

//     let errors = {};
//     if (!productName) errors.productName = "Product name is required";
//     if (!brandName) errors.brandName = "Brand name is required";
//     if (!category) errors.category = "Category is required";
//     if (Object.keys(errors).length > 0) return { errors, success: false };

//     // Upload new images
//     let newImages = [...product.images]; // keep existing
//     for (const file of imagesFiles) {
//       if (file && file.size > 0) {
//         const url = await uploadFileToS3(file);
//         newImages.push(url);
//       }
//     }

//     // Optional: remove old images if specified in prevState
//     if (prevState?.removeImages?.length) {
//       for (const url of prevState.removeImages) {
//         const key = url.split("/").pop();
//         if (key) await deleteFileFromS3(key);
//         newImages = newImages.filter((i) => i !== url);
//       }
//     }

//     const variants = variantData ? JSON.parse(variantData) : product.variants;

//     const productData = {
//       productName,
//       brandName,
//       description,
//       basePrice,
//       discount,
//       category,
//       status,
//       variants,
//       images: newImages,
//     };

//     await Product.updateOne({ _id: productId }, productData);

//     return { success: true, message: "Product successfully updated" };
//   } catch (err) {
//     console.error("Error updating product:", err);
//     return { error: "Failed to update product", success: false };
//   }
// }
