"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";

export default function LayoutWrapper({ session, menuData, children }) {
  const pathname = usePathname();
  const hideNavbarFooter = pathname.startsWith("/dashboard");

  return (
    <>
      {hideNavbarFooter && <Navbar session={session} categories={menuData} />}
      {children}
      {hideNavbarFooter && <Footer session={session} />}
    </>
  );
}
