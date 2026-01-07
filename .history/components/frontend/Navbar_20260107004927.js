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
        <header className="bg-primary top-0 z-50 absolute w-full border-b-black">
            <div className="container mx-auto ">
                <div className="flex items-center justify-between">

                    {/* LEFT MENU */}
                    <nav className="flex gap-8 h-full ">
                        {Object.keys(menuData).map((item) => (
                            <div
                                key={item}
                                className=" h-14 flex items-center hover:border-b-black hover:border-b  hover:cursor-pointer"
                                onMouseEnter={() => setActiveMenu(item)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >

                                {item}


                                {/* DROPDOWN */}
                                {activeMenu === item && (
                                    <div className="absolute left-0 top-full w-full bg-primary shadow-xl px-4 " onMouseEnter={() => setActiveMenu(item)}
                                        onMouseLeave={() => setActiveMenu(null)}>
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
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* LOGO */}
                    <div className="text-2xl font-black tracking-wide italic">
                        MOTO<span className="text-green-500">SHOP</span>
                    </div>

                    {/* SEARCH */}
                   <div>
                     <div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="border px-4 py-2 text-sm w-48
              focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Account */}
                    <div></div>
                   </div>

                </div>
            </div>
        </header>
    );
};

export default Navbar;
