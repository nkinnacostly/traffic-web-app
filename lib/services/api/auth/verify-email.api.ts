import axiosInstance from "../../config/axios-instance";
import { AxiosResponse, isAxiosError } from "axios";
import { ApiResponseType } from "@/lib/types";

export interface VerifyEmailPayload {
  token: string;
}

export interface VerifyEmailResponseData {
  user: {
    id: string;
    email: string;
    isVerified: boolean;
  };
}

type VerifyEmailResponse = ApiResponseType<VerifyEmailResponseData>;

const verifyEmail = async (data: VerifyEmailPayload): Promise<VerifyEmailResponse> => {
  try {
    const request: AxiosResponse<VerifyEmailResponse> = await axiosInstance.post(
      "/api/v1/auth/verify-email",
      data
    );
    return request.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Failed to verify email");
    }
    throw new Error("An unexpected error occurred");
  }
};

export default verifyEmail;
