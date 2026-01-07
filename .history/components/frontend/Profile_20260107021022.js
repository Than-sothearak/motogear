"use client"
import React, { useState } from 'react'
import { RiUserLine } from 'react-icons/ri'

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='relative flex'> <button onClick={() => setIsOpen(prev => !prev)}>
            <RiUserLine size={20} />
        </button>
            <div
        className={`
          absolute right-0 mt-8 w-48 bg-white border rounded-sm shadow-lg
          transform origin-top-right transition-all duration-300
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="p-4" >
          <p className="font-semibold text-gray-800">John Doe</p>
          <p className="text-sm text-gray-500">email@example.com</p>
          <button className="mt-3 w-full  py-2 rounded-md transition">
            Logout
          </button>
        </div>
            </div>
        </div>
    )
}

export default Profile