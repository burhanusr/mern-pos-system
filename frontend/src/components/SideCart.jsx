import { Link } from "react-router-dom";

import { useCartContext } from "../hooks/useCartContext";
import { formatRupiah } from "../utils/formatCurrency";
import { buttonVariants } from "./ui/Button/buttonVariants";
import Cart from "./Cart";

export default function SideCart() {
  const { cart } = useCartContext();

  return (
    <div className="fixed right-[max(0px,calc(50%-43rem))] top-24 hidden xl:block">
      <div className="w-96 rounded-md bg-white px-4 py-6">
        <Cart />
        <div>
          <div className="text-md mb-4 mt-16 flex items-center justify-between rounded-md bg-slate-200 px-4 py-2 font-semibold">
            <p>Total</p>
            <p>{cart && formatRupiah(cart.totalPrice)}</p>
          </div>
          {cart && cart.totalPrice > 0 && (
            <Link
              to="/payment"
              className={`w-full ${buttonVariants({ size: "sm" })}`}
            >
              Continue to Payment
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
