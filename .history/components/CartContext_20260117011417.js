"use client";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [inputs, setInput] = useState("");
  const [loaded, setLoaded] = useState(false); // ⭐ NEW
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  function clearCart() {
    setCartProducts([]);
  }

  // ⭐ Load localStorage ONCE
  useEffect(() => {
    if (ls) {
      const storedCart = ls.getItem("cart");
      setCartProducts(storedCart ? JSON.parse(storedCart) : []);
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    ls?.setItem("cart", JSON.stringify(cartProducts || [])); // never null
  }, [cartProducts, loaded]);

  const addProduct = (product, color, size, qty = 1) => {
  setCartProducts((prev) => {
    const existing = prev.find(
      (item) =>
        item.productId === product._id &&
        item.color === color &&
        item.size === size
    );

    if (existing) {
      return prev.map((item) =>
        item.productId === product._id &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
    }

    return [
      ...prev,
      {
        productId: product._id,
        name: product.name,
        color,
        size,
        price: product.price,
        quantity: qty,
      },
    ];
  });
};


  const removeProduct = (productId) => {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
    toast.success("Product removed from cart.");
  };


  const inputSearch = (value) => {
    setInput(value);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProduct,
        removeProduct,
        clearCart,
        inputSearch,
        inputs,
        setCartProducts
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
