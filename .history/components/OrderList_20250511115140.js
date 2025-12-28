"use client";

import { FaCcAmazonPay, FaCcVisa } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

const OrderList = ({
  isOpen,
  customerID,
  handleGenerate,
  cartItems,
  setCartItems,
  productlist,
}) => {
  const handleIncreasQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      })
    );
  };

  const handleDecreasQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item._id === id && item.quantity >= 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          } else {
            return item;
          }
        })
        .filter((item) => item.quantity > 0)
    );
  };
  const handleRemoveItem = (id) => {
    setCartItems((prev => prev.filter(item => item._id !== id)))
  }

  const total = () => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   [
//   { price: 10, quantity: 2 },  // 10 * 2 = 20
//   { price: 5, quantity: 3 }    // 5 * 3 = 15
// ]
// 0 + (10 * 2) = 20  
// 20 + (5 * 3) = 35

};


  return (
    <div
      className={`bg-primary mt-4 p-4
        left-0 z-10 transform rounded-lg top-4  max-sm:block transition-transform w-1/2  duration-700 ease-in-out
       ${
         isOpen
           ? "-translate-x-0 mt-0 w-full h-screen fixed"
           : "translate-x-full w-full max-sm:fixed"
       }  sm:translate-x-0 h-screen`}
    >
      <h1
        className={`${
          isOpen ? "hidden" : "text-xl font-bold text-primarytext"
        }`}
      >
        Order list
      </h1>
      <div className="flex flex-col gap-2 mt-4 border p-4 rounded-md">
        <h1 className="">Customer inforamtion</h1>
        <div className="flex max-md:flex-wrap gap-2 items-center text-sm">
          <input
            type="text"
            defaultValue={customerID || ""}
            className="w-full border p-1 rounded-md "
            placeholder="Customer ID"
          ></input>
          <button
            onClick={() => handleGenerate()}
            className="w-full bg-blue-500 p-1 rounded-md text-primary"
          >
            Auto generate ID
          </button>
        </div>

        <div className="flex max-md:flex-wrap gap-2 items-center text-sm">
          <input
            type="number"
            className="w-full border p-1 rounded-md "
            placeholder="Customer phone number"
          ></input>
        </div>
      </div>

      <table className="w-full mt-2">
        <thead>
          <tr className="border-b text-center">
            <th className="text-start">Product</th>
            <th className="text-start">Price</th>
            <th className="">Qty</th>
            <th className="text-end">Subtotal</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map((item, index) => {
               const itemInCart = cartItems.find(item => item._id === product._id);
               const unavailableStock = product.stock === itemInCart?.quantity;
            return (
            <tr className="border-b " key={item?._id}>
              <td className="py-2">
                <p className="text-xs">Product Id {item?._id}</p>
                <h1 className="font-bold truncate w-[100px]">
                  {item?.productName}
                </h1>
              </td>
              <td className="py-2">${item?.price.toFixed(2)}</td>
              <td className="p-2 font-bold">
                <div className="p-2 flex justify-center items-center gap-2 border rounded-md">
                  <button
                    onClick={() => handleDecreasQty(item?._id)}
                    type="button"
                    className="p-2 bg-secondary rounded-md w-full"
                  >
                    -
                  </button>
                  <p className="w-full text-center">{item?.quantity}</p>
                  <button
                    onClick={() => handleIncreasQty(item?._id)}
                    type="button"
                    className="p-2 bg-secondary rounded-md w-full"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="p-2 text-end">{(item?.quantity * item?.price).toFixed(2)}$</td>
              <td className="py-2 text-end text-red-500">
                <button onClick={() => handleRemoveItem(item._id)}><MdDeleteForever size={22} /></button>
              </td>
            </tr>
          )
          })}
          <tr className="border-b text-sm">
            <td className="py-2">Subtotal</td>
            <td></td>
            <td></td>
            <td></td>
            <td className="font-bold text-end">${total().toFixed(2)}</td>
          </tr>

          <tr className="border-b">
            <td className="font-bold py-2 ">Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td className="font-bold  text-end">${total().toFixed(2)}</td>
          </tr>
          <tr className="">
            <td className="py-4 flex gap-2">
              <FaCcVisa size={38} /> <FaCcAmazonPay size={38} />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td className="text-end">
              <button className="py-2 px-4 bg-blue-500 rounded-md text-primary ">
                Payment
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
