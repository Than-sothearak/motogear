import { NextResponse } from "next/server";
import { z } from "zod";
import { mongoDb } from "@/utils/connectDB";
import { auth } from "@/auth";

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

    // -----------------------
    // 1. Extract text fields
    // -----------------------
    const product = {
      productName: formData.get("productName"),
      brandName: formData.get("brandName"),
      slug: formData.get("slug"),
      basePrice: Number(formData.get("basePrice")),
      discount: Number(formData.get("discount")),
      category: formData.get("category"),
      status: formData.get("status"),
    };

    // productSchema.parse(product); // Zod validation
    
    // -----------------------
    // 2. Extract variants
    // -----------------------
    const variants = [];
    let index = 0;

    while (formData.get(`variants[${index}][size]`)) {
      variants.push({
        size: formData.get(`variants[${index}][size]`),
        color: formData.get(`variants[${index}][color]`),
        stock: Number(formData.get(`variants[${index}][stock]`)),
        price: Number(formData.get(`variants[${index}][price]`)),
        sku: formData.get(`variants[${index}][sku]`),
        images: formData.getAll(`variants[${index}][images]`), // File[]
      });
      index++;
    }

  
    // -----------------------
    // 3. Access files
    // -----------------------
    for (const variant of variants) {
      for (const file of variant.images) {
          const url = await uploadFileToS3(file);
          
      }
    }
 
    // -----------------------
    // 4. Save to MongoDB
    // -----------------------
    // Replace variant.images with uploaded URLs before saving

    return NextResponse.json({ success: true });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.flatten() },
        { status: 400 }
      );
    }

    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
