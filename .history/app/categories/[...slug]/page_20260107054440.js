import React from 'react'

const oneCatPage = async ({params}) => {
const {slug} = await params
  return (
    <div className='w-full bg-secondary mx-auto h-screen flex gap-10 flex-col'>
      <div className='container m-auto'>
        <div>
        <h1 className='font-bold text-3xl uppercase'>Products (home page): {slug}</h1>
      </div>
      </div>
       </div>
  )
}

export default oneCatPage