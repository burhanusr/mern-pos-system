import { Fragment, useEffect, useState } from "react";
import Button from "./ui/Button/Button";
import { formatRupiah } from "../utils/formatCurrency";
import InvoiceModal from "./InvoiceModal";

export default function UserOrders({ orders }) {
  const [order, setOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <Fragment key={order._id}>
                <tr className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-slate-100 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    #{order.order_number}
                  </th>
                  <td className="px-6 py-4">
                    {formatRupiah(order.totalPrice)}
                  </td>
                  {/*TODO: update payment status */}
                  <td className="px-6 py-2">{order.status}</td>
                  <td className="flex items-center justify-between px-6 py-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setOpen(true);
                        setOrder(order);
                      }}
                    >
                      Invoice
                    </Button>
                    <div onClick={() => toggleDropdown(order?._id)}>
                      <svg
                        className={`ease size-6 shrink-0 fill-black transition duration-200 ${activeDropdown === order?._id ? "rotate-180" : ""}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                      >
                        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                      </svg>
                    </div>
                  </td>
                </tr>
                <tr
                  className={`${activeDropdown === order?._id ? "" : "hidden"}`}
                >
                  <td colSpan="4">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Total Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order &&
                            order?.order_items.map((item) => (
                              <tr
                                key={`${order?._id + item?._id}`}
                                className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                              >
                                <th
                                  scope="row"
                                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                >
                                  {item?.name}
                                </th>
                                <td className="px-6 py-4"> {item?.quantity}</td>
                                <td className="px-6 py-4">
                                  {formatRupiah(item?.price)}
                                </td>
                                <td className="px-6 py-4">
                                  {formatRupiah(item?.price * item?.quantity)}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </Fragment>
            ))}
        </tbody>
      </table>
      <InvoiceModal open={open} onClose={() => setOpen(false)} data={order} />
    </div>
  );
}
