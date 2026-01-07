import { auth } from "@/auth";
import Hero from "@/components/frontend/Hero";
import HeroVideo from "@/components/frontend/HeroVideo";
import Navbar from "@/components/frontend/Navbar";
import { mongoDb } from "@/utils/connectDB";
import { connection } from "next/server";

export default async function Home() {
  await connection()
  await mongoDb();
  const session = await auth();
  if (!session) {

  }
  return (

   <div className="w-full m-auto">
  
     <HeroVideo />
    <Hero />
    
   </div>


  );
}
