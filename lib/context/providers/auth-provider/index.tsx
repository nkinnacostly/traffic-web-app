"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initAuth = () => {
      if (typeof window !== "undefined") {
        // Try to get token from localStorage or cookie
        let storedToken = localStorage.getItem("token");

        // If not in localStorage, try to get from cookie
        if (!storedToken) {
          const cookies = document.cookie.split(";");
          const tokenCookie = cookies.find((c) =>
            c.trim().startsWith("token="),
          );
          if (tokenCookie) {
            storedToken = tokenCookie.split("=")[1];
            // Sync to localStorage for consistency
            localStorage.setItem("token", storedToken);
          }
        }

        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setToken(storedToken);
            setUser(userData);
          } catch (error) {
            // Invalid data, clear storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            document.cookie = "token=; path=/; max-age=0";
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (newToken: string, userData: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
      // Also set cookie for middleware
      document.cookie = `token=${newToken}; path=/; max-age=86400; SameSite=Strict`;
    }
    setToken(newToken);
    setUser(userData);

    // Redirect to create business flow
    router.push("/create-business/step1");
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Also remove cookie
      document.cookie = "token=; path=/; max-age=0";
    }
    setToken(null);
    setUser(null);
    router.push("/auth/sign-in");
  };

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
