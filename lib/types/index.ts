export interface ApiResponseType<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type ApiPaginatedResponseType<T> = ApiResponseType<PaginatedResponse<T>>;
