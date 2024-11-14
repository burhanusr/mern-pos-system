import axios from "axios";

export const getAllProvinces = async () => {
  const response = await axios.get(
    "/api/api-wilayah-indonesia/api/provinces.json",
  );
  return response.data;
};

export const getAllRegencies = async (provinceId) => {
  const response = await axios.get(
    `/api/api-wilayah-indonesia/api/regencies/${provinceId}.json`,
  );
  return response.data;
};

export const getAllDistricts = async (regencyId) => {
  const response = await axios.get(
    `/api/api-wilayah-indonesia/api/districts/${regencyId}.json`,
  );
  return response.data;
};

export const getAllVillages = async (districtId) => {
  const response = await axios.get(
    `/api/api-wilayah-indonesia/api/villages/${districtId}.json`,
  );
  return response.data;
};
