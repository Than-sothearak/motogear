"use client";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { SidebarList } from "@/components/SidebarList";
import { SidebarListMobile } from "@/components/SidebarListMobile";
import {
  analyticNavigation,
  pageNavigation,
  userNavigation,
} from "@/lib/navLinks";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Controls sidebar state (expanded/collapsed)
  
  const handleClick = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Sidebar Toggle Button - Always visible */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={handleClick}
          className="text-primarytext p-2 bg-gray-800 rounded-md"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? <IoClose size={28} /> : <IoMdMenu size={28} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <div
        className={`bg-primary h-screen p-4 fixed top-0 left-0 z-40 transition-all duration-700 ease-in-out 
        ${isOpen ? "w-80" : "w-20"} max-lg:w-80 max-lg:translate-x-[-100%] lg:translate-x-0`}
      >
        {/* User Info */}
        <div className={`cursor-pointer flex items-center gap-4 px-2 text-primarytext ${!isOpen && "justify-center"}`}>
          <img
            className="w-11 h-11 bg-cover rounded-full"
            src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
            alt="Profile"
          />
          {isOpen && (
            <div>
              <h1 className="text-sm">Username</h1>
              <p className="text-xs">Administration</p>
            </div>
          )}
        </div>

        {/* Sidebar Navigation */}
        <SidebarList navList={pageNavigation} isOpen={isOpen} />
        <SidebarList navList={analyticNavigation} isOpen={isOpen} />
        <SidebarList navList={userNavigation} isOpen={isOpen} />
      </div>

      {/* Small screen overlay */}
      {!isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={handleClick}
        />
      )}
    </>
  );
};
