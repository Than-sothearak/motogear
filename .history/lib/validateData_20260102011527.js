// utils/validation.js
import { z } from "zod";

export const productSchema = z.object({
  brandName: z.string().min(1, "Brand Name is requiredsd"),
  productName: z.string().min(1, "Product Name is required"),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  basePrice: z.number().positive("Base Price must be greater than 0"),
  variants: z.array(
    z.object({
      size: z.string().min(1, "Size is required"),
      color: z.string().min(1, "Color is required"),
      stock: z.number().nonnegative(),
      price: z.number().nonnegative(),
      sku: z.string(),
    })
  ),
});

export const validateProduct = (formData) => {
  try {
    productSchema.parse(formData);
    return {}; // no errors
  } catch (err) {
    const errors = {};
    err.errors.forEach((e) => {
      errors[e.path.join("-")] = e.message;
    });
    return errors;
  }
};
