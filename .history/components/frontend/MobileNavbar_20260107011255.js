"use client"
import React from 'react'
import { CiMenuBurger } from 'react-icons/ci'

const MobileNavbar = ({ handleCLick, isOpen }) => {
    return (

        <div> <button><CiMenuBurger size={24} /></button>
        <div className={`bg-primary text-primarytext ${isCollapsed ? 'p-0' : 'p-2'} h-full overflow-y-auto transition-all duration-300 ease-in-out
        max-lg:fixed top-0 left-0 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0  `}>
          
        </div>
        </div>
    )
}

export default MobileNavbar