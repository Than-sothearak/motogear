import React from 'react'

const oneCatPage = async ({params}) => {
const {slug} = await params
  return (
    <div className=' container mx-auto h-screen z-50 mt-14'>
      <div>
        <h1>oneCatPage: {slug}</h1>
      </div>
       </div>
  )
}

export default oneCatPage