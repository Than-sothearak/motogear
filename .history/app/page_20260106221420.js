import { Navbar } from "@/components/layout/Navbar";
import { mongoDb } from "@/utils/connectDB";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

export default async function Home() {
  await connection()
  await mongoDb();
  // Not logged in: show login button
  return (

    <>
      <header>
      <Navbar />
      </header>

      <main>
        <section>section</section>
        <section></section>
        <section></section>
      </main>
    </>


  );
}
