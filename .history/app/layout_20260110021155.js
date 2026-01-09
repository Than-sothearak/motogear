import { Playfair, Roboto,Roboto_Mono,Lato,Montserrat } from "next/font/google";
import "./globals.css";
export const dynamic = 'force-dynamic'

import { Geist } from 'next/font/google'
import Navbar from "@/components/frontend/Navbar";
import { auth } from "@/auth";
import { getCategories } from "@/actions/categories";
import Footer from "@/components/frontend/Footer";
import { Suspense } from "react";
import Loading from "@/components/frontend/loading";
import { headers } from "next/headers";


const playfair = Playfair({
   weight: '800',
  subsets: ['latin'],
})
const geist = Geist({
  weight: '400',
  subsets: ['latin'],
})
 

const myFont = Montserrat({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "Next admin template",
  description: "Next admin template",
  icons: {
    icon: "/favicon.ico",                     // default
    apple: "/apple-touch-icon.png",
    android: "/android-chrome-192x192"
  },

};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no',
};
 

export default async function RootLayout({ children }) {

  const headerList = await headers();
  const fullPath = headerList.get("x-current-path") || ""; 
  const isDashboard = fullPath.includes("/dashboard");
   const session = await auth();
  if (!session) {
  }
const categories = await getCategories();
 const menuData = {};
  categories.forEach((cat) => {
    if (!cat.parentCategory) {
      //Find all Parent category
      menuData[cat.name] = [];
    }
  });
 
    categories.forEach((cat) => {
    if (cat.parentCategory) {
      // Find parent name
      const parent = categories.find((p) => p._id.toString() === cat.parentCategory.toString());
      if (parent) {
        menuData[parent.name].push({
          name: cat.name,
          slug: cat.slug,
        });
      }
    }
  });

  return (

    <html lang="en" className={`${myFont.className}  antialiased bg-primary`}>
      <body
      >
     {isDashboard && <Navbar session={session} categories={JSON.parse(JSON.stringify(menuData))}/>}
        <Suspense fallback={<Loading />} >
          {children}
        </Suspense>
      {isDashboard && <Footer session={session} />}
      </body>
    </html>

  );
}
