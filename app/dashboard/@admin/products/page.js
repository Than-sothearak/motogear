import SearchCompoenent from '@/components/SearchComponent';
import Link from 'next/link';
import React from 'react'

const productPage = ({pageName}) => {
  return (
    <div className="p-4 justify-center bg-primary rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <div>
         
          <SearchCompoenent
            placeHolder="Search for product..."
            linkPage={`/dashboard/${pageName}`}         />
        </div>
        <Link
          href={`/dashboard/${pageName}/add`}
          className="bg-tertiary px-2 py-1 text-center rounded-md hover:bg-secondary hover:text-tertiary text-sm text-secondarytext"
        >
          Add new
        </Link>
      </div>

    
    </div>
  )
}

export default productPage;