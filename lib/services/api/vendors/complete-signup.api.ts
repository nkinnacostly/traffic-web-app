import axiosInstance from "../../config/axios-instance";
import { AxiosResponse, isAxiosError } from "axios";
import { ApiResponseType } from "@/lib/types";

export interface CompleteSignupPayload {
  businessName: string;
  physicalStore: boolean;
  physicalStoreAddress: string;
  businessEmail: string;
  businessPhone: string;
  website: string;
  description: string;
  businessHours: string;
  businessCategory: string;
  storeLogo: string;
  storeCoverPhoto: string;
}

export interface CompleteSignupResponseData {
  _id: string;
  businessName: string;
  physicalStore: boolean;
  physicalStoreAddress: string;
  businessEmail: string;
  businessPhone: string;
  website: string;
  description: string;
  businessHours: string;
  businessCategory: string;
  storeLogo: string;
  storeCoverPhoto: string;
  vendorId: string;
  createdAt: string;
  updatedAt: string;
}

type CompleteSignupResponse = ApiResponseType<CompleteSignupResponseData>;

const completeSignup = async (
  data: CompleteSignupPayload,
): Promise<CompleteSignupResponse> => {
  try {
    const request: AxiosResponse<CompleteSignupResponse> =
      await axiosInstance.post("/vendors/complete-signup", data);
    return request.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to complete signup",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export default completeSignup;
