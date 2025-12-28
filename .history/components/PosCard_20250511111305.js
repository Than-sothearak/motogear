"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SearchCompoenent from "./SearchComponent";
import { IoCartOutline, IoGrid, IoListSharp } from "react-icons/io5";
import OrderList from "./OrderList";

const PosCard = ({ products }) => {
  const [productlist, setProductlist] = useState(products);
  const [isOpen, setIsOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [customerID, setCustomerID] = useState("");
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on first render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cartItems");

      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, []);
  // Save cart to localStorage when updated
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function generateCustomerID() {
    const date = new Date();
    const datePart = date.toISOString().slice(0, 10).replace(/-/g, ""); // e.g., 20250510
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // e.g., XYZ123
    return `CUST-${datePart}-${randomPart}`;
  }

  const handleGenerate = () => {
    const newID = generateCustomerID();
    setCustomerID(newID);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const totalCartItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <>
      <div className="w-full p-4 bg-primary mt-4 rounded-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center  gap-2 text-primary z-20 sm:hidden p-2  bg-red-500 fixed w-22 top-2 ${
            isOpen ? " rounded-r-xl left-0" : "right-2 rounded-full"
          } `}
        >
          <IoCartOutline size={24} />
          <p className="absolute border border-secondary bg-white text-black text-xs right-0 rounded-full w-4 top-0">
            {totalCartItems()}
          </p>
        </button>
        <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
          <h1 className="max-xl:w-full  text-xl font-bold text-primarytext">
            Point of Sale
          </h1>
          <SearchCompoenent
            placeHolder="Search product..."
            linkPage="/dashboard/pos"
          />
          <div className={`flex gap-2 items-center`}>
            <button
              className={`${isGridView ? "text-blue-500" : ""}`}
              title="Gird view"
              onClick={() => setIsGridView(true)}
            >
              <IoGrid />
            </button>
            <button
              className={`${isGridView ? "" : "text-blue-500"}`}
              title="List view"
              onClick={() => setIsGridView(false)}
            >
              <IoListSharp size={22} />
            </button>
          </div>
        </div>

        {isGridView ? (
          <div className="grid grid-cols-2  xl:grid-cols-3 2xl:grid-cols-5 gap-4">
            {products?.map((product, index) => {
              // const itemInCart = cartItems.find(
              //   (item) => item._id === product._id
              // );
              // const availableStock =
              //   product.stock - (itemInCart?.quantity || 0);
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between border"
              >
                <div className="flex flex-col items-center">
                  {product?.imageUrls?.[0] ? (
                    <Image
                      width={500}
                      height={500}
                      src={product?.imageUrls[0]}
                      alt={product.productName}
                      className="w-24 h-24 object-cover mb-2"
                    />
                  ) : (
                    <Image
                      width={500}
                      height={500}
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                      }
                      alt={product.productName}
                      className="w-24 h-24 object-cover mb-2"
                    />
                  )}

                  <h2 className="text-sm text-center font-semibold truncate w-full max-w-[200px]">
                    {product.productName}
                  </h2>
                  <p className="text-gray-600 text-sm font-bold text-center">
                    Price: ${product.price}
                  </p>
                  <p className="text-gray-600 text-sm text-center">
                    Stock: {availableStock}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  type="button"
                  className="mt-3 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-800"
                >
                  Add to Cart
                </button>
              </div>;
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-2 justify-center">
            {products?.map((product, index) => (
              <div
                key={index}
                className="bg-white gap-4 rounded-lg p-2 flex justify-between items-center border"
              >
                <div className="flex  items-center gap-2 justify-between w-full">
                  {product?.imageUrls?.[0] ? (
                    <Image
                      width={200}
                      height={200}
                      src={product?.imageUrls[0]}
                      alt={product.productName}
                      className="w-8 h-8 object-cover"
                    />
                  ) : (
                    <Image
                      width={200}
                      height={200}
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                      }
                      alt={product.productName}
                      className="w-8 h-8 object-cover mb-2"
                    />
                  )}

                  <div className="flex items-center justify-between  w-full">
                    <h2 className="text-xs">{product.productName}</h2>
                    <div className="flex gap-2">
                      <p className="text-gray-600 text-sm font-bold text-center">
                        Price: ${product.price}
                      </p>
                      <p className="text-gray-600 text-sm text-center">
                        Stock: {product.stock}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-3 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-800"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <OrderList
        isOpen={isOpen}
        customerID={customerID}
        handleGenerate={handleGenerate}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </>
  );
};

export default PosCard;
