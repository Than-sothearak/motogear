"use client"
import Link from 'next/link'
import React from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { RiCloseLargeLine } from 'react-icons/ri'

const MobileNavbar = ({ handleClick, isOpen,menuData }) => {


  return (

    <div className='lg:hidden order-2'> <button
      onClick={handleClick}
    ><CiMenuBurger size={24} /></button>
      <div className={`bg-primary text-primarytext w-full h-full overflow-y-auto transition-all duration-500 ease-in-out  ${isOpen ? "translate-x-0" : "-translate-x-full"}
        max-lg:fixed top-0 left-0 z-50
        `}>
        <div className='p-4 flex flex-col justify-end items-end'>
          <button className='' onClick={handleClick}><RiCloseLargeLine size={28} /></button>
          <div className='space-y-8'>
            {Object.keys(menuData).map(item => (
              <div key={item}>
           
<Link   onClick={handleClick} className='text-3xl font-bold' href={`/categories/${item.toLowerCase()}`}>{item}</Link>
                <div className="mt-4">
                  <ul className="flex flex-wrap gap-4">
                  
                    {menuData[item].map(({ name,slug }) => (
                        
                      <Link
                      onClick={handleClick}
                        key={name}
                          href={`/categories/${item.toLowerCase()}?cat=${slug}`}
                        className="flex items-center gap-3 p-4 cursor-pointer hover:bg-tertiary/80
                          hover:text-primary  transition text-primarytext"
                      >
                     
                        <span>{name}</span>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNavbar