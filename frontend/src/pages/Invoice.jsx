import { useEffect, useState } from "react";
import { getInvoice } from "../api/invoiceApi";
import { useParams } from "react-router-dom";
import { formatRupiah } from "../utils/formatCurrency";

export default function Invoice() {
  const [invoice, setInvoice] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInvoice(id);
        setInvoice(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:px-8">
      <main className="rounded-md bg-white p-4">
        <div className="text-md border-b border-slate-200 px-4 py-2 font-bold">
          <h3>Invoice #{invoice?.order.order_number}</h3>
        </div>

        <div className="flex justify-between gap-4 border-b border-slate-200 p-4 text-sm">
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="font-bold">Status</h4>
              <p>{invoice?.payment_status}</p>
            </div>
            <div>
              <h4 className="font-bold">Billed To</h4>
              <p>{invoice?.user.name}</p>
              <p className="text-xs">{invoice?.user.email}</p>
              <p className="mt-2">{`${invoice?.delivery_address.province}, ${invoice?.delivery_address.regency}, ${invoice?.delivery_address.district}, ${invoice?.delivery_address.village}, ${invoice?.delivery_address.detail}`}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="font-bold">Curency</h4>
              <p>IDR - Indonesian Rupiah</p>
            </div>

            <div>
              <h4 className="font-bold">Payment To</h4>
              <p>Burhanu Sultan Ramadan</p>
              <p className="text-xs">b@example.com</p>
              <p>BSI</p>
              <p>xxxxx-xxxx-xxx4334</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4 text-sm">
          <div className="flex items-center justify-between">
            <p className="font-bold">Sub Total</p>
            <p>{invoice && formatRupiah(invoice?.sub_total)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold">Delivery Fee</p>
            <p>{invoice && formatRupiah(invoice?.delivery_fee)}</p>
          </div>
          <div className="flex items-center justify-between font-bold">
            <p>Total Amount</p>
            <p>{invoice && formatRupiah(invoice?.total)}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
