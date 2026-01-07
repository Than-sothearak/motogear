"use client"
import React, { useState } from 'react'
import { RiUserLine } from 'react-icons/ri'

const Profile = () => {
    const [isOpen, setIsOpen] =useState(false)
    
    return (
        <div> <button>
            <RiUserLine size={20} />
        </button>
        
        </div>
    )
}

export default Profile