import React from 'react'

const Navbar = () => {
    navlists = ['Helmets', 'Apparel', 'Accessories', 'Motobike']
  return (
    <div className='container flex justify-between border-b p-4'>
        <div>
            {navlists.map(item => 
                <p key={item}>{item}</p>
            )}
        </div>
        <div>Logo</div>
          <div>Searchbar</div>
        </div>
  )
}

export default Navbar