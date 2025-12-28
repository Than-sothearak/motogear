import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  brandName: { type: String, required: true },
  productName: { type: String, required: true },
  description:  { type: String,},
  price: { type: Number, required: true },
  stock: { type: Number,},
  discount: { type: Number,},
  dicription: { type: String,},
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: "Categories" },
  parentCategory: { type: mongoose.Types.ObjectId, ref: "Categories" },
  properties: {type:Object},
  status: { type: Number,},
}, {
  timestamps: true,
});

export const Product = models.Product || model("Product", ProductSchema);
