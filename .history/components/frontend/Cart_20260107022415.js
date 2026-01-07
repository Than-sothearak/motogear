"use client"
import React, { useState } from 'react'
import { IoBagOutline } from 'react-icons/io5'
import { RiCloseLargeLine } from 'react-icons/ri'

const Cart = () => {
    const [isOpen, setIsOpen] = useState(false)
    function handleClick() {
        setIsOpen((prev) => !prev);
    }

    return (
        <div className='flex w-full'>
            <button
                onClick={handleClick}>
                <IoBagOutline size={20} />
            </button>

            <div className={`bg-primary md:w-96 w-full h-full overflow-y-auto transition-all duration-500 ease-in-out  ${isOpen ? "-translate-x-0" : "translate-x-full"}
       fixed top-0 right-0 z-30 p-4`}>
                <button className='' onClick={handleClick}><RiCloseLargeLine size={28} /></button>

            </div>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        </div>
    )
}

export default Cart