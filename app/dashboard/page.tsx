"use client";

import { useAuth } from "@/lib/context/providers/auth-provider";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Mock stats - will be replaced with actual API data
  const stats = [
    { label: "Total Products", value: "0", change: "+0%", icon: "📦" },
    { label: "Total Sales", value: "₦0", change: "+0%", icon: "💰" },
    { label: "Total Orders", value: "0", change: "+0%", icon: "🛒" },
    { label: "Revenue", value: "₦0", change: "+0%", icon: "📈" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.username || user?.email}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your store today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-sm text-green-600 font-semibold">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
            <span className="text-2xl mb-2 block">➕</span>
            <span className="text-sm font-medium text-gray-700">
              Add Product
            </span>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center">
            <span className="text-2xl mb-2 block">📊</span>
            <span className="text-sm font-medium text-gray-700">
              View Analytics
            </span>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center">
            <span className="text-2xl mb-2 block">⚙️</span>
            <span className="text-sm font-medium text-gray-700">
              Store Settings
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
