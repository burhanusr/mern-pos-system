import { formatRupiah } from "../utils/formatCurrency";

export default function InvoiceModal({ open, onClose, data }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex w-1/2 flex-col gap-4 rounded-md bg-white p-4 text-black shadow ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <div className="text-md flex items-center justify-between border-b border-slate-200 px-4 py-2 font-bold">
          <h3>Invoice #{data?.order_number}</h3>
          <div className="group cursor-pointer" onClick={onClose}>
            <svg
              className="ease size-6 shrink-0 fill-black transition duration-300 group-hover:rotate-180 group-hover:fill-slate-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </div>
        </div>

        <div className="flex justify-between gap-4 border-b border-slate-200 p-4 text-sm">
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="font-bold">Status</h4>
              <p>{data?.status}</p>
            </div>
            <div>
              <h4 className="font-bold">Billed To</h4>
              <p>{data?.user.name}</p>
              <p className="text-xs">{data?.user.email}</p>
              <p className="mt-2">{`${data?.delivery_address.province}, ${data?.delivery_address.regency}, ${data?.delivery_address.district}, ${data?.delivery_address.village}, ${data?.delivery_address.detail}`}</p>
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
            <p>{data && formatRupiah(data?.totalPrice)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold">Delivery Fee</p>
            <p>{data && formatRupiah(data?.delivery_fee)}</p>
          </div>
          <div className="flex items-center justify-between font-bold">
            <p>Total Amount</p>
            <p>{data && formatRupiah(data?.totalPrice + data?.delivery_fee)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
