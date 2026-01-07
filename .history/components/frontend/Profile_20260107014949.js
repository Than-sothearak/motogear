"use client"
import React, { useState } from 'react'
import { RiUserLine } from 'react-icons/ri'

const Profile = () => {
    const [isOpen, setIsOpen] =useState(false)

    return (
        <div> <button>
            <RiUserLine size={20} />
        </button>
        <div className='absolute bg-primary'>
            <p>name</p>
            <h1>email</h1>
        </div>
        </div>
    )
}

export default Profile