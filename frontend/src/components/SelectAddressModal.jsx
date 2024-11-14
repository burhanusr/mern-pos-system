import Button from "./ui/Button/Button";

export default function SelectAddressModal({
  open,
  onClose,
  data,
  selectedAddress,
  setSelectedAddress,
}) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex w-1/2 flex-col gap-4 rounded-md bg-white p-4 shadow ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <header className="flex gap-2">
          <h2 className="text-md font-bold">Select Address</h2>
        </header>

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col gap-2">
            {data &&
              data.map((address) => (
                <div
                  key={address._id}
                  className="flex items-center gap-4 rounded-md bg-slate-100 pl-4"
                >
                  <input
                    type="radio"
                    name="address"
                    id={`${address._id + address.name}`}
                    value={address._id}
                    checked={selectedAddress?._id === address._id}
                    onChange={() => {
                      setSelectedAddress(address);
                      onClose();
                    }}
                  />
                  <label
                    htmlFor={`${address._id + address.name}`}
                    className="w-full cursor-pointer py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold">{address.name}</p>
                      <p className="text-sm">
                        {`${address?.province}, ${address?.regency}, ${address?.district}, ${address?.village}, ${address?.detail}`}
                      </p>
                    </div>
                  </label>
                </div>
              ))}
          </div>
          <div>
            <Button type="button" size="sm" variant="default" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
