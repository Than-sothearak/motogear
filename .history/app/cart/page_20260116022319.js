import React from 'react'

export const cartPage = async ({params, searchParams}) => {
    const {slug} = await params;
    console.log(searchParams)
  return (
    <div>cartPage{slug}</div>
  )
}
