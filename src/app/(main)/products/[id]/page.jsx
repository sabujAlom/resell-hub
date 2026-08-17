"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { FiCheckCircle, FiStar, FiHeart, FiShoppingBag, FiCreditCard } from 'react-icons/fi';
// Stripe Checkout redirect is handled directly on backend

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading product details:", err);
        setLoading(false);
      });

    axios.get(`/api/reviews?productId=${id}`)
      .then(res => {
        setReviews(res.data);
      })
      .catch(err => console.error("Error loading reviews:", err));
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login to purchase items.");
      router.push('/login');
      return;
    }

    try {
      const orderRes = await axiosSecure.post('/orders', {
        buyerId: user.id || user._id,
        sellerId: product.sellerId,
        productId: product._id,
        title: product.title,
        price: product.price,
        image: product.images?.[0] || '',
        quantity: 1
      });

      if (orderRes.data?.success) {
        const order = orderRes.data.order;
        toast.loading("Redirecting to Stripe Checkout...", { id: "checkout-redirect" });
        const sessionRes = await axiosSecure.post('/payments/create-checkout-session', {
          productId: product._id,
          buyerId: user.id || user._id,
          orderId: order._id
        });
        if (sessionRes.data?.success && sessionRes.data?.url) {
          toast.dismiss("checkout-redirect");
          window.location.href = sessionRes.data.url;
        } else {
          toast.error(sessionRes.data?.message || "Failed to generate checkout page.", { id: "checkout-redirect" });
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Order processing failed.");
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      toast.error("Please login to use wishlists.");
      router.push('/login');
      return;
    }
    try {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const alreadyExists = savedWishlist.some(item => item._id === product._id);
      if (alreadyExists) {
        toast.error("Product already in your wishlist!");
        return;
      }
      savedWishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(savedWishlist));
      toast.success("Added to your wishlist!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to wishlist.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to post reviews.");
      return;
    }

    try {
      const res = await axiosSecure.post('/reviews', {
        reviewerId: user.id || user._id,
        reviewerName: user.name,
        reviewerPhoto: user.image || '',
        productId: product._id,
        rating,
        comment
      });

      if (res.data?.success) {
        toast.success("Review posted successfully!");
        setReviews([...reviews, res.data.review]);
        setComment('');
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content">
        <div className="text-center space-y-4">
          <p className="text-xl font-bold">Product Listing Not Found</p>
          <button onClick={() => router.push('/products')} className="btn btn-primary btn-sm text-white">Back to Market</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-base-200 border border-base-300 p-8 rounded-3xl shadow-xl">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-base-300 flex items-center justify-center">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="badge badge-primary font-bold text-white uppercase text-xs px-3 py-2">{product.category}</span>
                <span className="badge badge-outline text-base-content/60 capitalize px-3 py-2">{product.condition} Condition</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-base-content leading-tight">
                {product.title}
              </h1>

              <p className="text-3xl font-black text-primary">${product.price}</p>
              <p className="text-base-content/85 text-sm leading-relaxed">{product.description}</p>
            </div>

            <div className="p-4 rounded-2xl bg-base-300 border border-base-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-base-100 text-primary flex items-center justify-center font-bold text-sm uppercase">
                  {product.sellerInfo?.name?.slice(0, 2) || 'SE'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-base-content flex items-center gap-1">
                    {product.sellerInfo?.name || 'Anonymous Seller'}
                    {(product.sellerInfo?.verified || product.verified) && (
                      <FiCheckCircle className="text-blue-500 fill-blue-500/10 text-sm" title="Verified Seller" />
                    )}
                  </h4>
                  <p className="text-[10px] text-base-content/60">Listed from: {product.sellerInfo?.location || 'Not specified'}</p>
                </div>
              </div>
              <span className="badge badge-neutral text-[10px] font-semibold">Seller Partner</span>
            </div>

            {product.status === 'sold' ? (
              <button disabled className="btn btn-neutral w-full text-base-content/50">Sold Out</button>
            ) : (
              <div className="flex gap-4">
                <button onClick={handleBooking} className="btn btn-primary flex-grow text-white gap-2">
                  <FiShoppingBag /> Purchase Now
                </button>
                <button onClick={handleAddToWishlist} className="btn btn-outline border-base-300 text-base-content hover:bg-base-200">
                  <FiHeart />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-base-content border-b border-base-300 pb-3">User Feedback ({reviews.length})</h3>
            
            {reviews.length === 0 ? (
              <p className="text-base-content/60 text-sm italic">No reviews submitted yet. Be the first to leave one!</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev, index) => (
                  <div key={index} className="p-5 rounded-2xl bg-base-200 border border-base-300 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center font-bold text-xs text-primary">
                          {rev.reviewerPhoto ? (
                            <img src={rev.reviewerPhoto} alt={rev.reviewerName} className="rounded-full w-full h-full object-cover" />
                          ) : (
                            rev.reviewerName?.slice(0, 2).toUpperCase()
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-base-content">{rev.reviewerName}</h4>
                      </div>
                      <div className="flex gap-1 text-amber-550 text-xs font-semibold">
                        <FiStar className="fill-current text-sm" /> {rev.rating}
                      </div>
                    </div>
                    <p className="text-base-content/85 text-xs leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-base-200 border border-base-300 p-6 rounded-3xl space-y-4 h-fit">
            <h3 className="text-lg font-bold text-base-content border-b border-base-300 pb-2">Rate Product</h3>
            
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/60 text-xs">Rating</span>
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  className="select select-bordered select-sm bg-base-300 text-base-content font-bold"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                  <option value={3}>⭐⭐⭐ (3/5)</option>
                  <option value={2}>⭐⭐ (2/5)</option>
                  <option value={1}>⭐ (1/5)</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/60 text-xs">Comment</span>
                </label>
                <textarea
                  placeholder="Share your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="textarea textarea-bordered textarea-sm bg-base-300 text-base-content h-24"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-sm w-full text-white">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
