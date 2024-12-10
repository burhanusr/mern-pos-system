import axiosInstance from "./axiosConfig";

export const register = async (name, email, password, passwordConfirm) => {
  const response = await axiosInstance.post("/api/v1/auth/register", {
    name,
    email,
    password,
    passwordConfirm,
  });

  return response.data;
};

export const login = async (email, password) => {
  const response = await axiosInstance.post("/api/v1/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const refresh = async () => {
  const response = await axiosInstance.get("/api/v1/auth/refresh");

  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.get("/api/v1/auth/logout");
  return response.data;
};
