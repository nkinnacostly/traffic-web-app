import axiosInstance from "../../config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ApiResponseType } from "@/lib/types";
import { QueryKeys } from "@/lib/services/config/query-keys";
import { useAuth } from "@/lib/context/providers/auth-provider";

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

type GetProductResponse = ApiResponseType<Product>;

const getProduct = async ({
  queryKey,
}: {
  queryKey: readonly [string, string];
}) => {
  const [url, id] = queryKey;
  const request = await axiosInstance.get<void, AxiosResponse<GetProductResponse>>(`${url}/${id}`);
  return request.data;
};

const useGetProductQuery = (id: string) => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: [QueryKeys.PRODUCT, id] as const,
    queryFn: getProduct,
    enabled: !!isAuthenticated && !!id,
  });
};

export default useGetProductQuery;
