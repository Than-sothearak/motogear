'use client';
import React from 'react'

const Search = ({placeholder}) => {

      function handleSearch(term) {
    console.log(term);
  }
 
    return (
        <div className="max-lg:order-2 w-full">
            <input
                type="text"
                placeholder="Search products..."
                className="border px-4 py-2 text-sm w-full
              focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => {
          handleSearch(e.target.value);
        }}
            />
        </div>
    )
}

export default Search