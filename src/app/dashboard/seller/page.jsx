"use client";
import useAuth from '@/hooks/useAuth';

const SellerDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-6 text-base-content">
      <h1 className="text-3xl font-extrabold">Seller Overview</h1>
      <div className="p-8 bg-base-200 border border-base-300 rounded-3xl space-y-4">
        <h2 className="text-xl font-bold text-blue-500">Welcome, Partner {user?.name}!</h2>
        <p className="text-base-content/60 text-sm leading-relaxed">
          Manage your pre-owned inventory listings and sales from this command center. Use the left menu bar to create new product listings, browse your active inventory, process pending buyer orders, or analyze your store performance stats.
        </p>
      </div>
    </div>
  );
};

export default SellerDashboard;
