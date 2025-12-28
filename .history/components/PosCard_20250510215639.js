"use client";
import Image from "next/image";
import React, { useState } from "react";
import SearchCompoenent from "./SearchComponent";
import { MdMenuOpen } from "react-icons/md";

const PosCard = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="w-full p-4 bg-primary mt-4 rounded-lg">
        <button onClick={() => setIsOpen(!isOpen)} className={`flex items-center  gap-2 text-primary z-50 sm:hidden p-2  bg-red-500 fixed w-22 top-0  ${isOpen ? 'left-0 rounded-r-xl' : 'right-0 rounded-l-xl'}`}>
          <MdMenuOpen />
          Order list
        </button>
        <div className="flex justify-between items-center mb-4">
          <h1 className="max-xl:w-full max-md:text-sm text-xl font-bold text-primarytext">
            Point of Sale
          </h1>
          <SearchCompoenent
            placeHolder="Search product..."
            linkPage="/dashboard/pos"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {products.map((product, index) => (
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
                  Stock: {product.stock}
                </p>
              </div>

              <button className="mt-3 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-800">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={`bg-primary max-lg:h-screen p-4 w-80 max-lg:fixed
         top-0 left-0 z-40 transform transition-transform  duration-700 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0  max-sm:w-full`}>
        <h1 className="text-xl font-bold text-primarytext">Order list</h1>
        <div className="h-screen "></div>
      </div>
    </>
  );
};

export default PosCard;
