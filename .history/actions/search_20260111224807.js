import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

export async function getProductSearch(query, limit = 16, page = 1) {
     
      const ITEM_PER_PAGE = limit;
      const allCategories = await Category.find().lean();

    try {
    
    const productQuery = {};
    console.log(productQuery)

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
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();
    const categories = allCategories.filter(cat => !cat.parentCategory)
    return { products, categories: categories, count, ITEM_PER_PAGE };

      } catch (err) {
    console.error(err);
    throw new Error("Failed to search products!");
  }
}
