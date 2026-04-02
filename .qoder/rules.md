# Qoder Rules — Vendor Ecom Platform (Next.js)

> These rules define architecture, patterns, conventions, and security standards for this project.
> Study the full codebase before implementing anything. Understand structure first, then act.

---

## 1. PROJECT CONTEXT

This is a **Next.js vendor e-commerce platform**. Vendors log in, view a dashboard with stats, manage products (upload, edit, delete), and perform other CRUD operations. The stack is:

- **Framework**: Next.js (App Router)
- **API Layer**: Axios with a shared instance + interceptors
- **Server State**: TanStack React Query v5
- **Forms**: React Hook Form + Zod
- **Auth**: Token-based (JWT stored securely, injected via Axios request interceptor)
- **Types**: Strict TypeScript throughout — no `any`, no implicit types

---

## 2. FOLDER STRUCTURE

Always follow and preserve this structure. Do not invent new top-level directories.

```
src/
├── app/                        # Next.js App Router pages
│   ├── (auth)/                 # Auth group: login, register
│   ├── (dashboard)/            # Protected dashboard routes
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Dashboard overview/stats
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   └── ...
├── components/
│   ├── ui/                     # Primitive/shared UI components
│   └── features/               # Feature-specific components (ProductCard, etc.)
├── lib/
│   ├── services/
│   │   ├── config/
│   │   │   ├── axios-instance.ts
│   │   │   ├── query-keys.ts
│   │   │   └── query-client.ts
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── login.api.ts
│   │       │   └── register.api.ts
│   │       ├── profile/
│   │       │   ├── get-profile.api.ts
│   │       │   └── update-profile.api.ts
│   │       └── products/
│   │           ├── get-products.api.ts
│   │           ├── get-product.api.ts
│   │           ├── create-product.api.ts
│   │           ├── update-product.api.ts
│   │           └── delete-product.api.ts
│   ├── context/
│   │   └── providers/
│   │       ├── global-provider.tsx
│   │       └── auth-provider/
│   │           ├── index.tsx
│   │           └── config.ts
│   ├── hooks/
│   │   ├── use-axios-interceptor.ts
│   │   └── use-toast-alert.ts
│   ├── constants/
│   │   └── index.ts
│   └── types/
│       └── index.ts
```

---

## 3. AXIOS INSTANCE — RULES

**File**: `src/lib/services/config/axios-instance.ts`

```typescript
import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  withCredentials: true, // required if backend uses cookies for CSRF
});

// REQUEST INTERCEPTOR — inject auth token
axiosInstance.interceptors.request.use(async (config) => {
  // In Next.js: read from localStorage or a cookie (NOT SecureStore — that's Expo)
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
```

**Rules:**
- NEVER use `SecureStore` — that is Expo/React Native only. In Next.js, use `localStorage` or `httpOnly cookies`.
- NEVER hardcode base URLs. Always use `process.env.NEXT_PUBLIC_API_URL`.
- NEVER instantiate a new axios instance in any other file. Always import from this config.
- The request interceptor must be async — token reads may be async in future implementations.
- Always add `withCredentials: true` to support cookie-based auth flows.

---

## 4. RESPONSE INTERCEPTOR (Hook) — RULES

**File**: `src/lib/hooks/use-axios-interceptor.ts`

```typescript
import axiosInstance from "../services/config/axios-instance";
import { useEffect } from "react";
import useToastAlert from "./use-toast-alert";

const useAxiosInterceptor = () => {
  const { handleErrorToast } = useToastAlert();

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Token refresh logic (if applicable) goes here — before toast
        // if (error.response?.status === 401 && !originalRequest._retry) { ... }

        const errorMessage =
          error.response?.data?.data?.message ||
          error.response?.data?.message ||
          error.response?.data?.detail;

        const shouldShowToast = errorMessage && !originalRequest?._retry;

        if (shouldShowToast) {
          handleErrorToast({ description: errorMessage });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};

export default useAxiosInterceptor;
```

**Rules:**
- Mount `useAxiosInterceptor` ONCE — in the root layout or global provider. Never call it in individual pages or feature components.
- Always eject interceptors on cleanup to prevent memory leaks and duplicate handlers.
- Error message resolution priority: `data.data.message` → `data.message` → `data.detail` — preserve this chain exactly.
- If token refresh (401 handling) is added later, it must be placed BEFORE the toast block and must use `_retry` flag to prevent infinite loops.
- Do NOT show toast for retried requests (`_retry === true`).

---

## 5. REACT QUERY — RULES

### 5a. Query Keys

**File**: `src/lib/services/config/query-keys.ts`

