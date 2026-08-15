"use client";
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axiosSecure.get(`/payments?buyerId=${user.id || user._id}`)
        .then(res => {
          setPayments(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <span className="loading loading-ring loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-base-content">
      <h1 className="text-3xl font-extrabold">Payment History</h1>

      {payments.length === 0 ? (
        <div className="p-8 bg-base-200 border border-base-300 rounded-3xl text-center text-slate-400">
          No transactions recorded.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl">
          <table className="table w-full text-base-content">
            <thead>
              <tr className="border-b border-base-300 text-base-content/70">
                <th>Transaction ID</th>
                <th>Payment Date</th>
                <th>Amount</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(pay => (
                <tr key={pay._id} className="border-b border-base-300/50 hover:bg-base-300/30 transition-colors text-sm">
                  <td className="font-mono text-xs text-blue-500">{pay.transactionId}</td>
                  <td>{new Date(pay.paymentDate).toLocaleDateString()}</td>
                  <td className="font-bold text-green-500">${pay.amount}</td>
                  <td className="uppercase text-xs text-slate-500 font-semibold">{pay.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
