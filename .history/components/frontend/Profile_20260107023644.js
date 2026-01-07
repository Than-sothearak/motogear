"use client"
import { handleSignOut } from '@/actions/signout'
import Image from 'next/image'
import React, { useState } from 'react'
import { RiUserLine } from 'react-icons/ri'

const Profile = ({session}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='relative flex'> <button onClick={() => setIsOpen(prev => !prev)}>
            <RiUserLine size={20} />
        </button>
            <div
        className={`
          absolute right-0 mt-8 w-60 bg-white border rounded-sm shadow-lg
          transform origin-top-right transition-all duration-300
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
        onMouseLeave={() => setIsOpen(false)}
      >
      
            </div>
        </div>
    )
}

export default Profile