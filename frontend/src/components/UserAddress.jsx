import toast from "react-hot-toast";
import { useState, useEffect } from "react";

import { deleteAddress } from "../api/deliveryAddressApi";
import {
  getAllDistricts,
  getAllProvinces,
  getAllRegencies,
  getAllVillages,
} from "../api/regionApi";
import Button from "./ui/Button/Button";
import AddressModal from "../components/AddressModal";

export default function UserAddress({ userAddress, setSubmit }) {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(null);
  const [region, setRegion] = useState({
    provinsi: null,
    kabupaten: null,
    kecamatan: null,
    kelurahan: null,
  });
  const [address, setAddress] = useState({
    name: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
    detail: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get region data
        const provinces = await getAllProvinces();
        setRegion({ ...region, provinsi: provinces });

        if (address?.provinsi) {
          let provIndex = region.provinsi.findIndex(
            (province) => province?.name === address?.provinsi,
          );
          const regencies = await getAllRegencies(
            region.provinsi[provIndex]?.id,
          );
          setRegion({ ...region, kabupaten: regencies });
        }

        if (address?.kabupaten && region.kabupaten) {
          let kabIndex = region.kabupaten.findIndex(
            (kab) => kab?.name === address?.kabupaten,
          );
          const districts = await getAllDistricts(
            region.kabupaten[kabIndex]?.id,
          );
          setRegion({ ...region, kecamatan: districts });
        }

        if (address?.kecamatan && region.kecamatan) {
          let kecIndex = region.kecamatan.findIndex(
            (kec) => kec?.name === address?.kecamatan,
          );
          const villages = await getAllVillages(region.kecamatan[kecIndex]?.id);
          setRegion({ ...region, kelurahan: villages });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [address]);

  async function handleDelete(addressId) {
    try {
      await deleteAddress(addressId);
      toast.success("Address successfully deleted!");
      setSubmit();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="mb-4">
        <Button
          size="custom"
          className="px-2 py-1.5 text-sm shadow"
          onClick={() => {
            setOpen(true);
            setAddress({
              name: "",
              provinsi: "",
              kabupaten: "",
              kecamatan: "",
              kelurahan: "",
              detail: "",
            });
            setUpdate(null);
          }}
        >
          <svg
            className="mr-1 size-3 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          Add Address
        </Button>
      </div>

      <div className="flex max-h-96 flex-col gap-4 overflow-y-auto">
        {userAddress &&
          userAddress.map((address) => (
            <div
              key={address?._id}
              className="flex cursor-pointer items-center justify-between rounded-md bg-slate-100 p-4"
            >
              <div>
                <p className="text-sm font-semibold">{address?.name}</p>
                <p className="text-sm">
                  {`${address?.province}, ${address?.regency}, ${address?.district}, ${address?.village}, ${address?.detail}`}
                </p>
              </div>
              <div className="flex gap-2 [&_svg]:size-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="group"
                  onClick={() => handleDelete(address?._id)}
                >
                  <svg
                    className="group-hover:fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </Button>
                <Button
                  onClick={() => {
                    setOpen(true);
                    setAddress({
                      name: address?.name,
                      provinsi: address?.province,
                      kabupaten: address?.regency,
                      kecamatan: address?.district,
                      kelurahan: address?.village,
                      detail: address?.detail,
                    });
                    setUpdate(address?._id);
                  }}
                >
                  <svg
                    className="fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                </Button>
              </div>
            </div>
          ))}
      </div>

      <AddressModal
        open={open}
        onClose={() => setOpen(false)}
        setSubmit={() => setSubmit((prevState) => !prevState)}
        address={address}
        setAddress={setAddress}
        region={region}
        setRegion={setRegion}
        update={update}
      />
    </>
  );
}
