"use client"
import React from 'react'

const FilterComponent = () => {
  return (
      <div className='flex justify-between items-center'>
          <h1 className='font-bold text-3xl uppercase'>Products: All {slug}</h1>
          <div className='flex gap-2 items-center'>
            <label>Type</label>
            <select className='border py-2 px-4'>
              <option>All</option>
            </select>
          </div>
        </div>
  )
}

export default FilterComponent