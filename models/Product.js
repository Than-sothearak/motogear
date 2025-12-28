import mongoose, { model, Schema, models } from "mongoose";
import { Category } from "./Category";

const ProductSchema = new Schema({
  brandName: { type: String, required: true },
  productName: { type: String, required: true },
  description:  { type: String,},
  price: { type: Number, required: true },
  stock: { type: Number,},
  discount: { type: Number,},
  imageUrls: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: Category },
  parentCategory: { type: mongoose.Types.ObjectId, ref: Category },
  properties: {type:Object},
  variants: {type:Object},
  status: { type: Number,},
}, {
  timestamps: true,
});

export const Product = models.Product || model("Product", ProductSchema);
