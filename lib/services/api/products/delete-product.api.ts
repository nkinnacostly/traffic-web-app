import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, isAxiosError } from "axios";
import { queryClient } from "@/lib/services/config/query-client";
import { QueryKeys } from "../../config/query-keys";
import axiosInstance from "../../config/axios-instance";
import { ApiResponseType } from "@/lib/types";

const deleteProduct = async (id: string): Promise<ApiResponseType<null>> => {
  try {
    const request: AxiosResponse<ApiResponseType<null>> = await axiosInstance.delete(
      `/api/v1/products/${id}`
    );
    return request.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Failed to delete product");
    }
    throw new Error("An unexpected error occurred");
  }
};

const useDeleteProductMutation = () => {
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
    },
  });
};

export default useDeleteProductMutation;
