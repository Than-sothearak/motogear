"use client"
import React, { useState } from 'react'
import { IoBagOutline } from 'react-icons/io5'

const Cart = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='flex'>
            <button
            onClick={()=> setIsOpen(prev=> !prev)}>
                <IoBagOutline size={20} />
            </button>

            <div className={`bg-primary w-1/2 h-full overflow-y-auto transition-all duration-500 ease-in-out  ${isOpen ? "-translate-x-0" : "translate-x-full"}
       fixed top-0 right-0 z-50`}>
                Mycart
                <div>sd</div>
            </div>
        </div>
    )
}

export default Cart