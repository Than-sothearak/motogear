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

const Navbar = ({session}) => {
    const [activeMenu, setActiveMenu] = useState(null);
     const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

    return (
        <header className="top-0 z-50 absolute w-full border-b border-tertiary bg-primary max-md:p-2">
            <div className="container mx-auto ">
                <div className="flex items-center justify-between flex-col">
               
                    {/* LEFT MENU */}
                    <nav className="flex gap-8 h-full max-md:hidden order-3">
                        {Object.keys(menuData).map((item) => (
                            <div
                                key={item}
                                className="uppercase h-14 flex items-center hover:border-b-black hover:border-b  hover:cursor-pointer"
                                onMouseEnter={() => setActiveMenu(item)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                {item}
                                {/* DROPDOWN */}
                                {activeMenu === item && (
                                    <div className="absolute left-0 top-full w-full  " onMouseEnter={() => setActiveMenu(item)}
                                        onMouseLeave={() => setActiveMenu(null)}>
                                        <div className="bg-primary shadow-xl px-4">
                                            <ul className="flex gap-4 justify-center">
                                                {menuData[item].map(({ name, icon: Icon }) => (
                                                    <li
                                                        key={name}
                                                        className="flex flex-col items-center gap-3 px-6 py-6 cursor-pointer hover:bg-tertiary/80
                          hover:text-primary  transition text-primarytext"
                                                    >
                                                        <Icon size={25} className="" />
                                                        <span>{name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* LOGO */}
                    <div className="text-2xl font-black tracking-wide italic order-1">
                        MOTO<span className="text-green-500">SHOP</span>
                    </div>

                    {/* SEARCH */}
                    <div className="flex items-center space-x-4 order-2 w-full">
                           <MobileNavbar  handleClick={handleClick} isOpen={isOpen} menuData={menuData}/>
                        <div className="order-2 w-full">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="border px-4 py-2 text-sm w-full
              focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        {/* Account */}
                        <div className="flex items-center space-x-2 order-3">
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
