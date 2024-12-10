import CartItem from "./CartItem";

import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <header className="flex gap-1">
        <svg
          className="size-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
        </svg>
        <h2 className="text-md font-bold">Current Order</h2>
      </header>

      <div className="cart-container mt-4 flex max-h-80 flex-col gap-4 overflow-y-auto px-4 py-2">
        {cart &&
          cart.items.map((item, index) => (
            <CartItem
              key={cart._id + index}
              productId={item.product._id}
              name={item.product.name}
              price={item.product.price}
              imageURL={item.product.imageUrl}
              quantity={item.quantity}
            />
          ))}
      </div>
    </div>
  );
}
