import { NextResponse } from "next/server";
import { z } from "zod";
import { mongoDb } from "@/utils/connectDB";
import { auth } from "@/auth";
import { uploadFileToS3 } from "@/utils/uploadImageFileToS3";
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
        // -----------------------
        // 1. Extract text fields
        // -----------------------
        // -----------------------
        // 2. Extract variants
        // -----------------------
        const variants = [];
        let index = 0;

        const variantsWithFiles = payload.variants.map((v, index) => {
            const file = formData.get(`variantImages[${index}]`);
            return { ...v, image: file }; // File object here
        });

        console.log(variantsWithFiles);

        const errors = validateProduct(payload, variants);

        if (!errors.success) {
            return NextResponse.json(
                { success: false, message: "validation faild" },
                { status: 400 }
            );
        }

        // -----------------------
        // 3. Access files
        // -----------------------
        // for (const variant of variantsWithFiles) {
        //     const uploadedImages = [];

        //     const url = await uploadFileToS3(variant.image); // or Cloudinary
        //     uploadedImages.push(url);
        //     variant.images = uploadedImages;
        // }
        // -----------------------
        // 4. Save to MongoDB
        console.log(variants)
        // await Product.create({...payload, variants});



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
