"use client";

import { useState } from "react";
import { FaCcAmazonPay, FaCcVisa } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import Receipt from "./Receipt";

const OrderList = ({ isOpen, cartItems, setCartItems, productlist }) => {
  const [order, setOrders] = useState("");
  const [latestPayment, setLatestPayment] = useState(null);

  const [inputCustomerID, setInCustomerID] = useState("");
  const [inputCustomerPhone, setInCustomerPhone] = useState("");

  function generateCustomerID() {
    const date = new Date();
    const datePart = date.toISOString().slice(0, 10).replace(/-/g, ""); // e.g., 20250510
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // e.g., XYZ123
    return `CUST-${datePart}-${randomPart}`;
  }

  const handleGenerate = () => {
    const newID = generateCustomerID();
    setInCustomerID(newID);
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the target element

    if (name === "customerID") {
      setInCustomerID(value);
    } else if (name === "customerPhone") {
      setInCustomerPhone(value);
    }
  };

  const handlePayment = () => {
    // Gather payment info
    const paymentInfo = {
      customerID: inputCustomerID,
      customerPhone: inputCustomerPhone,
      items: cartItems,
      totalAmount: total().toFixed(2),
      paymentMethod: "Visa", // You can dynamically update this based on user selection
      paymentStatus: "Pending", // Or "Completed" after successful payment
      date: new Date(),
    };
    setOrders((prev) => [...prev, paymentInfo]);
      setLatestPayment(paymentInfo); // <-- Add this line
    console.log("Payment Information: ", paymentInfo);
    // Store in localStorage (optional)
    localStorage.setItem("paymentInfo", JSON.stringify(order));
    // You can also redirect to a confirmation page or show a success message
    alert("Payment information has been saved!");
    setCartItems([]);
    setInCustomerID("");
    setInCustomerPhone("");
  };

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
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

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
      className={`bg-primary p-4 sm:mt-4 h-full overflow-scroll
        left-0 z-10 transform sm:rounded-lg top-0 max-sm:block transition-transform w-1/2  duration-700 ease-in-out
       ${
         isOpen
           ? "-translate-x-0 mt-0 w-full fixed"
           : "translate-x-full w-full max-sm:fixed"
       }  sm:translate-x-0`}
    >
      <h1
        className={`${
          isOpen ? "hidden" : "text-xl font-bold text-primarytext"
        }`}
      >
        Order list
      </h1>
      <div className="flex flex-col gap-2 max-sm:mt-10 mt-2 border p-4 rounded-md">
        <h1 className="">Customer inforamtion</h1>
        <div className="flex max-md:flex-wrap gap-2 items-center text-sm">
          <input
            onChange={handleChange}
            type="text"
            name="customerId"
            defaultValue={inputCustomerID || ""}
            className="w-full border p-1 rounded-md "
            placeholder="Customer ID"
          ></input>
          <button
            onClick={handleGenerate}
            className="w-full bg-blue-500 p-1 rounded-md text-primary"
          >
            Auto generate ID
          </button>
        </div>

        <div className="flex max-md:flex-wrap gap-2 items-center text-sm">
          <input
            type="number"
            onChange={handleChange}
            name="customerPhone"
            className="w-full border p-1 rounded-md "
            placeholder="Customer phone number"
          ></input>
        </div>
      </div>

      <table className="w-full mt-2 text-sm">
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
            const itemProduct = productlist.find((p) => p._id === item._id);
            const unavailableStock = itemProduct?.stock === item?.quantity;
            return (
              <tr className="border-b " key={item?._id}>
                <td className="py-2">
                  <div className="px-4">
                    <p></p>
                  </div>
                  <h1 className="font-bold text-sm">{item?.productName}</h1>
                </td>
                <td className="py-2">${item?.price.toFixed(2)}</td>
                <td className="p-2 font-bold">
                  <div className="p-2 flex max-sm:flex-wrap justify-center items-center gap-2 border rounded-md">
                    <button
                      onClick={() => handleDecreasQty(item?._id)}
                      type="button"
                      className="p-2 w-full bg-secondary rounded-md"
                    >
                      -
                    </button>
                    <p className="w-full text-center">{item?.quantity}</p>
                    <button
                      disabled={unavailableStock}
                      onClick={() => handleIncreasQty(item?._id)}
                      type="button"
                      className={`p-2 bg-secondary rounded-md w-full ${
                        unavailableStock ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-2 text-end">
                  {(item?.quantity * item?.price).toFixed(2)}$
                </td>
                <td className="py-2 text-end text-red-500">
                  <button onClick={() => handleRemoveItem(item._id)}>
                    <MdDeleteForever size={22} />
                  </button>
                </td>
              </tr>
            );
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
              <button
                onClick={handlePayment}
                className="py-2 px-4 bg-blue-500 rounded-md text-primary "
              >
                Payment
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* {latestPayment && <Receipt payment={latestPayment} />} */}

    </div>
  );
};

export default OrderList;
