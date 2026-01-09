import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    category: { type: String, required: true },
    parentCategory: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: [{ type: Object }],
  },
  { timestamps: true }
);

const Category = models.Category || model("Category", CategorySchema);

export default Category;
