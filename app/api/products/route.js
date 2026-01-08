import { NextResponse } from "next/server";
import { z } from "zod";
import { mongoDb } from "@/utils/connectDB";
import { auth } from "@/auth";
import { deleteFileFromS3, uploadFileToS3 } from "@/utils/uploadImageFileToS3";
import { validateProduct } from "@/lib/validateData";
import { Product } from "@/models/Product";

// Validate only TEXT fields
const productSchema = z.object({
  productName: z.string().min(1),
  brandName: z.string().min(1),
  slug: z.string().min(1),
  basePrice: z.coerce.number(),
  discount: z.coerce.number(),
  category: z.string(),
  status: z.string(),
});

export async function POST(req) {
  await mongoDb();

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const jsonData = formData.get("data");
    const payload = JSON.parse(jsonData);

    let variantsWithFiles = [];
    const imageFiles = formData.getAll("imageFiles");

    variantsWithFiles = payload.variants.map((v, index) => {
      const file = formData.get(`variantImages[${index}]`);
      return { ...v, image: file }; // File object here
    });


    const errors = validateProduct(payload);

    if (!errors.success) {
      return NextResponse.json(
        { success: false, message: "validation faild" },
        { status: 400 }
      );
    }
  
    let images = [];
    try {
      if (imageFiles) {
        for (const file of imageFiles) {
          if (file && file.size > 0) {
            const url = await uploadFileToS3(file);
            images.push(url);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }

    for (const variant of variantsWithFiles) {
      if (variant.image.size > 0) {
        const url = await uploadFileToS3(variant.image); // or Cloudinary
        variant.images = url;
      }
    }

    // -----------------------
    // 4. Save to MongoDB
    try {
      await Product.create({
        ...payload,
        variants: variantsWithFiles,
        imageUrls: images,
      });
    } catch (err) {
      return NextResponse.json(err);
    }
    return NextResponse.json({
      success: true,
      message: "Your product created",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.flatten() },
        { status: 400 }
      );
    }
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return NextResponse.json({
        success: false,
        message: `${field} already exists`,
      });
    }

    return NextResponse.json(
      { success: false, message: "error" },
      { status: 500 }
    );
  }
}

