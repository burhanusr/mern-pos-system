import axiosInstance from "./axiosConfig";

export const getAllCategories = async () => {
  const response = await axiosInstance.get("/api/v1/categories");
  return response.data;
};
