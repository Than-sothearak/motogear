"use client";
import React, { useState } from "react";

const menuData = {
  Helmets: [
    "Full Face",
    "Modular",
    "Open Face",
    "Off-Road",
    "Adventure",
  ],
  Apparel: [
    "Jackets",
    "Pants",
    "Gloves",
    "Boots",
    "More",
  ],
  Accessories: [
    "Goggles",
    "Protectors",
    "Cameras",
    "Camping Tools",
  ],
};

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LEFT MENU */}
          <nav className="flex gap-8 relative">
            {Object.keys(menuData).map((item) => (
              <div
                key={item}
                className="relative"
                onMouseEnter={() => setActiveMenu(item)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="font-medium text-gray-700 hover:text-black transition">
                  {item}
                </button>

                {/* MEGA MENU */}
                {activeMenu === item && (
                  <div className="absolute left-0 top-full w-64 bg-white shadow-xl rounded-xl p-4 border">
                    <ul className="space-y-2">
                      {menuData[item].map((sub) => (
                        <li
                          key={sub}
                          className="cursor-pointer text-gray-600 hover:text-black hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                        >
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* LOGO */}
          <div className="text-xl font-bold tracking-wide">
            MOTO<span className="text-red-500">SHOP</span>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black w-48"
            />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
