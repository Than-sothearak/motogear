"use client"
import { handleSignOut } from '@/actions/signout'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiUserLine } from 'react-icons/ri'

const Profile = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative flex'> <button onClick={() => setIsOpen(prev => !prev)}>
      <RiUserLine size={20} />
    </button>
      <div
        className={`
          w-60 right-0 absolute mt-10  bg-white border rounded-sm shadow-lg
          transform transition-all duration-300
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
        onMouseLeave={() => setIsOpen(false)}
      >
        {session?.user ? (
          <div className="p-4 w-full" >
            <div className='flex gap-4 w-full justify-start'>
              <div className=''>
                <p className="font-semibold text-gray-800">{session.user.username}</p>
             
              </div>
              <Image src={session.user.imageUrl} height={40} width={40} alt='profile' className='rounded-full' />
            </div>
            <button
              onClick={handleSignOut}
              className="mt-3 w-full  py-2 rounded-md transition">
              Logout
            </button>
          </div>
        ) : (<div className="p-4 w-full flex justify-center" >
          <Link href="/login" className='border w-full p-2 hover:bg-tertiary hover:text-primary'>
            <p className='text-center'> Login</p>
          </Link>
        </div>)}
      </div>
    </div>
  )
}

export default Profile