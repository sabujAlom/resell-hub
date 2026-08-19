"use client";
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import StatCard from '@/components/shared/StatCard';
import { FiPackage, FiDollarSign, FiTrendingUp, FiClock } from 'react-icons/fi';

const SellerDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const sellerId = user.id || user._id;
    Promise.all([
      axiosSecure.get(`/products?sellerId=${sellerId}`).catch(() => ({ data: { products: [] } })),
      axiosSecure.get(`/orders?sellerId=${sellerId}`).catch(() => ({ data: [] })),
    ]).then(([prodRes, ordRes]) => {
      const prodData = prodRes.data?.products || prodRes.data || [];
      const ordData = Array.isArray(ordRes.data) ? ordRes.data : [];
      setProducts(prodData);
      setOrders(ordData);
      setLoading(false);
    });
  }, [user, axiosSecure]);

  if (loading) {
    return <div className="flex items-center justify-center p-12"><span className="loading loading-ring loading-lg text-primary" /></div>;
  }

  const paidOrders = orders.filter(o => o.paymentStatus === 'paid');
  const totalSales = paidOrders.length;
  const totalRevenue = paidOrders.reduce((sum, o) => sum + (Number(o.price) || 0), 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'pending' || o.paymentStatus !== 'paid').length;

  return (
    <div className="space-y-8 text-base-content">
      <div>
        <h1 className="text-3xl font-extrabold">Seller Overview</h1>
        <p className="text-base-content/60 text-sm mt-1">Welcome, Partner {user?.name}! Track your store performance below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Products" value={products.length} icon={FiPackage} accent="primary" link="/dashboard/seller/my-products" />
        <StatCard label="Total Sales" value={totalSales} icon={FiTrendingUp} accent="success" link="/dashboard/seller/manage-orders" />
        <StatCard label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={FiDollarSign} accent="secondary" link="/dashboard/seller/manage-orders" />
        <StatCard label="Pending Orders" value={pendingOrders} icon={FiClock} accent="warning" link="/dashboard/seller/manage-orders" />
      </div>
    </div>
  );
};

export default SellerDashboard;
