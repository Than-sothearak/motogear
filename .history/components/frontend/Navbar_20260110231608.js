import React, { Suspense, useState } from "react";
import Cart from "./Cart";
import Link from "next/link";
import Search from "./Search";
import { ProfileContent } from "../server/profileFetch";

const Navbar = ({ session, categories }) => {
 
    return (
        <header className="top-0 z-40 sticky w-full border-b bg-primary max-lg:p-2">
            <div className="lg:container w-full mx-auto font-semibold">
                <div className="flex items-center justify-between max-lg:flex-col">
                    {/* LOGO */}
                    <Link
                        href={`/`}
                        className="text-2xl font-black">
                        MOTO<span className="text-green-500">SHOP</span>
                    </Link>
                    {/* LEFT MENU */}

                    <Suspense fallback={<div>Loading</div>}>
                        {/* <CategoriesFetch /> */}
                    </Suspense>


                    {/* SEARCH */}
                    <div className="flex items-center space-x-4 max:md-order-2 max-lg:w-full">
                        {/* <MobileNavbar handleClick={handleClick} isOpen={isOpen} menuData={categories} /> */}
                        <Search />

                        {/* Account */}
                        <div className="flex items-center space-x-2 max-lg:order-3">
                            <Cart />
                           <Suspense fallback={<div>Loading</div>}>
                           <ProfileContent />
                    </Suspense>

                             
                          

                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Navbar;
