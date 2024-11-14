import axiosInstance from "./axiosConfig";

export const getAllDeliveriesUser = async () => {
  const response = await axiosInstance.get("/api/v1/users/address");
  return response.data;
};

export const addAddress = async (
  name,
  province,
  regency,
  district,
  village,
  detail,
) => {
  const response = await axiosInstance.post("/api/v1/deliveries", {
    name,
    province,
    regency,
    district,
    village,
    detail,
  });
  return response.data;
};

export const updateAddress = async (
  addressId,
  name,
  province,
  regency,
  district,
  village,
  detail,
) => {
  const response = await axiosInstance.patch(
    `/api/v1/deliveries/${addressId}`,
    {
      name,
      province,
      regency,
      district,
      village,
      detail,
    },
  );
  return response.data;
};

export const deleteAddress = async (id) => {
  const response = await axiosInstance.delete(`/api/v1/deliveries/${id}`);
  return response.data;
};
