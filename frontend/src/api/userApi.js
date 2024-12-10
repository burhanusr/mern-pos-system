import axiosInstance from "./axiosConfig";

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/api/v1/users/profile");

  return response.data;
};

export const updateCurrentUser = async (name, email) => {
  const response = await axiosInstance.patch("/api/v1/users/profile", {
    name,
    email,
  });

  return response.data;
};
