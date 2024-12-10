import { createContext, useEffect, useLayoutEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { refresh } from "../api/authApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await refresh();
        setAuth(response.data);
      } catch {
        setAuth(null);
      } finally {
        setLoading(false); // Loading is complete
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && auth?.accessToken
          ? `Bearer ${auth?.accessToken}`
          : config.headers.Authorization;

      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [auth]);

  useLayoutEffect(() => {
    const refreshInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        console.log("In Refresh", originalRequest);

        if (error.response.status === 403) {
          console.log("JWT Expired");
          try {
            const response = await refresh();
            const currentUser = response.data;

            setAuth(currentUser);
            originalRequest.headers.Authorization = `Bearer ${currentUser?.accessToken}`;
            originalRequest._retry = true;

            return axiosInstance(originalRequest);
          } catch {
            setAuth(null);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
