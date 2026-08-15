"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useRole from '@/hooks/useRole';

export default function DashboardPage() {
  const router = useRouter();
  const [role, loading] = useRole();

  useEffect(() => {
    if (!loading) {
      if (role === 'admin') {
        router.push('/dashboard/admin');
      } else if (role === 'seller') {
        router.push('/dashboard/seller');
      } else {
        router.push('/dashboard/buyer');
      }
    }
  }, [role, loading, router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-base-100 text-base-content">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}
