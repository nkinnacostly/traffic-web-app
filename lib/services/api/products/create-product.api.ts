import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, isAxiosError } from "axios";
import { queryClient } from "@/lib/services/config/query-client";
import { QueryKeys } from "../../config/query-keys";
import axiosInstance from "../../config/axios-instance";
import { ApiResponseType } from "@/lib/types";

export interface CreateProductPayload {
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const createProduct = async (
  data: CreateProductPayload
): Promise<ApiResponseType<Product>> => {
  try {
    const request: AxiosResponse<ApiResponseType<Product>> = await axiosInstance.post(
      "/api/v1/products",
      data
    );
    return request.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Failed to create product");
    }
    throw new Error("An unexpected error occurred");
  }
};

const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
    },
  });
};

export default useCreateProductMutation;
