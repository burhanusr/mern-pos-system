import axiosInstance from "./axiosConfig";

export const getCart = async () => {
  const response = await axiosInstance.get("/api/v1/carts");
  return response.data;
};

export const addCart = async (productId, quantity) => {
  const response = await axiosInstance.post("/api/v1/carts", {
    productId,
    quantity,
  });
  return response.data;
};

export const deleteCart = async (productId, quantity) => {
  const response = await axiosInstance.post("/api/v1/carts/deleteItem", {
    productId,
    quantity,
  });
  return response.data;
};
