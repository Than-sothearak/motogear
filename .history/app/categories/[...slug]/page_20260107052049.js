import React from 'react'

const oneCatPage = async ({params}) => {
const {slug} = await params()
  return (
    <div>oneCatPage: {slug} </div>
  )
}

export default oneCatPage