"use client";
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { FiCheckCircle, FiCreditCard } from 'react-icons/fi';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const MyOrdersContent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchOrders = () => {
    setLoading(true);
    axiosSecure.get(`/orders?buyerId=${user.id || user._id}`)
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

  useEffect(() => {
    const paymentSuccess = searchParams.get('payment_success');
    const sessionId = searchParams.get('session_id');
    const pId = searchParams.get('product_id');
    const oId = searchParams.get('order_id');
    const bId = searchParams.get('buyer_id');

    if (paymentSuccess === 'true' && sessionId) {
      toast.loading("Verifying your payment...", { id: "verify-payment" });
      axiosSecure.get(`/payments/verify-session?session_id=${sessionId}&product_id=${pId}&order_id=${oId}&buyer_id=${bId}`)
        .then(res => {
          if (res.data?.success) {
            toast.success("Payment successful! Item purchased.", { id: "verify-payment" });
            fetchOrders();
          } else {
            toast.error("Payment verification failed.", { id: "verify-payment" });
          }
        })
        .catch(err => {
          console.error(err);
          toast.error("Error verifying payment.", { id: "verify-payment" });
        })
        .finally(() => {
          router.replace('/dashboard/buyer/my-orders');
        });
    }
  }, [searchParams, user]);

  const handlePayNow = async (order) => {
    try {
      toast.loading("Redirecting to Stripe Checkout...", { id: "checkout-redirect" });
      const sessionRes = await axiosSecure.post('/payments/create-checkout-session', {
        productId: order.productId,
        buyerId: user.id || user._id,
        orderId: order._id
      });
      if (sessionRes.data?.success && sessionRes.data?.url) {
        toast.dismiss("checkout-redirect");
        window.location.href = sessionRes.data.url;
      } else {
        toast.error(sessionRes.data?.message || "Failed to generate checkout page.", { id: "checkout-redirect" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment session initialization failed.", { id: "checkout-redirect" });
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
    <div className="space-y-6 text-base-content">
      <h1 className="text-3xl font-extrabold">My Orders</h1>

      {orders.length === 0 ? (
        <div className="p-8 bg-base-200 border border-base-300 rounded-3xl text-center text-slate-400">
          You haven't placed any orders yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl">
          <table className="table w-full text-base-content">
            <thead>
              <tr className="border-b border-base-300 text-base-content/70">
                <th>Product info</th>
                <th>Price</th>
                <th>Payment status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-b border-base-300/50 hover:bg-base-300/30 transition-colors">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-xl bg-base-300 overflow-hidden">
                          {order.image ? (
                            <img src={order.image} alt={order.title} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-base-content/60 bg-base-300 font-bold uppercase text-[10px]">No img</div>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-base-content text-sm">{order.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="font-bold text-base-content">${order.price}</td>
                  <td>
                    <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-success text-slate-950 font-bold' : 'badge-warning text-slate-950 font-bold'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>
                    {order.paymentStatus === 'unpaid' ? (
                      <button
                        onClick={() => handlePayNow(order)}
                        className="btn btn-primary btn-xs text-white flex items-center gap-1 font-semibold"
                      >
                        <FiCreditCard /> Pay Now
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                        <FiCheckCircle className="text-green-500" /> Completed
                      </span>
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

const MyOrders = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center p-12">
        <span className="loading loading-ring loading-lg text-blue-500"></span>
      </div>
    }>
      <MyOrdersContent />
    </Suspense>
  );
};

export default MyOrders;
