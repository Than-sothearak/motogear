"use client"
import React from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { RiCloseLargeLine } from 'react-icons/ri'

const MobileNavbar = ({ handleClick, isOpen,menuData }) => {


  return (

    <div className='md:hidden'> <button
      onClick={handleClick}
    ><CiMenuBurger size={24} /></button>
      <div className={`bg-primary text-primarytext w-full h-full overflow-y-auto transition-all duration-500 ease-in-out  ${isOpen ? "translate-x-0" : "-translate-x-full"}
        max-lg:fixed top-0 left-0 z-50
        `}>
        <div className='h-screen p-4'>
          <button className='' onClick={handleClick}><RiCloseLargeLine size={28} /></button>
          <div className='space-y-8'>
            {Object.keys(menuData).map(item => (
              <div key={item}>
               <h2 className='text-xl font-bold'> {item}</h2>

                <div className="">
                  <ul className="flex flex-wrap gap-4">
                  
                    {menuData[item].map(({ name, icon: Icon }) => (
                        
                      <li
                        key={name}
                        className="flex items-center gap-3 p-4 cursor-pointer hover:bg-tertiary/80
                          hover:text-primary  transition text-primarytext"
                      >
                        <Icon size={25} className="" />
                        <span>{name}</span>
                      </li>
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