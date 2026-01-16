"use server";
import { Product } from "@/models/Product";
import { mongoDb } from "@/utils/connectDB";
import { Category } from "@/models/Category";

export async function getProductsGroupedByParent(limit = 7) {
const result = await Category.aggregate([
  // 1️⃣ Parent categories only
  {
    $match: {
      parentCategory: null,
    },
  },

  // 2️⃣ Get child categories
  {
    $lookup: {
      from: "categories",
      localField: "_id",
      foreignField: "parentCategory",
      as: "children",
    },
  },

  // 3️⃣ Get products from parent + children
  {
    $lookup: {
      from: "products",
      let: {
        parentId: "$_id",
        childIds: "$children._id",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $or: [
                { $eq: ["$category", "$$parentId"] }, // product in parent
                { $in: ["$category", "$$childIds"] }, // product in child
              ],
            },
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: limit },
      ],
      as: "products",
    },
  },

  // 4️⃣ Final output
  {
    $project: {
      _id: 1,
      name: 1,
      slug: 1,
      products: 1,
    },
  },
]);

  return result;
}

export async function getProductFilter(slug, catParams, query, limit = 16, page = 1) {
  try {
    const parentSlug = slug?.[0] || null;
    const selectedCatSlug = catParams?.cat;
    const ITEM_PER_PAGE = limit;
    const allCategories = await Category.find().lean();
    /* ======================
      1️⃣ PRODUCT QUERY
    ====================== */
    const productQuery = {};

    if (query) {
      // Find categories that match the query (parent or child)
      const matchingCategoryIds = allCategories
        .filter(cat => cat.name.toLowerCase().includes(query.toLowerCase()))
        .map(cat => cat._id);

      // Optionally include children of matched parents
      const childCategoryIds = allCategories
        .filter(cat => cat.parentCategory && matchingCategoryIds.includes(cat.parentCategory))
        .map(cat => cat._id);

      const allCategoryIds = [...new Set([...matchingCategoryIds, ...childCategoryIds])];

      // Build product query
      productQuery.$or = [
        { productName: { $regex: query, $options: "i" } },
        { category: { $in: allCategoryIds } },
      ];
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


    // slug -> category
    const categoryBySlug = {};
    // parentId -> children[]
    const childrenByParent = {};

    for (const cat of allCategories) {
      categoryBySlug[cat.slug] = cat;

      if (cat.parentCategory) {
        const parentId = cat.parentCategory.toString();
        if (!childrenByParent[parentId]) {
          childrenByParent[parentId] = [];
        }
        childrenByParent[parentId].push(cat);
      }
    }

    /* ======================
      3️⃣ FILTER LOGIC
    ====================== */

    // 🔹 Filter by selected child category
    if (selectedCatSlug && parentSlug) {
      const parent = categoryBySlug[parentSlug];
      const category = categoryBySlug[selectedCatSlug];

      if (!parent || !category) return { products: [] };

      const categories = childrenByParent[parent._id.toString()] || [];

      const filter = {
        ...productQuery,
        category: category._id,
      };

      const count = await Product.countDocuments(filter);
      const products = await Product.find(filter)
        .select("productName basePrice slug imageUrls category brandName")
        .populate("category", "name slug")
        .sort(sortOption)
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1))
        .lean();

      return { products, categories, count, ITEM_PER_PAGE };
    }

    // 🔹 Filter by parent category (include children)
    if (parentSlug) {
      const parent = categoryBySlug[parentSlug];
      if (!parent) return { products: [] };

      const children = childrenByParent[parent._id.toString()] || [];
      const categoryIds = [parent._id, ...children.map(c => c._id)];

      const filter = {
        ...productQuery,
        category: { $in: categoryIds },
      };

      const count = await Product.countDocuments(filter);
      const products = await Product.find(filter)
        .select("productName basePrice slug imageUrls category brandName")
        .populate("category", "name slug")
        .sort(sortOption)
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1))
        .lean();

      return { products, categories: children, count, ITEM_PER_PAGE };
    }

    // 🔹 No category filter
    const count = await Product.countDocuments(productQuery);
    const products = await Product.find(productQuery)
      .populate({
        path: "category",
        select: "name slug parentCategory",
        populate: {
          path: "parentCategory",
          select: "name slug",
        },
      })
      .sort(sortOption)
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();
    const categories = allCategories.filter(cat => !cat.parentCategory)
    return { products, categories: categories, count, ITEM_PER_PAGE };

  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch products!");
  }
}

// Fetch products with pagination and search for admin
export async function getProducts(query, page = 1, status, category) {
  await mongoDb();
  const ITEM_PER_PAGE = 10;
  // Fetch all categories for reference
  const allCategories = await Category.find();

  try {
    // Build the base filter
    let filter = {};
    if (status) {
      filter.status = status; // filter by status if provided
    }
    if (category) {
      // Find the category by slug or ID
      const selectedCategory = allCategories.find(
        (cat) => cat.slug === category
      );

      if (selectedCategory) {
        // Include children categories if needed
        const childCategoryIds = allCategories
          .filter((cat) => cat.parentCategory?.toString() === selectedCategory._id.toString())
          .map((cat) => cat._id);

        filter.category = { $in: [selectedCategory._id, ...childCategoryIds] };
      }
    }

    if (query) {
      // Search in productName or categories
      const matchingCategoryIds = allCategories
        .filter((cat) => cat.name.toLowerCase().includes(query.toLowerCase()))
        .map((cat) => cat._id);

      const childCategoryIds = allCategories
        .filter((cat) => cat.parentCategory && matchingCategoryIds.includes(cat.parentCategory))
        .map((cat) => cat._id);

      const allCategoryIds = [...new Set([...matchingCategoryIds, ...childCategoryIds])];

      filter.$or = [
        { productName: { $regex: query, $options: "i" } },
        { category: { $in: allCategoryIds } },
      ];
    }

    // Count total documents for pagination
    const count = await Product.countDocuments(filter);

    // Fetch products with pagination
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .populate("category");

    return { products, count, ITEM_PER_PAGE, categories: allCategories };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch products!");
  }
}

export async function getAllProducts(page, limit) {
  const ITEM_PER_PAGE = limit || 8
  const skip = ITEM_PER_PAGE * (page - 1)
  const count = await Product.countDocuments();

  const results =await Product.find().sort({createdAt: -1})
  .skip(skip)
  .limit(ITEM_PER_PAGE)
  .lean()
  return {products: JSON.parse(JSON.stringify(results)), count}
}