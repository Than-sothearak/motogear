"use server"

import { Product } from "@/models/Product";
import { mongoDb } from "@/utils/connectDB"
import { Types } from "mongoose";

export async function getProductCarts (ids) {
    await mongoDb();

   if (!Array.isArray(ids)) {
    throw new Error("ids must be an array");
  }
    const data = JSON.parse(JSON.stringify(await Product.find({
    _id: ids
  })))
    return data;
    
}