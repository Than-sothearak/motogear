"use client"
import React from 'react'
import { CiMenuBurger } from 'react-icons/ci'

const MobileNavbar = ({ handleCLick, isOpen }) => {
    return (

        <div> <button><CiMenuBurger size={24} /></button>
        <div className='bg-white min-h-full absolute top-0 z-50 w-full'>
          
        </div>
        </div>
    )
}

export default MobileNavbar