import React from 'react'

const oneCatPage = async ({params}) => {
const {slug} = await params
  return (
    <div className='w-full h-screen z-50 mt-14'>oneCatPage: {slug} </div>
  )
}

export default oneCatPage