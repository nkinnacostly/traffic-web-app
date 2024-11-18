import axios, { AxiosRequestConfig } from "axios";
import Cookie from "js-cookie";

// import { storage } from "./storage";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const client = axios.create({
  baseURL: BASE_URL,
});

export const request = async (options: AxiosRequestConfig<unknown>) => {
  const session_id = Cookie.get("__session");
  client.defaults.headers.common.Authorization = `Bearer ${session_id}`;

  const onSuccess = (response: { data: unknown }) => {
    return response.data;
  };

  const onError = (error: { response: { data: unknown } }) => {
    return Promise.reject(error.response?.data);
  };

  return client(options).then(onSuccess).catch(onError);
};
