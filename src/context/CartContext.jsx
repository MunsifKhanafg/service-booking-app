import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (service, bookingDetails) => {
    const existingItem = cartItems.find(item => 
      item.service.id === service.id && 
      item.bookingDetails?.date === bookingDetails?.date &&
      item.bookingDetails?.time === bookingDetails?.time
    );

    if (existingItem) {
      toast.info('This service with same booking details is already in cart!');
      return;
    }

    const newItem = {
      id: Date.now(),
      service,
      bookingDetails,
      addedAt: new Date().toISOString()
    };

    setCartItems([...cartItems, newItem]);
    toast.success('Added to cart successfully!');
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    toast.success('Removed from cart!');
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.service.price, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalPrice,
      cartCount: cartItems.length
    }}>
      {children}
    </CartContext.Provider>
  );
};