```typescript
export enum QueryKeys {
  PROFILE = "/api/v1/users/profile",
  PRODUCTS = "/api/v1/products",
  PRODUCT = "/api/v1/products", // used with dynamic segment
  DASHBOARD_STATS = "/api/v1/dashboard/stats",
  // Add new keys here — use the actual API path as the key value
}
```

**Rules:**
- Query keys MUST match the actual API endpoint path. This enables the query function to use the key as the URL directly (see GET pattern below).
- NEVER use plain strings as query keys inline in hooks. Always reference `QueryKeys` enum.
- For parameterized queries, key arrays must include the param: `[QueryKeys.PRODUCT, id]`.

### 5b. Query Client

**File**: `src/lib/services/config/query-client.ts`

```typescript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,       // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

**Rules:**
- Export a SINGLE `queryClient` instance. Never instantiate `new QueryClient()` elsewhere.
- Import this in the global provider and pass to `<QueryClientProvider>`.
- `staleTime` of 5 minutes is the default. Override per-query when data is time-sensitive (e.g., dashboard stats).

### 5c. Global Provider

**File**: `src/lib/context/providers/global-provider.tsx`

```typescript
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/services/config/query-client";

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
```

**Rules:**
- Always add `ReactQueryDevtools` in development only — never in production.
- Wrap the root `layout.tsx` with this provider.

---

## 6. API FILE PATTERNS

### 6a. GET Request Pattern

```typescript
import axiosInstance from "../../config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ApiResponseType } from "@/types";
import { QueryKeys } from "@/lib/services/config/query-keys";
import { useAuthContext } from "@/lib/context/providers/auth-provider/config";

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

type GetProductsResponse = ApiResponseType<Product[]>;

const getProducts = async ({ queryKey }: { queryKey: readonly [string] }) => {
  const url = queryKey[0];
  const request = await axiosInstance.get<void, AxiosResponse<GetProductsResponse>>(url);
  return request.data;
};

const useGetProductsQuery = () => {
  const context = useAuthContext();
  return useQuery({
    queryKey: [QueryKeys.PRODUCTS] as const,
    queryFn: getProducts,
    enabled: !!context?.token,
  });
};

export default useGetProductsQuery;
```

### 6b. GET Single Resource (Dynamic)

```typescript
const getProduct = async ({ queryKey }: { queryKey: readonly [string, string] }) => {
  const [url, id] = queryKey;
  const request = await axiosInstance.get<void, AxiosResponse<ApiResponseType<Product>>>(`${url}/${id}`);
  return request.data;
};

const useGetProductQuery = (id: string) => {
  const context = useAuthContext();
  return useQuery({
    queryKey: [QueryKeys.PRODUCT, id] as const,
    queryFn: getProduct,
    enabled: !!context?.token && !!id,
  });
};
```

### 6c. POST / CREATE Mutation Pattern

```typescript
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, isAxiosError } from "axios";
import { queryClient } from "@/lib/services/config/query-client";
import { QueryKeys } from "../../config/query-keys";

export interface CreateProductPayload {
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  description?: string;
}

