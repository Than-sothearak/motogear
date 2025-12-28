"use client"
import { useState } from "react";
import { analyticNavigation, pageNavigation } from "@/lib/navLinks";
import { SidebarList } from "@/components/SidebarList";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden ml-4 mt-4">
        <button 
          onClick={() => setIsOpen(true)}
          aria-label="Open Sidebar"
          title="Open Sidebar"
        >
          <IoMdMenu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`bg-primary p-4 w-64 min-h-screen fixed top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static max-sm:w-full
        `}
      >
        {/* Close Button (Only for Mobile) */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <span className="text-primarytext text-lg font-semibold">Menu</span>
          <button 
            onClick={() => setIsOpen(false)}
            aria-label="Close Sidebar"
            title="Close Sidebar"
            className="text-primarytext"
          >
            <IoClose size={28} />
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-4 bg-red-900 text-primarytext">Profile</div>

        {/* Navigation */}
        <SidebarList navList={pageNavigation} />
        <SidebarList navList={analyticNavigation} />
      </div>

      {/* Overlay (closes sidebar when clicked) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
