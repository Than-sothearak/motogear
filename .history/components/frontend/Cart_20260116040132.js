"use client";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { CartContext } from "../CartContext";
import Image from "next/image";
import { getProductCarts } from "@/actions/cart";
import CheckoutForm from "../CheckoutForm";
import { useSearchParams } from "next/navigation";

const Cart = ({session}) => {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState();
  const [cartCleared, setCartCleared] = useState(false);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");



  function handleClick() {
    setIsOpen((prev) => !prev);
  }
  
  const getProducts = async () => {
    if (cartProducts.length > 0) {
      const results = await getProductCarts(cartProducts);
      setProducts(results);
    } else {
      setProducts([]);
    }
  };
  useEffect(() => {
    getProducts();
  }, [cartProducts]);

  console.log(success)

useEffect(() => {
  if (success === "1" && cartProducts.length > 0) {
    clearCart();
    setProducts([]);
  }
}, []); // ✅ run only once

   let subtotal = 0;
  for (const productId of cartProducts) {
    const price = products?.find((p) => p._id == productId)?.basePrice || 0;
    subtotal += price;
  }
  return (
    <div className="flex">
      {/* Cart Icon */}
      <button onClick={handleClick} className="relative">
        <ShoppingBag />
        {cartProducts.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
            {cartProducts.length}
          </span>
        )}
      </button>

      {/* Drawer */}
      <div
        className={`bg-primary md:w-96 w-full h-full overflow-y-auto transition-transform duration-500 ease-in-out fixed top-0 right-0 z-40 p-4
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={handleClick}>
            <RiCloseLargeLine size={24} />
          </button>
        </div>

        {/* Cart Items */}
        {cartProducts.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            Your cart is empty
          </div>
        ) : (
          <div className="space-y-4">
            {products?.map((item) => (
              <div key={item._id} className="flex gap-3 border-b pb-3">
                {/* Image */}
                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={item.imageUrls[0]}
                    alt={item.imageUrls[0]}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.productName}</h3>
                  <p className="text-sm text-gray-500">
                    ${Number(item.basePrice)}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => removeProduct(item._id, 1)}
                      className="p-1 border rounded"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="text-sm">
                      {cartProducts.filter((id) => (id === item._id)).length}
                    </span>

                    <button
                      onClick={() => addProduct(item._id)}
                      className="p-1 border rounded"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeProduct(item._id)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {cartProducts.length > 0 && (
          <div className="mt-6 border-t pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal}</span>
            </div>

            <CheckoutForm cartProducts={cartProducts} session={session}/>

            <button onClick={clearCart} className="w-full text-sm text-red-500">
              Clear Cart
            </button>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={handleClick}
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
        />
      )}
    </div>
  );
};

export default Cart;
