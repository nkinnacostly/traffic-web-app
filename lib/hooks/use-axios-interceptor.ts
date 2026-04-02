import axiosInstance from "../services/config/axios-instance";
import { useEffect } from "react";
import useToastAlert from "./use-toast-alert";

const useAxiosInterceptor = () => {
  const { handleErrorToast } = useToastAlert();

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Token refresh logic (if applicable) goes here — before toast
        // if (error.response?.status === 401 && !originalRequest._retry) { ... }

        const errorMessage =
          error.response?.data?.data?.message ||
          error.response?.data?.message ||
          error.response?.data?.detail;

        const shouldShowToast = errorMessage && !originalRequest?._retry;

        if (shouldShowToast) {
          handleErrorToast({ description: errorMessage });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};

export default useAxiosInterceptor;
