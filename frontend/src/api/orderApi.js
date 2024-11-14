import axiosInstance from "./axiosConfig";

export const createOrder = async (delivery_fee, delivery_address) => {
  const response = await axiosInstance.post("/api/v1/orders", {
    delivery_fee,
    delivery_address,
  });
  return response.data;
};

export const getOrder = async () => {
  const response = await axiosInstance.get("/api/v1/orders");
  return response.data;
};
