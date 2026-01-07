"use client"
import React from 'react'
import { CiMenuBurger } from 'react-icons/ci'

const MobileNavbar = ({ handleCLick, isOpen }) => {
    return (

        <div> <button><CiMenuBurger size={24} /></button>
        <div className='bg-white h-screen absolute'></div>
        </div>
    )
}

export default MobileNavbar