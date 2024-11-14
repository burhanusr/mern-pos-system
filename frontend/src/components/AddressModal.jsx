import { useEffect, useState } from "react";

import Button from "./../components/ui/Button/Button";
import { ComboBox } from "./ui/Combobox";
import { addAddress, updateAddress } from "../api/deliveryAddressApi";
import toast from "react-hot-toast";

export default function AddressModal({
  open,
  onClose,
  setSubmit,
  address,
  setAddress,
  region,
  setRegion,
  update,
}) {
  function handleChange(e) {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  }

  function handleClick(name, value) {
    if (name === "provinsi") {
      setRegion({
        ...region,
        kabupaten: null,
        kecamatan: null,
        kelurahan: null,
      });
    }
    setAddress({ ...address, [name]: value.name });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { name, provinsi, kabupaten, kecamatan, kelurahan, detail } = address;
    try {
      await addAddress(name, provinsi, kabupaten, kecamatan, kelurahan, detail);
      setAddress({
        name: "",
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        kelurahan: "",
        detail: "",
      });
      toast.success("Address successfully added!");
      setSubmit();
      onClose();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const { name, provinsi, kabupaten, kecamatan, kelurahan, detail } = address;
    try {
      await updateAddress(
        update,
        name,
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan,
        detail,
      );

      toast.success("Address successfully updated!");
      setSubmit();
      onClose();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex w-1/2 flex-col gap-4 rounded-md bg-white p-4 shadow ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <header className="flex gap-2">
          <h2 className="text-md font-bold">New Address</h2>
        </header>

        <form
          className="relative flex flex-col gap-4 text-sm"
          onSubmit={update ? handleUpdate : handleSubmit}
        >
          <div className="rounded-md bg-slate-100 p-4">
            <input
              type="text"
              placeholder="Nama Lengkap"
              name="name"
              value={address?.name}
              className="w-full bg-transparent focus:outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <ComboBox
              name="Provinsi"
              data={region?.provinsi}
              value={address?.provinsi}
              onChange={handleChange}
              setValue={handleClick}
            />
            <ComboBox
              name="Kabupaten"
              disabled={region?.kabupaten ? false : true}
              data={region?.kabupaten}
              value={address?.kabupaten}
              onChange={handleChange}
              setValue={handleClick}
            />
            <ComboBox
              name="Kecamatan"
              disabled={region?.kecamatan ? false : true}
              data={region?.kecamatan}
              value={address?.kecamatan}
              onChange={handleChange}
              setValue={handleClick}
            />
            <ComboBox
              name="Kelurahan"
              disabled={region?.kelurahan ? false : true}
              data={region?.kelurahan}
              value={address?.kelurahan}
              onChange={handleChange}
              setValue={handleClick}
            />
          </div>

          <div className="rounded-md bg-slate-100 p-4">
            <textarea
              id="detail"
              name="detail"
              placeholder="Detail"
              value={address?.detail}
              onChange={handleChange}
              className="h-full w-full resize-none bg-transparent focus:outline-none"
            ></textarea>
          </div>

          <div className="flex gap-4">
            <Button type="button" size="sm" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {update ? "Update Address" : "Add Address"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
