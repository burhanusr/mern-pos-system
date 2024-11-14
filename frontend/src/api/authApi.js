import axiosInstance from "./axiosConfig";

export const login = async (email, password) => {
  const response = await axiosInstance.post("/api/v1/users/login", {
    email,
    password,
  });
  return response.data;
};

export const register = async (name, email, password, passwordConfirm) => {
  const response = await axiosInstance.post("/api/v1/users/register", {
    name,
    email,
    password,
    passwordConfirm,
  });
  return response.data;
};

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

export const logout = async () => {
  const response = await axiosInstance.get("/api/v1/users/logout");
  return response.data;
};
