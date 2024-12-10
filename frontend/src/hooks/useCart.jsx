import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw Error("useCart must be used inside an CartProvider");
  }

  return context;
}
