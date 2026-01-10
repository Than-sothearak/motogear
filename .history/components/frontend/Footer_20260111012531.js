"use client";
import { HomeIcon, PackageSearch, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";

import Cart from "./Cart";

function Footer() {
  const categories = ["Helmets", "Apparel", "Accessories", "Motorbikes"];

  const supportLinks = ["Contact Us", "FAQ", "Shipping", "Returns", "Warranty"];
  return (
    <div className="max-lg:z-20 max-lg:sticky max-lg:bottom-0 bg-black max-lg:flex max-lg:justify-center">
      <div className=" w-full h-24 shadow-xl rounded-t-xl border-t border border-t-black  lg:hidden">
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

<div className="max-lg:hidden container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* 1️⃣ About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">MotoShop</h3>
          <p className="text-gray-400 text-sm">
            Premium motorcycle gear and accessories for riders worldwide. 
            Ride safe, ride smart.
          </p>
          <div className="flex gap-3 mt-4">
            <Link href="#"><Facebook className="w-5 h-5 hover:text-blue-500"/></Link>
            <Link href="#"><Instagram className="w-5 h-5 hover:text-pink-500"/></Link>
            <Link href="#"><Twitter className="w-5 h-5 hover:text-blue-400"/></Link>
            <Link href="#"><Youtube className="w-5 h-5 hover:text-red-600"/></Link>
            <Link href="#"><Linkedin className="w-5 h-5 hover:text-blue-700"/></Link>
          </div>
        </div>

        {/* 2️⃣ Shop Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            {categories.map((cat) => (
              <li key={cat}>
                <Link href={`/categories/${cat.toLowerCase()}`} className="hover:text-primarytext">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3️⃣ Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            {supportLinks.map((link) => (
              <li key={link}>
                <Link href="#" className="hover:text-primarytext">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 4️⃣ Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-400 text-sm mb-4">Subscribe to get our latest offers and news.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded text-gray-900 flex-1"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Subscribe
            </button>
          </form>
          {/* Payment icons */}
          <div className="flex gap-3 mt-6">
            <img src="/icons/visa.png" alt="Visa" className="w-10 h-6"/>
            <img src="/icons/mastercard.png" alt="MasterCard" className="w-10 h-6"/>
            <img src="/icons/paypal.png" alt="PayPal" className="w-10 h-6"/>
            <img src="/icons/amex.png" alt="Amex" className="w-10 h-6"/>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="max-lg:hidden border-t border-gray-800 py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between text-gray-500 text-sm">
          <p>© 2025 MotoShop. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Footer;