const createProduct = async (data: CreateProductPayload): Promise<ApiResponseType<Product>> => {
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
```

### 6d. PUT / UPDATE Mutation Pattern

```typescript
const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<CreateProductPayload>;
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
```

### 6e. DELETE Mutation Pattern

```typescript
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
```

**Rules for all API files:**
- One API hook per file. File name format: `[verb]-[resource].api.ts`.
- Always define the payload interface in the same file. Export it — other files (forms) will import it.
- NEVER use `useQueryClient()` hook inside mutations — import the singleton `queryClient` directly (as done in the existing codebase).
- Always use `isAxiosError` guard before accessing `error.response`.
- Always invalidate related queries in `onSuccess`. For updates/deletes, invalidate both the collection AND the individual item.
- Always type `AxiosResponse<ApiResponseType<T>>` — never use raw `any` or untyped responses.

---

## 7. GLOBAL TYPES

**File**: `src/lib/types/index.ts`

```typescript
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
```

**Rules:**
- `ApiResponseType<T>` is the single wrapper for ALL API responses. Never inline response shapes.
- For paginated endpoints, use `ApiPaginatedResponseType<T>`.
- All interfaces must be exported. Never use `type` for API response shapes — use `interface`.

---

## 8. REACT HOOK FORM + ZOD — RULES

### Pattern

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useCreateProductMutation from "@/lib/services/api/products/create-product.api";
import type { CreateProductPayload } from "@/lib/services/api/products/create-product.api";

const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number({ invalid_type_error: "Price must be a number" }).positive("Price must be positive"),
  stock: z.number({ invalid_type_error: "Stock must be a number" }).int().min(0),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional(),
});

type CreateProductFormValues = z.infer<typeof createProductSchema>;

const CreateProductForm = () => {
  const { mutate, isPending, isError } = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = (values: CreateProductFormValues) => {
    mutate(values as CreateProductPayload, {
      onSuccess: () => {
        reset();
        // show success toast here
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* fields */}
    </form>
  );
};
```

**Rules:**
- Every form MUST have a Zod schema. No form validation without it.
- Schema lives in the same file as the form component. If reused, extract to `src/lib/schemas/[resource].schema.ts`.
- `type FormValues = z.infer<typeof schema>` — always derive types from schema, never write them separately.
- Import the payload interface from the `.api.ts` file and cast `values as PayloadType` to keep form and API types in sync.
- Use `isPending` (not `isLoading`) — React Query v5 naming.
- Always call `reset()` on successful create operations.
- NEVER put API calls directly inside `onSubmit`. Always use the mutation hook.

---

## 9. SECURITY RULES

- NEVER log tokens, user PII, or API keys to console — not even in development.
- NEVER store tokens in `sessionStorage` — use `localStorage` (short-lived) or `httpOnly cookies` (preferred for production).
- ALWAYS sanitize user input before sending to API — Zod schemas handle this; do not bypass them.
- NEVER expose `process.env` server-side secrets in client components. Only `NEXT_PUBLIC_` prefixed vars are allowed on the client.
- All routes under `(dashboard)/` MUST be protected via middleware or layout-level auth checks.
- File uploads (product images): validate file type and size on the client BEFORE uploading. Max 5MB, types: `image/jpeg`, `image/png`, `image/webp` only.
- NEVER construct API URLs with raw string concatenation from user input — always use structured params.

---

## 10. NEXT.JS APP ROUTER RULES

- ALL components that use hooks (`useState`, `useEffect`, query hooks, form hooks) MUST have `"use client"` at the top.
- Server components fetch data directly via `fetch()` with `cache` options — do NOT use React Query in server components.
- Use React Query ONLY in client components.
- Protect the `(dashboard)` route group with `middleware.ts`:

```typescript
// middleware.ts (root of project)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboard && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

---

## 11. NAMING CONVENTIONS

| Thing | Convention | Example |
|---|---|---|
| API hook files | `[verb]-[resource].api.ts` | `get-products.api.ts` |
| Component files | PascalCase `.tsx` | `ProductCard.tsx` |
| Hook files | `use-[name].ts` | `use-toast-alert.ts` |
| Schema files | `[resource].schema.ts` | `product.schema.ts` |
| Interfaces | PascalCase, no `I` prefix | `UserProfile`, `Product` |
| Enums | PascalCase | `QueryKeys`, `PAYMENT_PLAN` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_FILE_SIZE` |
| Route folders | kebab-case | `product-details/` |

---

## 12. PROHIBITED PATTERNS

- ❌ `axios.get(...)` — always use `axiosInstance`
- ❌ `new QueryClient()` outside of `query-client.ts`
- ❌ `useQueryClient()` inside mutation files — use imported singleton
- ❌ `any` type — use proper generics or `unknown`
- ❌ Inline fetch calls inside components — always use a query/mutation hook
- ❌ Multiple interceptor setups — only `use-axios-interceptor.ts` registers them
- ❌ `SecureStore` — this is not Expo; use web-compatible token storage
- ❌ Skipping Zod validation on forms — all forms must have schemas
- ❌ Direct `localStorage` access in server components — guard with `typeof window !== "undefined"`
- ❌ Hardcoded API endpoints outside of `QueryKeys` enum

---

## 13. INSTALLATION COMMANDS

```bash
# Core dependencies
npm install axios @tanstack/react-query @tanstack/react-query-devtools
npm install react-hook-form @hookform/resolvers zod

# If not already installed
npm install -D typescript @types/node @types/react
```

---

## 14. WHEN GENERATING NEW FEATURES

Before generating any code, Qoder must:

1. Read the existing file in the relevant feature folder if it exists.
2. Match the exact import paths used in the project (check `tsconfig.json` for path aliases like `@/`).
3. Follow the GET/POST/PUT/DELETE patterns defined in Section 6.
4. Generate in this order: **types → api file → form schema → component**.
5. Never generate a form without a mutation hook. Never generate a mutation without query invalidation.
6. After generating, verify: are all imports resolvable? Are all types explicit? Is error handling present?
