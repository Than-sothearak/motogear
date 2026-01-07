"use client"
import React, { useState } from 'react'
import { IoBagOutline } from 'react-icons/io5'

const Cart = () => {
      const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='flex'>
            <button>
                <IoBagOutline size={20} />
            </button>

            <div className='absolute bg-white h-screen w-1/2'>
                Mycart
            </div>
        </div>
    )
}

export default Cart