"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

const axiosSecure = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

axiosSecure.interceptors.request.use(async (config) => {
  try {
    const result = await authClient.token();
    const token = result?.token || result;

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("JWT error:", error);
  }

  return config;
});

export const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await logOut();
          router.push("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [logOut, router]);

  return axiosSecure;
};

export default useAxiosSecure;