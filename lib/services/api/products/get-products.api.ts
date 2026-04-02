import axiosInstance from "../../config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ApiResponseType, ApiPaginatedResponseType } from "@/lib/types";
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

type GetProductsResponse = ApiPaginatedResponseType<Product>;

const getProducts = async ({
  queryKey,
}: {
  queryKey: readonly [string, { page?: number; limit?: number }];
}) => {
  const [url, params] = queryKey;
  const request = await axiosInstance.get<void, AxiosResponse<GetProductsResponse>>(url, {
    params,
  });
  return request.data;
};

const useGetProductsQuery = (page: number = 1, limit: number = 20) => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: [QueryKeys.PRODUCTS, { page, limit }] as const,
    queryFn: getProducts,
    enabled: !!isAuthenticated,
  });
};

export default useGetProductsQuery;
