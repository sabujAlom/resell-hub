"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import apiClient from '@/lib/api-client';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { FiShoppingBag, FiMapPin, FiCreditCard, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

const CheckoutContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const productId = searchParams.get('productId');

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!productId) {
        setProduct(null);
        setLoading(false);
        return;
      }
      try {
        const res = await apiClient.get(`/products/${productId}`);
        setProduct(res.data);
      } catch {
        toast.error('Could not load product details.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [productId]);

  const total = product ? Number(product.price) * quantity : 0;

  const handleProceedToPayment = async () => {
    if (!user) {
      toast.error('Please login to complete checkout.');
      router.push('/login');
      return;
    }
    setProcessing(true);
    try {
      const res = await axiosSecure.post('/payments/create-checkout-session', {
        productId,
        buyerId: user.id || user._id,
        orderId,
        quantity,
      });
      if (res.data?.success && res.data?.url) {
        toast.loading('Redirecting to secure payment...', { id: 'checkout' });
        window.location.href = res.data.url;
      } else {
        toast.error(res.data?.message || 'Unable to start checkout.');
        setProcessing(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('Checkout failed. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content">
        <span className="loading loading-ring loading-lg text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-base-100 text-base-content">
        <p className="text-lg font-semibold">We couldn&apos;t find that product.</p>
        <Link href="/products" className="btn btn-primary text-white">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href={`/products/${product._id}`} className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary font-semibold">
          <FiArrowLeft /> Cancel Checkout
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold">Secure Checkout</h1>
          <p className="text-base-content/60 text-sm">Review your order and proceed to payment.</p>
        </div>

        <div className="bg-base-200 border border-base-300 p-8 rounded-3xl shadow-xl space-y-6">
          {/* Order Summary */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-base-300 shrink-0">
              <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-2">
              <span className="badge badge-primary text-white uppercase text-[10px] font-bold">{product.category}</span>
              <h2 className="text-xl font-bold">{product.title}</h2>
              <p className="text-base-content/60 text-sm flex items-center gap-1">
                <FiMapPin className="text-primary" /> {product.sellerInfo?.location || 'Location not specified'}
              </p>
              <p className="text-2xl font-black text-primary">${Number(product.price).toLocaleString()}</p>
            </div>
          </div>

          <div className="divider" />

          {/* Quantity */}
          <div className="form-control max-w-[160px]">
            <label className="label">
              <span className="label-text text-base-content/80 font-semibold">Quantity</span>
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="input input-bordered bg-base-100 text-base-content font-bold"
            />
          </div>

          {/* Delivery Info */}
          <div className="bg-base-300/50 border border-base-300 rounded-2xl p-4 space-y-1">
            <p className="text-xs font-semibold text-base-content/70 uppercase tracking-wide">Delivery Information</p>
            <p className="text-sm text-base-content/80">{user?.name}</p>
            <p className="text-sm text-base-content/70">{user?.email}</p>
            <p className="text-sm text-base-content/70">{user?.location || 'No location set'}</p>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between border-t border-base-300 pt-4">
            <span className="text-base-content/70 font-medium">Total Amount</span>
            <span className="text-3xl font-black text-primary">${total.toLocaleString()}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleProceedToPayment} disabled={processing} className="btn btn-primary flex-grow text-white gap-2">
              {processing ? <span className="loading loading-spinner" /> : <FiCreditCard />} Proceed to Payment
            </button>
            <Link href={`/products/${product._id}`} className="btn btn-outline border-base-300 text-base-content">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-base-100"><span className="loading loading-ring loading-lg text-primary" /></div>}>
    <CheckoutContent />
  </Suspense>
);

export default Checkout;
