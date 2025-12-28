"use client"
import { useState } from "react";
import { analyticNavigation, pageNavigation, userNavigation } from "@/lib/navLinks";
import { SidebarList } from "@/components/SidebarList";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { SidebarListMobile } from "@/components/SidebarListMobile";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
   
      <div className="mt-2 flex justify-center items-center lg:hidden">
      <span className="text-primarytext text-lg font-semibold"></span>
        <button 
          onClick={() => setIsOpen(true)}
          aria-label="Open Sidebar"
          title="Open Sidebar"
        >
          <IoMdMenu size={28} />
        </button>
      </div>
    {/* Mobile side */}
      <div className="lg:hidden ml-1 mt-4">
        <SidebarListMobile navList={pageNavigation}/>
        <SidebarListMobile navList={analyticNavigation} />
        <SidebarListMobile navList={userNavigation} />
      </div>

   
      <div 
        className={`bg-primary p-4 w-72 fixed top-0 left-0 z-50 transform transition-all duration-700 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static max-sm:w-full
        `}
      >
     
        <div className="flex justify-between items-center  lg:hidden">
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

     
        <div className="cursor-pointer flex items-center gap-4 px-2 py-4 text-primarytext">
          <img className="w-11 h-11 bg-cover rounded-full"src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"/>
          <div className="">
            <h1 className="text-sm">Username</h1>
            <p className="text-xs">Administration</p>
           
          </div>
        
          </div>
          <hr />
     
        <SidebarList navList={pageNavigation} />
        <SidebarList navList={analyticNavigation} />
        <SidebarList navList={userNavigation} />
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
