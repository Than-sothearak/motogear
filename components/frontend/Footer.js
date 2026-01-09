"use client";
import { HomeIcon, PackageSearch, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import Cart from "./Cart";

function Footer() {

  return (
    <div className="z-40 sticky mt-10 bottom-0 bg-primary py-3 lg:hidden shadow-t-xl rounded-t-xl border-t border border-t-black">
      <div className="flex justify-between w-full font-bold">
        <Link
          href={`/`}
          className="w-full flex flex-col items-center justify-center p-2"
        >
          <HomeIcon />
          <p>Home</p>
        </Link>

        <Link
          href={`/products`}
          className="w-full flex flex-col items-center justify-center p-2"
        >
          <PackageSearch />
          <p>Product</p>
        </Link>

        <Link
          href={`/`}
          className="w-full flex flex-col items-center justify-center p-2"
        >
          <Cart />
          <p>Cart</p>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
