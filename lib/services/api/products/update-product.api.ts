import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, isAxiosError } from "axios";
import { queryClient } from "@/lib/services/config/query-client";
import { QueryKeys } from "../../config/query-keys";
import axiosInstance from "../../config/axios-instance";
import { ApiResponseType } from "@/lib/types";

export interface UpdateProductPayload {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
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

const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateProductPayload;
}): Promise<ApiResponseType<Product>> => {
  try {
    const request: AxiosResponse<ApiResponseType<Product>> = await axiosInstance.put(
      `/api/v1/products/${id}`,
      data
    );
    return request.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Failed to update product");
    }
    throw new Error("An unexpected error occurred");
  }
};

const useUpdateProductMutation = () => {
  return useMutation({
    mutationFn: updateProduct,
    onSuccess(_, variables) {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCT, variables.id] });
    },
  });
};

export default useUpdateProductMutation;
