import Categories from "@/components/frontend/Categories";
import Hero from "@/components/frontend/Hero";
import HeroVideo from "@/components/frontend/HeroVideo";
import { mongoDb } from "@/utils/connectDB";
import { connection } from "next/server";

export default async function Home() {
  await connection()
  await mongoDb();

  return (

    <div className="w-full m-auto bg-primary">

      <HeroVideo />
      <Hero />
      <Categories />
    </div>


  );
}
