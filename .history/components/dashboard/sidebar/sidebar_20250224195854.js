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
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Sidebar"
          title="Toggle Sidebar"
        >
          {isOpen ? <IoClose size={28} /> : <IoMdMenu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`bg-primary p-4 w-full min-h-screen 
          ${isOpen ? "block fixed top-0 left-0 w-64 z-50" : "max-lg:hidden"}
        `}
      >
        {/* Profile Section */}
        <div className="p-4 bg-red-900 text-primarytext">Profile</div>

        {/* Navigation */}
        <SidebarList navList={pageNavigation} />
        <SidebarList navList={analyticNavigation} />
      </div>
    </>
  );
};
