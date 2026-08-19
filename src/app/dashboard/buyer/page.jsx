"use client";
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Link from 'next/link';
import StatCard from '@/components/shared/StatCard';
import { FiShoppingBag, FiHeart, FiPackage, FiClock } from 'react-icons/fi';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistCount(saved.length);
  }, []);

  useEffect(() => {
    if (!user) return;
    axiosSecure.get(`/orders?buyerId=${user.id || user._id}`)
      .then(res => setOrders(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user, axiosSecure]);

  const recentPurchases = [...orders]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 3);

  if (loading) {
    return <div className="flex items-center justify-center p-12"><span className="loading loading-ring loading-lg text-primary" /></div>;
  }

  return (
    <div className="space-y-8 text-base-content">
      <div>
        <h1 className="text-3xl font-extrabold">Buyer Overview</h1>
        <p className="text-base-content/60 text-sm mt-1">Welcome back, {user?.name}! Here&apos;s your activity at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Orders" value={orders.length} icon={FiShoppingBag} accent="primary" link="/dashboard/buyer/my-orders" />
        <StatCard label="Wishlist Count" value={wishlistCount} icon={FiHeart} accent="secondary" link="/dashboard/buyer/wishlist" />
        <StatCard label="Recent Purchases" value={recentPurchases.length} icon={FiPackage} accent="success" link="/dashboard/buyer/my-orders" />
      </div>

      <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl">
        <h3 className="text-lg font-bold mb-4">Recent Purchases</h3>
        {recentPurchases.length === 0 ? (
          <p className="text-base-content/50 text-sm">You haven&apos;t purchased anything yet.</p>
        ) : (
          <div className="space-y-3">
            {recentPurchases.map(order => (
              <Link key={order._id} href={`/dashboard/buyer/my-orders`} className="flex items-center gap-4 p-3 rounded-2xl bg-base-100 border border-base-300 hover:border-primary/40 transition-colors">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-base-300 shrink-0">
                  {order.image ? <img src={order.image} alt={order.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-base-content/50 text-xs">No img</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{order.title}</p>
                  <p className="text-xs text-base-content/50 flex items-center gap-1"><FiClock /> {order.orderStatus}</p>
                </div>
                <span className="font-bold text-primary">${order.price}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
