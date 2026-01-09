import { getProducts } from "@/actions/products";
import Categories from "@/components/frontend/Categories";
import FeaturedProducts from "@/components/frontend/FeatureProduct";
import Hero from "@/components/frontend/Hero";
import HeroVideo from "@/components/frontend/HeroVideo";
import PromoBanner from "@/components/frontend/PromoBanner";
import { mongoDb } from "@/utils/connectDB";
import { connection } from "next/server";

export default async function Home() {
  await connection()
  await mongoDb();
  const products = await getProducts()
  return (

    <div className="">
      <HeroVideo />
      <Hero />
      <Categories />
      <PromoBanner />
      <FeaturedProducts products={JSON.parse(JSON.stringify(products))} />
    </div>


  );
}
