"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/services/config/query-client";
import useAxiosInterceptor from "@/lib/hooks/use-axios-interceptor";
import { AuthProvider } from "./auth-provider";
import { Toaster } from "sonner";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mount axios interceptors once at the app level
  useAxiosInterceptor();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
