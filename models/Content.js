import mongoose, { Schema, model, models } from "mongoose";

const ContentSchema = new Schema (
    {
  hero: {
    title: String,
    subtitle: String,
    btnText: String,
    btnLink: String,
    videoUrl: String,
    posterImage: String,
    enabled: Boolean,
  },

  featuredProducts: [
    {
      productId: { type: mongoose.Types.ObjectId, ref: "Product" },
      order: Number,
    }
  ],

  discountSection: {
    enabled: Boolean,
    items: [
      {
        productId:{ type: mongoose.Types.ObjectId, ref: "Product" },
        discountValue: Number,
        startAt: Date,
        endAt: Date,
      }
    ]
  },

  specialPromotion: {
    title: String,
    description: String,
    banner: String,
    deadline: Date,
    promoCode: String,
    enabled: Boolean,
  },
}

)

export const  Content = models.Content || model("Content", ContentSchema);