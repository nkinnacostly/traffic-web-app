import axiosInstance from "../../config/axios-instance";
import { AxiosResponse, isAxiosError } from "axios";
import { ApiResponseType } from "@/lib/types";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

export interface RegisterResponseData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  interests: string[];
  loginType: string;
  isVerified: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
}

type RegisterResponse = ApiResponseType<RegisterResponseData>;

const register = async (data: RegisterPayload): Promise<RegisterResponse> => {
  try {
    const request: AxiosResponse<RegisterResponse> = await axiosInstance.post(
      "/auth/signup",
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
