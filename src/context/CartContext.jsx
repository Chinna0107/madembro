import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size && i.color === item.color);
      if (existing) {
        return prev.map(i =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.size === size)));
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) return removeFromCart(id, size);
    setCart(prev => prev.map(i => i.id === id && i.size === size ? { ...i, quantity } : i));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, cartItems: cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
