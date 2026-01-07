import React from 'react'

const oneCatPage = async ({params}) => {
const {slug} = await params
  return (
    <div className='w-full bg-secondary mx-auto h-screen flex gap-10 flex-col'>
      <div className='container mx-auto mt-10 h-screen flex'>
        <div>
        <h1 className='font-bold text-3xl uppercase'>Products (home page): {slug}</h1>
      </div>

      <div className='h-80 w-80'>
        
      </div>
      </div>
       </div>
  )
}

export default oneCatPage