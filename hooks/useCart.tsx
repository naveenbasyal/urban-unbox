"use client";
import { createContext, useContext, useEffect, useState } from "react";

type CartContextType = {
  cartTotalItems: number;
  cartItems: any[];
  cartTotalPrice: number;
  handleAddToCart: (
    product: any,
    quantity: number,
    image: string,
    color: string
  ) => void;
  handleRemoveFromCart: (productId: string) => void;
  handleIncreaseQuanity: (productId: string) => void;
  handleDecreaseQuanity: (productId: string) => void;
};

export const cartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
    color: string;
    quantity: number;
  };
  const [cartItems, setCartItems] = useState<Product[]>([]);
  let cartTotalItems = cartItems?.length;
  let cartTotalPrice = cartItems?.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );

  const handleAddToCart = (
    product: Product,
    quantity: number,
    image: string,
    color: string
  ) => {
    setCartItems([...cartItems, { ...product, quantity, image, color }]);
  };
  const handleRemoveFromCart = (product: any) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCartItems);
  };

  const handleIncreaseQuanity = (product: any) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };
  const handleDecreaseQuanity = (product: any) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };
  useEffect(() => {
    cartTotalItems = cartItems.length;
  }, [cartItems]);

  return (
    <cartContext.Provider
      value={{
        cartTotalItems,
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        handleDecreaseQuanity,
        handleIncreaseQuanity,
        cartTotalPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
