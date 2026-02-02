import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContexter = createContext();

function CartContext({ children }) {
  const [cart, setcart] = useState(()=>{
    const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
  });
    const notify=()=>{
    toast("Item added to cart.")
  }
    useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  const addtoCart = (product) => {
    setcart((prev) => {
      notify()
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p._id === product._id
            ? {
                ...p,
                quantity: p.quantity + 1,
                total: (p.quantity + 1) * Number(p.price),
              }
            : p
        );
      } else {
        return [...prev, { ...product, quantity: 1, total: Number(product.price) }];
      }
      
    });
  };

  const removecart = (id) => {
    setcart((prev) => prev.filter((item) => item._id !== id));
  };

    const updateQuantity = (id, newQty) => {
    setcart((prev) =>
      prev.map((p) =>
        p._id === id
          ? { ...p, quantity: newQty, total: newQty * Number(p.price) }
          : p
      )
    );
  };

  return (
    <CartContexter.Provider value={{ cart, addtoCart, removecart,updateQuantity }}>
      {children}
    </CartContexter.Provider>
  );
}
export const usecart = () => useContext(CartContexter);

export default CartContext;
