import mongoose, { model, Schema, models } from "mongoose";

const CategorySchema = new Schema(
  {
    category: { type: String, required: true },
    parentCategory: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: [{ type: Object }],
  },
  { timestamps: true }
);

export const Category = models.Category || model("Category", CategorySchema);
