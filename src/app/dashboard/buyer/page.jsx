"use client";
import useAuth from '@/hooks/useAuth';

const BuyerDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-6 text-base-content">
      <h1 className="text-3xl font-extrabold">Buyer Overview</h1>
      <div className="p-8 bg-base-200 border border-base-300 rounded-3xl space-y-4">
        <h2 className="text-xl font-bold text-blue-500">Welcome, {user?.name}!</h2>
        <p className="text-base-content/60 text-sm leading-relaxed">
          Manage your second-hand marketplace operations from this console. Use the sidebar options to check your current purchase orders, review items added to your wishlist, audit your transactional payments history, or update your personal account information.
        </p>
      </div>
    </div>
  );
};

export default BuyerDashboard;
