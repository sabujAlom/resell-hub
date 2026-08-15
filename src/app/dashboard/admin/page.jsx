"use client";
import useAuth from '@/hooks/useAuth';

const AdminDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-6 text-base-content">
      <h1 className="text-3xl font-extrabold">Admin Overview</h1>
      <div className="p-8 bg-base-200 border border-base-300 rounded-3xl space-y-4">
        <h2 className="text-xl font-bold text-red-400">Welcome, Administrator {user?.name}!</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Inspect, configure, and manage system operations from this administration console. Use the navigation panel on the left to verify active sellers, moderate product listings, inspect global transaction orders, or check real-time platform statistics.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
