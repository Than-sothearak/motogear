import React from 'react'

export const cartPage = async ({params}) => {
    const {slug} = await params;
    if (slug === 'cancel=1'){
        
    }
  return (
    <div>cartPage{slug}</div>
  )
}
