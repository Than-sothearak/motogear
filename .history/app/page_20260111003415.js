import { getProducts } from "@/actions/products";
import Categories from "@/components/frontend/Categories";
import FeaturedProducts from "@/components/frontend/FeatureProduct";
import Hero from "@/components/frontend/Hero";
import HeroVideo from "@/components/frontend/HeroVideo";
import Loading from "@/components/frontend/loading";
import PromoBanner from "@/components/frontend/PromoBanner";
import { connection } from "next/server";
import { Suspense } from "react";

export default async function Home() {

  return (
    <div className="">
     
      <HeroVideo />
       <Suspense fallback={<Loading />}>
        <GetFeatureProducts />
      </Suspense>
      <Hero />
      <Categories />
      <PromoBanner />
      
    </div>
  );
}

async function GetFeatureProducts() {
  await connection()
  const {products, count} = await getProducts()
  return <FeaturedProducts products={JSON.parse(JSON.stringify(products))} />
}
