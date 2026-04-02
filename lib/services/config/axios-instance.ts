import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  withCredentials: true, // required if backend uses cookies for CSRF
});

// REQUEST INTERCEPTOR — inject auth token
axiosInstance.interceptors.request.use(async (config) => {
  // In Next.js: read from localStorage or a cookie (NOT SecureStore — that's Expo)
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
