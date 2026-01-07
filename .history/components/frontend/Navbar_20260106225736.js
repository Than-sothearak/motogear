"use client";
import React, { useState } from "react";
import {
  Bike,
  Shield,
  Camera,
  Package,
  Shirt,
  Footprints,
  Glasses,
  Wrench,
  Tent,
} from "lucide-react";

const menuData = {
  Helmets: [
    { name: "Full Face", icon: Shield },
    { name: "Modular", icon: Package },
    { name: "Open Face", icon: Bike },
    { name: "Off-Road", icon: Bike },
    { name: "Adventure", icon: Bike },
  ],
  Apparel: [
    { name: "Jackets", icon: Shirt },
    { name: "Pants", icon: Shirt },
    { name: "Gloves", icon: Shield },
    { name: "Boots", icon: Footprints },
    { name: "More", icon: Package },
  ],
  Accessories: [
    { name: "Goggles", icon: Glasses },
    { name: "Protectors", icon: Shield },
    { name: "Cameras", icon: Camera },
    { name: "Camping Tools", icon: Tent },
    { name: "Tools", icon: Wrench },
  ],
};

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">

          {/* LEFT MENU */}
          <nav className="flex gap-8 relative h-full bg-black">
            {Object.keys(menuData).map((item) => (
              <div
                key={item}
                className="relative"
                onMouseEnter={() => setActiveMenu(item)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                
                  {item}
             

                {/* DROPDOWN */}
                {/* {activeMenu === item && (
                  <div className="absolute left-0 top-full w-72 bg-white shadow-xl rounded-xl border">
                    <ul className="space-y-1">
                      {menuData[item].map(({ name, icon: Icon }) => (
                        <li
                          key={name}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
                          hover:bg-gray-100 transition text-gray-700 hover:text-black"
                        >
                          <Icon size={18} className="text-gray-500" />
                          <span>{name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>
            ))}
          </nav>

          {/* LOGO */}
          <div className="text-xl font-bold tracking-wide">
            MOTO<span className="text-red-500">SHOP</span>
          </div>

          {/* SEARCH */}
          <div>
            <input
              type="text"
              placeholder="Search products..."
              className="border rounded-full px-4 py-2 text-sm w-48
              focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
