"use client";

import { useAuth } from "@/lib/context/providers/auth-provider";
import useGetProductsQuery from "@/lib/services/api/products/get-products.api";
import ProductCard from "@/components/features/ProductCard";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { data, isLoading, error } = useGetProductsQuery(1, 20);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const products = data?.data?.items || [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">Manage your product inventory</p>
          </div>
          <button
            onClick={() => router.push("/dashboard/products/new")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            + Add Product
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">
              Failed to load products. Please try again.
            </p>
          </div>
        )}

        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No products yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start adding products to your inventory
            </p>
            <button
              onClick={() => router.push("/dashboard/products/new")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {products.length} of {data?.data?.total || 0} products
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {data?.data?.totalPages && data.data.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50">
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page 1 of {data.data.totalPages}
                </span>
                <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50">
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
