"use client";
import useAuth from './useAuth';

export const useRole = () => {
  const { user, loading } = useAuth();
  const role = user?.role || null;
  return [role, loading];
};

export default useRole;
