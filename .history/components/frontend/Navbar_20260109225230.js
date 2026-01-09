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
import MobileNavbar from "./MobileNavbar";
import Profile from "./Profile";
import Cart from "./Cart";
import Link from "next/link";

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

const Navbar = ({session, categories}) => {
    const [activeMenu, setActiveMenu] = useState(null);
     const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

    return (
        <header className="top-0 z-40 sticky w-full border-b bg-primary max-lg:p-2">
            <div className="container mx-auto font-semibold">
                <div className="flex items-center justify-between max-lg:flex-col">
                   {/* LOGO */}
                    <Link
                    href={`/`}
                    className="text-2xl font-black">
                        MOTO<span className="text-green-500">SHOP</span>
                    </Link>
                    {/* LEFT MENU */}
                    <nav className="flex gap-8 h-full max-lg:hidden max-lg:order-3">
                        {Object.keys(categories).map((item) => (
                            <div
                                key={item}
                                className="uppercase h-14 flex items-center hover:border-b-black hover:border-b  hover:cursor-pointer"
                                onMouseEnter={() => setActiveMenu(item)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <Link href={`/categories/${item.toLowerCase()}`}>{item}</Link>
                                {/* DROPDOWN */}
                                {activeMenu === item && (
                                    <div className="absolute left-0 top-full w-full  " onMouseEnter={() => setActiveMenu(item)}
                                        onMouseLeave={() => setActiveMenu(null)}>
                                        <div className="bg-primary shadow-xl px-4">
                                            <ul className="flex gap-4 justify-center">
                                                {categories[item].map(({ name, slug }) => (
                                                    <Link
                                                    href={`/categories/${item.toLowerCase()}?cat=${slug}`}
                                                        key={name}
                                                        className="flex flex-col items-center gap-3 px-6 py-6 cursor-pointer hover:bg-tertiary/80
                          hover:text-primary  transition text-primarytext"
                                                    >
                                                        
                                                        <span>{name}</span>
                                                    </Link>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                

                    {/* SEARCH */}
                    <div className="flex items-center space-x-4 max:md-order-2 max-lg:w-full">
                           <MobileNavbar  handleClick={handleClick} isOpen={isOpen} menuData={categories}/>
                     

                        {/* Account */}
                        <div className="flex items-center space-x-2 max-lg:order-3">
                          <Cart />
                           <Profile session={session}/>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Navbar;
