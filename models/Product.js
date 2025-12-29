import mongoose, { model, Schema, models } from "mongoose";

const VariantSchema = new Schema(
  {
    size: { type: String, required: true },   // S, M, L, XL
    color: { type: String, required: true },  // Black, White
    stock: { type: Number, required: true, min: 0 },
    price: { type: Number },                  // override base price (optional)
    sku: { type: String },                    // recommended
  },
  { _id: false }
);


const ProductSchema = new Schema(
  {
    brandName: { type: String, required: true },

    productName: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    basePrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },

    imageUrls: [{ type: String, required: true }],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    variants: {
      type: [VariantSchema],
      validate: [v => v.length > 0, "Product must have at least one variant"],
    },

    status: {
      type: String,
      enum: ["active", "inactive", "out_of_stock"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);

