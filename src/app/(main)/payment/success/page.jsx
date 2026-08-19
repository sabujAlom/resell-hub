"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { FiCheckCircle, FiShoppingBag, FiList, FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';

const PaymentSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');
  const productId = searchParams.get('product_id');
  const buyerId = searchParams.get('buyer_id');

  const [verifying, setVerifying] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let active = true;
    const verify = async () => {
      if (!sessionId) {
        setVerifying(false);
        return;
      }
      try {
        const res = await axiosSecure.get(`/payments/verify-session?session_id=${sessionId}&product_id=${productId}&order_id=${orderId}&buyer_id=${buyerId}`);
        if (!active) return;
        if (res.data?.success) {
          setResult(res.data);
          toast.success('Payment successful! Your order is confirmed.');
        } else {
          toast.error(res.data?.message || 'Payment verification failed.');
        }
      } catch (err) {
        console.error(err);
        if (active) toast.error('Could not verify payment. Check My Orders for status.');
      } finally {
        if (active) setVerifying(false);
      }
    };
    verify();
    return () => { active = false; };
  }, [sessionId, productId, orderId, buyerId, axiosSecure]);

  if (verifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-base-100 text-base-content">
        <span className="loading loading-ring loading-lg text-primary" />
        <p className="text-base-content/60">Verifying your payment...</p>
      </div>
    );
  }

  const payment = result?.payment || {};
  const order = result?.order || {};

  return (
    <div className="min-h-screen bg-base-100 text-base-content py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto"
      >
        <div className="bg-base-200 border border-base-300 rounded-3xl shadow-2xl p-10 space-y-8 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto rounded-full bg-green-500/10 flex items-center justify-center text-green-500"
          >
            <FiCheckCircle size={44} />
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold">Payment Successful!</h1>
            <p className="text-base-content/60 text-sm">Thank you for your purchase. Your order has been placed.</p>
          </div>

          <div className="text-left bg-base-100 border border-base-300 rounded-2xl p-6 space-y-3 divide-y divide-base-300">
            <div className="flex justify-between items-center pb-3">
              <span className="text-base-content/60 text-sm">Order Summary</span>
              <span className="font-bold">{order.title || payment.title || 'Order placed'}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-base-content/60 text-sm">Payment Amount</span>
              <span className="font-black text-primary">${(payment.amount || order.price || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-base-content/60 text-sm">Transaction ID</span>
              <span className="font-mono text-xs text-primary">{payment.transactionId || sessionId || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center pt-3">
              <span className="text-base-content/60 text-sm">Payment Date</span>
              <span className="text-sm">{payment.paymentDate ? new Date(payment.paymentDate).toLocaleString() : new Date().toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/dashboard/buyer/my-orders" className="btn btn-primary text-white gap-2">
              <FiList /> My Orders
            </Link>
            <Link href="/products" className="btn btn-outline border-base-300 text-base-content gap-2">
              <FiShoppingBag /> Keep Shopping
            </Link>
            <Link href="/" className="btn btn-ghost text-base-content gap-2">
              <FiHome /> Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const PaymentSuccess = () => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-base-100"><span className="loading loading-ring loading-lg text-primary" /></div>}>
    <PaymentSuccessContent />
  </Suspense>
);

export default PaymentSuccess;
