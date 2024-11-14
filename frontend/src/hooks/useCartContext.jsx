import { useContext } from "react";
import { CartContext } from "../context/cartContext";

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw Error("useCartContext must be used inside an AuthContextProvider");
  }

  return context;
}
