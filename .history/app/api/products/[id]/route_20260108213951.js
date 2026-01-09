import { NextResponse } from "next/server";
import { z } from "zod";
import { mongoDb } from "@/utils/connectDB";
import { auth } from "@/auth";
import { uploadFileToS3, deleteFileFromS3 } from "@/utils/uploadImageFileToS3";
import { validateProduct } from "@/lib/validateData";
import { Product } from "@/models/Product";

export async function PUT(req, { params }) {
  await mongoDb();

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  try {
    const productId = params.id;
    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID missing" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const jsonData = formData.get("data");
    const payload = JSON.parse(jsonData);

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // -----------------------
    // VALIDATION
    // -----------------------
    const errors = validateProduct(payload);
    if (!errors.success) {
      return NextResponse.json(
        { success: false, message: "validation failed" },
        { status: 400 }
      );
    }

    // -----------------------
    // HANDLE PRODUCT IMAGES
    // -----------------------
    const imageFiles = formData.getAll("imageFiles");
    const newImages = [];

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const url = await uploadFileToS3(file);
        newImages.push(url);
      }
    }

    // Remove deleted images
    if (payload.removedImages?.length > 0) {
      for (const img of payload.removedImages) {
        const key = img.split("/").pop();
        if (key) await deleteFileFromS3(key);
      }

      product.imageUrls = product.imageUrls.filter(
        (img) => !payload.removedImages.includes(img)
      );
    }

    product.imageUrls.push(...newImages);

    // -----------------------
    // HANDLE VARIANTS (REPLACE ONLY IF NEW FILE)
    // -----------------------
    const updatedVariants = payload.variants.map((v, index) => {
      const file = formData.get(`variantImages[${index}]`);
      const existingVariant = product.variants[index];

      return {
        ...v,
        images:
          file && file.size > 0
            ? null // placeholder, upload below
            : existingVariant?.images || null,
        _newFile: file,
      };
    });

    // Upload variant images (replace only)
    for (const variant of updatedVariants) {
      if (variant._newFile && variant._newFile.size > 0) {
        variant.images = await uploadFileToS3(variant._newFile);
      }
      delete variant._newFile;
    }

    // -----------------------
    // UPDATE PRODUCT FIELDS
    // -----------------------
    product.productName = payload.productName;
    product.brandName = payload.brandName;
    product.slug = payload.slug;
    product.description = payload.description;
    product.basePrice = payload.basePrice;
    product.discount = payload.discount;
    product.category = payload.category;
    product.status = payload.status;
    product.variants = updatedVariants;

    await product.save();

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
