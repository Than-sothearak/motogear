"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";

export default function LayoutWrapper({ children}) {
  const pathname = usePathname();
  const hideNavbarFooter = pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbarFooter && <Navbar  />}
      {children}
      {/* {!hideNavbarFooter && <Footer session={session} />} */}
    </>
  );
}
