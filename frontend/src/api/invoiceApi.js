import axiosInstance from "./axiosConfig";

export const getInvoice = async (orderId) => {
  const response = await axiosInstance.get(`/api/v1/invoice/${orderId}`);
  return response.data;
};
