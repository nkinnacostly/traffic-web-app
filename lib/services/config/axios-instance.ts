import axios from "axios";

// Use relative path to leverage Next.js rewrites (avoids CORS)
export const baseURL = "/api";

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
