import axiosInstance from "../../config/axios-instance";
import { AxiosResponse, isAxiosError } from "axios";
import { ApiResponseType } from "@/lib/types";

export interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
}

export interface RegisterResponseData {
  user: {
    id: string;
    fullname: string;
    email: string;
  };
}

type RegisterResponse = ApiResponseType<RegisterResponseData>;

const register = async (data: RegisterPayload): Promise<RegisterResponse> => {
  try {
    const request: AxiosResponse<RegisterResponse> = await axiosInstance.post(
      "/api/v1/auth/register",
      data
    );
    return request.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Failed to register");
    }
    throw new Error("An unexpected error occurred");
  }
};

export default register;
