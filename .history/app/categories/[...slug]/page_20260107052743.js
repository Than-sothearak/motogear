import React from 'react'

const oneCatPage = async ({params}) => {
const {slug} = await params
  return (
    <div className=' container mx-auto h-screen z-50 mt-14 space-y-10'>
      <div>
        <h1 className='font-bold text-3xl uppercase'>Products (home page): {slug}</h1>
      </div>
       </div>
  )
}

export default oneCatPage