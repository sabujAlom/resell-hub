"use client";
import { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import StatCard from '@/components/shared/StatCard';
import { FiUsers, FiPackage, FiShoppingBag, FiDollarSign } from 'react-icons/fi';

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axiosSecure.get('/users').catch(() => ({ data: [] })),
      axiosSecure.get('/products?all=true').catch(() => ({ data: { products: [] } })),
      axiosSecure.get('/orders').catch(() => ({ data: [] })),
    ]).then(([usersRes, prodRes, ordRes]) => {
      const users = Array.isArray(usersRes.data) ? usersRes.data : [];
      const products = prodRes.data?.products || prodRes.data || [];
      const orders = Array.isArray(ordRes.data) ? ordRes.data : [];
      const revenue = orders.filter(o => o.paymentStatus === 'paid').reduce((s, o) => s + (Number(o.price) || 0), 0);
      setStats({ users: users.length, products: products.length, orders: orders.length, revenue });
      setLoading(false);
    });
  }, [axiosSecure]);

  if (loading) {
    return <div className="flex items-center justify-center p-12"><span className="loading loading-ring loading-lg text-primary" /></div>;
  }

  return (
    <div className="space-y-8 text-base-content">
      <div>
        <h1 className="text-3xl font-extrabold">Admin Overview</h1>
        <p className="text-base-content/60 text-sm mt-1">Platform-wide statistics and moderation controls.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Users" value={stats.users} icon={FiUsers} accent="error" link="/dashboard/admin/manage-users" />
        <StatCard label="Total Products" value={stats.products} icon={FiPackage} accent="primary" link="/dashboard/admin/manage-products" />
        <StatCard label="Total Orders" value={stats.orders} icon={FiShoppingBag} accent="secondary" link="/dashboard/admin/manage-orders" />
        <StatCard label="Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={FiDollarSign} accent="success" link="/dashboard/admin/platform-analytics" />
      </div>
    </div>
  );
};

export default AdminDashboard;
