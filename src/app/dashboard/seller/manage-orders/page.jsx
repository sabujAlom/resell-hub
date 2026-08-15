"use client";
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { FiTruck, FiCheckCircle } from 'react-icons/fi';

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    axiosSecure.get(`/orders?sellerId=${user.id || user._id}`)
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axiosSecure.patch(`/orders/${orderId}`, { orderStatus: newStatus });
      toast.success(`Order marked as ${newStatus}!`);
      setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status.");
    }
  };

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
          No orders received yet for your listings.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl font-medium">
          <table className="table w-full text-base-content">
            <thead>
              <tr className="border-b border-base-300 text-base-content/70">
                <th>Product title</th>
                <th>Price</th>
                <th>Payment status</th>
                <th>Order status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-b border-base-300/50 hover:bg-base-300/30 transition-colors">
                  <td>
                    <p className="font-bold text-base-content text-sm">{order.title}</p>
                    <p className="text-[10px] text-slate-500 font-mono">Buyer ID: {order.buyerId}</p>
                  </td>
                  <td className="font-bold">${order.price}</td>
                  <td>
                    <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-success text-slate-950 font-bold' : 'badge-warning text-slate-950 font-bold'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <span className="capitalize text-xs font-semibold badge badge-outline text-base-content/85">
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    {order.paymentStatus === 'paid' && order.orderStatus === 'paid' && (
                      <button
                        onClick={() => handleUpdateStatus(order._id, 'shipped')}
                        className="btn btn-primary btn-xs text-white flex items-center gap-1 font-semibold"
                      >
                        <FiTruck /> Ship Item
                      </button>
                    )}
                    {order.orderStatus === 'shipped' && (
                      <button
                        onClick={() => handleUpdateStatus(order._id, 'delivered')}
                        className="btn btn-success btn-xs text-slate-950 flex items-center gap-1 font-semibold"
                      >
                        <FiCheckCircle /> Mark Delivered
                      </button>
                    )}
                    {order.orderStatus === 'delivered' && (
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                        <FiCheckCircle className="text-green-500" /> Complete
                      </span>
                    )}
                    {order.paymentStatus !== 'paid' && (
                      <span className="text-xs text-slate-500 italic">Waiting for Payment</span>
                    )}
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
