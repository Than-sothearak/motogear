// models/Category.js
import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    parentCategory: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: [{ type: Object }],
  },
  { timestamps: true }
);

// ✅ safe model registration for Next.js hot reload

export const  Category = models.Category || model("Category", CategorySchema);
