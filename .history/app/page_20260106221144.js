import { mongoDb } from "@/utils/connectDB";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

export default async function Home() {
  await connection()
  await mongoDb();
  // Not logged in: show login button
  return (
    <header>
      <nav>
        <main>
          <section></section>
          <section></section>
          <section></section>
        </main>
      </nav>
    </header>
  );
}
