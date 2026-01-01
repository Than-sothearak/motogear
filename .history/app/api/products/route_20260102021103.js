import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { z } from "zod";
import { mongoDb } from "@/utils/connectDB";
import { validateProduct } from "@/lib/validateData";
import { auth } from "@/auth";

// 2. Validation schema
const productSchema = z.object({
    properties: z.array(
        z.object({
            name: z.string().min(1, "Property name is required"),
            part: z.string().min(1, "Property value is required")
        })
    ),
    variants: z.array(
        z.object({
            size: z.string().min(1, "Size is required"),
            color: z.string().min(1, "Color is required"),
            stock: z.number().min(0),
            price: z.number().min(0),
            sku: z.string().min(1),
            images: z.array(
                z.object({
                    file: z.any(), // file object from client
                    preview: z.string().url()
                })
            )
        })
    )
});

export async function POST(req) {
        await mongoDb()
     const session = await auth();
     if (!session?.user?.isAdmin) {
       return console.log("Access denied!");
     }

    try {
        const body = await req.json();
        console.log(body)
        // 3. Validate request body
        const validatedData = validateProduct(body)
        if (validatedData) {
            console.log("Good")



            for (const variant of variantMetadata) {
              variant.images = [];
            
              for (let i = 0; i < variant.imageCount; i++) {
                const file = variantFiles[fileIndex++]; // get the correct File object
                if (file && file.size > 0) {
                  const url = await uploadFileToS3(file); // upload to S3
                  variant.images.push(url); // save S3 URL
                }
              }
            }
        }
        // 4. Insert into MongoDB
       

        return NextResponse.json({ success: true });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ success: false, errors: err.errors }, { status: 400 });
        }
        console.error(err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
