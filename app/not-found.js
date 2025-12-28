import React from 'react'
import { MdCancel } from 'react-icons/md'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen gap-6'> 
    <div className='flex gap-4 justify-center items-center'>
    <MdCancel size={48}/><h2 className='text-4xl font-blod'>Page Not Found</h2>
    </div>
   
    <p>Could not find requested resource</p></div>
  )
}

export default NotFound