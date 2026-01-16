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

  const addProduct = (product, color, size, qty = 1, variantImage) => {
  setCartProducts((prev) => {
    const existing = prev.find(
      (item) =>
        item._id === product._id &&
        item.color === color &&
        item.size === size
    );

    if (existing) {
      return prev.map((item) =>
        item._id === product._id &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
    }

    return [
      ...prev,
      {
        _id: product._id,
        name: product.productName,
        color,
        size,
        price: product.basePrice || 0,
        quantity: qty,
        image: variantImage || product.imageUrls[0]
      },
    ];
  });
};


 const removeProduct = (product, color = null, size = null, qty = null) => {
  setCartProducts((prev) => {
    return prev.reduce((acc, item) => {
      // Match the cart item
      const isMatch =
        item.productId === product._id &&
        (color ? item.color === color : true) &&
        (size ? item.size === size : true);

      if (!isMatch) {
        // Keep non-matching items
        acc.push(item);
      } else if (qty && item.quantity > qty) {
        // Reduce quantity if qty is specified
        acc.push({ ...item, quantity: item.quantity - qty });
      }
      // else: qty >= item.quantity → remove completely
      return acc;
    }, []);
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
