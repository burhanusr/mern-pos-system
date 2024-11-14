import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { getAllDeliveriesUser } from "../api/deliveryAddressApi";
import { createOrder } from "../api/orderApi";
import Cart from "../components/Cart";
import Button from "./../components/ui/Button/Button";
import SelectAddressModal from "../components/SelectAddressModal";
import { useCartContext } from "../hooks/useCartContext";
import { formatRupiah } from "../utils/formatCurrency";

export default function Payment() {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { cart, setIsUpdate } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const address = await getAllDeliveriesUser();
        setAddress(address.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [selectedAddress]);

  async function handlePay() {
    const delivery_fee = 15000;

    if (!selectedAddress) {
      return toast.error("Please select your address first!");
    }

    try {
      const response = await createOrder(delivery_fee, selectedAddress._id);
      setIsUpdate(true);
      navigate(`/invoice/${response.data._id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:px-8">
      <main className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="rounded-md bg-white px-6 py-4 shadow">
            <div>
              <header className="flex gap-1 border-b-2 pb-2">
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                >
                  <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                </svg>
                <h2 className="text-md font-bold">Delivery Address</h2>
              </header>

              <div
                className="group mt-2 flex cursor-pointer items-center justify-between rounded-md px-4 py-2 hover:bg-slate-100"
                onClick={() => setOpen(true)}
              >
                {selectedAddress ? (
                  <div>
                    <p className="text-sm font-semibold">
                      {selectedAddress?.name}
                    </p>
                    <p className="text-sm">
                      {`${selectedAddress?.province}, ${selectedAddress?.regency}, ${selectedAddress?.district}, ${selectedAddress?.village}, ${selectedAddress?.detail}`}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">
                    Please select your address!
                  </p>
                )}

                <svg
                  className="ease size-4 fill-slate-500 transition duration-300 group-hover:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                >
                  <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
                </svg>
              </div>

              <SelectAddressModal
                open={open}
                onClose={() => setOpen(false)}
                data={address}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
            </div>
          </div>

          <div className="rounded-md bg-white p-6 shadow">
            <Cart />
          </div>
        </div>

        <div className="h-fit rounded-md bg-white px-6 py-4 shadow">
          <div>
            <h2 className="text-md mb-4 font-bold">Payment Summary</h2>

            <div className="mb-8 flex flex-col gap-2 rounded-md bg-slate-100 p-4">
              <div className="flex justify-between text-sm">
                <p>Sub Total</p>
                <p>{cart && formatRupiah(cart.totalPrice)}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Delivery Fee</p>
                <p>Rp 15.000</p>
              </div>
              <div className="text-md mt-4 flex justify-between border-t border-slate-300 pt-4 font-semibold">
                <p>Total</p>
                <p>{cart && formatRupiah(cart.totalPrice + 15000)}</p>
              </div>
            </div>

            {cart &&
              (cart.totalPrice > 0 ? (
                <Button size="sm" className="w-full" onClick={handlePay}>
                  Pay Now
                </Button>
              ) : (
                ""
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
