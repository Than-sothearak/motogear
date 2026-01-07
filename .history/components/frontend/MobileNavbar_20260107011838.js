"use client"
import React from 'react'
import { CiMenuBurger } from 'react-icons/ci'

const MobileNavbar = ({  handleClick, isOpen }) => {
    return (

        <div> <button
        onClick={handleClick}
        ><CiMenuBurger size={24} /></button>
        <div className={`bg-primary text-primarytext w-full h-full overflow-y-auto transition-all duration-300 ease-in-out  ${isOpen ? "translate-x-0" : "-translate-x-full"}
        max-lg:fixed top-0 left-0 z-50
        `}>
          <div className='w-full h-screen'>sdsdsdsds</div>
        </div>
        </div>
    )
}

export default MobileNavbar