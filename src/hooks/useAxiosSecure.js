"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useAuth from './useAuth';
import { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

export const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

// Static Request Interceptor
axiosSecure.interceptors.request.use(
  async (config) => {
    // Better Auth issues a JWT for the signed-in user's session via /api/auth/token.
    // The client returns the body directly: { token: "..." } (handle both shapes just in case).
    try {
      const result = await authClient.token();
const token = result?.token || result;

if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
    } catch {
      // No active session; let the request proceed so the server can return 401 if required.
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global callbacks for logout and navigation
let logoutCallback = null;
let navigateCallback = null;

// Static Response Interceptor
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      if (logoutCallback) {
        await logoutCallback();
      }
      if (navigateCallback) {
        navigateCallback('/login');
      }
    }
    return Promise.reject(error);
  }
);

export const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logoutCallback = logOut;
    navigateCallback = (path) => router.push(path);

    return () => {
      if (logoutCallback === logOut) logoutCallback = null;
      if (navigateCallback) navigateCallback = null;
    };
  }, [logOut, router]);

  return axiosSecure;
};

export default useAxiosSecure;
