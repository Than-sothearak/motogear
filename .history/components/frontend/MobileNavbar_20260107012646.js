"use client"
import React from 'react'
import { CiMenuBurger } from 'react-icons/ci'

const MobileNavbar = ({  handleClick, isOpen, menuData }) => {

    
    return (

        <div> <button
        onClick={handleClick}
        ><CiMenuBurger size={24} /></button>
        <div className={`bg-primary text-primarytext w-full h-full overflow-y-auto transition-all duration-500 ease-in-out  ${isOpen ? "translate-x-0" : "-translate-x-full"}
        max-lg:fixed top-0 left-0 z-50
        `}>
          <div className='h-screen p-4'>
            <button className='' onClick={handleClick}>x</button>
            <div>
             {Object.keys(menuData).map(itme => (
                <div key={item}>
                    {itme}

                    
                </div>
             ))}
            </div>
          </div>
        </div>
        </div>
    )
}

export default MobileNavbar