import axiosInstance from "../../config/axios-instance";
import { AxiosResponse, isAxiosError } from "axios";
import { ApiResponseType } from "@/lib/types";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

type LoginResponse = ApiResponseType<LoginResponseData>;

const login = async (data: LoginPayload): Promise<LoginResponse> => {
  try {
    const request: AxiosResponse<LoginResponse> = await axiosInstance.post(
      "/api/v1/auth/login",
      data
    );
    return request.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Failed to login");
    }
    throw new Error("An unexpected error occurred");
  }
};

export default login;
