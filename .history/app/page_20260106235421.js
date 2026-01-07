import Hero from "@/components/frontend/Hero";
import HeroVideo from "@/components/frontend/HeroVideo";
import Navbar from "@/components/frontend/Navbar";
import { mongoDb } from "@/utils/connectDB";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

export default async function Home() {
  await connection()
  await mongoDb();
  // Not logged in: show login button
  return (

   <div className="w-full m-auto">
    <Navbar />
    <Hero />
    <HeroVideo />
   </div>


  );
}
