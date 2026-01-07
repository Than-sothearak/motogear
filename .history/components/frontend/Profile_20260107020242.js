"use client"
import React, { useState } from 'react'
import { RiUserLine } from 'react-icons/ri'

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='relative'> <button onClick={() => setIsOpen(prev => !prev)}>
            <RiUserLine size={20} />
        </button>
            <div className={`absolute bg-primary p-4 right-0 duration-300 transition-all delay-100  ${!isOpen ? 'block' : 'hidden'} border`} 
                             
                                onMouseLeave={() => setIsOpen(false)}>
                <p>name</p>
                <h1>email</h1>
            </div>
        </div>
    )
}

export default Profile