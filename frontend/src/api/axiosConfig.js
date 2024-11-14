import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_BASEURL, // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This ensures that cookies are sent with every request
});

export default axiosInstance;
