import React from 'react'

const Navbar = () => {
    navlist = ['Helmets', 'Apparel', 'Accessories', 'Motobike']
  return (
    <div className='container flex justify-between border-b p-4'>
        <div>Navbarlist</div>
        <div>Logo</div>
          <div>Searchbar</div>
        </div>
  )
}

export default Navbar