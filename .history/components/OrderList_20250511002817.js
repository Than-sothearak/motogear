import React from 'react'

const OrderList = ({isOpen,customerID, handleGenerate}) => {
  return (
    <div className={`bg-primary mt-4 p-4
        left-0 z-10 transform rounded-lg top-4  max-sm:block transition-transform w-1/2  duration-700 ease-in-out
       ${
         isOpen ? "-translate-x-0 mt-0 w-full h-screen fixed" : "translate-x-full w-full max-sm:fixed"
       }  sm:translate-x-0 h-screen`}>
       <h1 className={`${isOpen ? 'hidden': "text-xl font-bold text-primarytext"}`}>Order list</h1>
       <div className="flex flex-col gap-2 mt-4 border p-4 rounded-md">
           <h1 className="">Customer inforamtion</h1>
           <div className="flex max-md:flex-wrap gap-2 items-center text-sm">
               <input
               type="text"
               defaultValue={customerID || ""}
               className="w-full border p-1 rounded-md "
               placeholder="Customer ID"
               ></input>
               <button onClick={() => handleGenerate()}className="w-full bg-blue-500 p-1 w-full rounded-md text-primary">Auto generate ID</button>
           </div>

           <div className="flex max-md:flex-wrap gap-2 items-center text-sm">
               <input
               type="number"
               className="w-full border p-1 rounded-md "
               placeholder="Customer phone number"
               ></input>
              
           </div>
       </div>

       <table className='border w-full'>
        <thead>
            <td>height</td>
        </thead>
        <th>Product</th>
       </table>
     </div>
  )
}

export default OrderList