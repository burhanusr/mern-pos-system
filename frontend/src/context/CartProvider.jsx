import { createContext, useEffect, useState } from "react";
import { getCart } from "../api/cartApi";
import { useAuth } from "../hooks/useAuth";

export const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (auth) {
          const carts = await getCart();
          setCart(carts.data);
        }
      } catch (err) {
        if (err.status === 404) {
          setCart(null);
          console.log(err.response.data.message);
        }
      }
    };

    fetchCart();
    setIsUpdate(false);
  }, [isUpdate, auth]);

  return (
    <CartContext.Provider value={{ cart, setCart, setIsUpdate }}>
      {children}
    </CartContext.Provider>
  );
}
