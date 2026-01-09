import { auth } from "@/auth";
import ProductSinglePage from "@/components/frontend/ProductSinglePage";
import { Product } from "@/models/Product";
import { mongoDb } from "@/utils/connectDB";

export const dynamic = "force-dynamic"; // Force fresh fetch on each request

export default async function ProductPage({ params }) {
  const { slug } = await params;
 const session = await auth()
  await mongoDb();

  // Fetch product by slug and only active products
  const product = await Product.findOne({ slug, status: "active" }).lean();

  if (!product) {
    return (
      <div className="text-center mt-20">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <>
    <ProductSinglePage product={JSON.parse(JSON.stringify(product))} session={session}/>
    </>
  );
}
