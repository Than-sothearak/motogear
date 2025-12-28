import React from 'react'
import { SidebarList } from './SidebarList'
import Logout from './Logout'
import { IoClose } from 'react-icons/io5'
import {
    analyticNavigation,
    pageNavigation,
    userNavigation,
  } from "@/lib/navLinks";
  
const SideBarMobile = ({handleClick, isOpen, session}) => {
  return (
    <div
      className={`bg-primary max-lg:h-screen p-4 w-80 max-lg:fixed
         top-0 left-0 z-50 transform transition-transform  duration-700 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0  max-sm:w-full
      `}
    >


      <div className="cursor-pointer flex  justify-between items-center gap-4 px-2 text-primarytext">
        <div className="flex gap-2 justify-start items-center">
         {session.user.imageUrl ?  <img
            className="w-11 h-11 bg-cover rounded-full"
            src={session?.user?.imageUrl}
          />:  <img
          className="w-11 h-11 bg-cover rounded-full"
          src='https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png'
        />}
          <div className="">
            <h1 className="text-sm font-bold">{session?.user?.username}</h1>
            {session?.user?.isAdmin ?  <p className="text-xs">Admin</p> :  <p className="text-xs">User</p> }
           
          </div>
        </div>
        <button
          onClick={handleClick}
          aria-label="Close Sidebar"
          title="Close Sidebar"
          className="text-primarytext lg:hidden"
        >
          <IoClose size={28} />
        </button>
      </div>
     

      <SidebarList navList={pageNavigation} />
      <SidebarList navList={analyticNavigation} />
      <SidebarList navList={userNavigation} />
   
  
 <Logout />
    </div>
  )
}

export default SideBarMobile