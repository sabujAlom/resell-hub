"use client";
import { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get('/orders')
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <span className="loading loading-ring loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-base-content font-medium">
      <h1 className="text-3xl font-extrabold">Manage Orders</h1>

      {orders.length === 0 ? (
        <div className="p-8 bg-base-200 border border-base-300 rounded-3xl text-center text-slate-400">
          No orders placed yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl">
          <table className="table w-full text-base-content">
            <thead>
              <tr className="border-b border-base-300 text-base-content/70">
                <th>Product title</th>
                <th>Seller ID</th>
                <th>Buyer ID</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-b border-base-300/50 hover:bg-base-300/30 transition-colors">
                  <td>
                    <p className="font-bold text-base-content text-sm">{order.title}</p>
                    <p className="text-[10px] text-slate-500 font-mono">Order ID: {order._id}</p>
                  </td>
                  <td className="font-mono text-xs text-slate-400">{order.sellerId}</td>
                  <td className="font-mono text-xs text-slate-400">{order.buyerId}</td>
                  <td className="font-bold text-base-content">${order.price}</td>
                  <td>
                    <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-success text-slate-950 font-bold' : 'badge-warning text-slate-950 font-bold'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
