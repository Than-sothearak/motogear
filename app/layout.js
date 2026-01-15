import { Playfair, Montserrat } from "next/font/google";
import "./globals.css";
export const dynamic = "force-dynamic";
import { Geist } from "next/font/google";
import Navbar from "@/components/frontend/Navbar";
import { Suspense } from "react";
import Loading from "@/components/frontend/loading";
import Footer from "@/components/frontend/Footer";
import { CartContextProvider } from "@/components/CartContext";

const playfair = Playfair({
  weight: "800",
  subsets: ["latin"],
});
const geist = Geist({
  weight: "400",
  subsets: ["latin"],
});

const myFont = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next admin template",
  description: "Next admin template",
  icons: {
    icon: "/favicon.ico", // default
    apple: "/apple-touch-icon.png",
    android: "/android-chrome-192x192",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${myFont.className}  antialiased bg-primary`}>
      <body>
        <CartContextProvider>
          <Navbar />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
        </CartContextProvider>
      </body>
    </html>
  );
}
