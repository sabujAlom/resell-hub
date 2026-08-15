"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiMapPin } from 'react-icons/fi';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';

const FeaturedProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistedIds, setWishlistedIds] = useState([]);

  useEffect(() => {
    // Load wishlist state from localStorage
    const saved = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistedIds(saved.map(item => item._id));

    // Fetch real products from API
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products?limit=4&sort=newest`)
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data) ? data : data.products || [];
        setProducts(items.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleWishlist = (e, product) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to save to wishlist.');
      return;
    }
    const saved = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isWishlisted = wishlistedIds.includes(product._id);
    if (isWishlisted) {
      const updated = saved.filter(item => item._id !== product._id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setWishlistedIds(prev => prev.filter(id => id !== product._id));
      toast.success('Removed from wishlist.');
    } else {
      saved.push(product);
      localStorage.setItem('wishlist', JSON.stringify(saved));
      setWishlistedIds(prev => [...prev, product._id]);
      toast.success('Added to wishlist! ❤️');
    }
  };

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="bg-blue-500/10 text-blue-500 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">Featured</span>
            <h2 className="text-3xl font-bold text-base-content mt-3">Hot Deals Right Now ...</h2>
          </div>
          <Link href="/products" className="text-sm text-base-content/60 hover:text-blue-500 transition-colors flex items-center gap-1">
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-base-100 rounded-2xl overflow-hidden border border-base-300 shadow-md animate-pulse">
                  <div className="aspect-[4/3] bg-base-300" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-base-300 rounded w-3/4" />
                    <div className="h-3 bg-base-300 rounded w-1/2" />
                    <div className="h-6 bg-base-300 rounded w-1/3" />
                    <div className="h-10 bg-base-300 rounded" />
                  </div>
                </div>
              ))
            : products.map((product, index) => {
                const isWishlisted = wishlistedIds.includes(product._id);
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    key={product._id}
                    className="bg-base-100 rounded-2xl overflow-hidden border border-base-300 hover:border-primary/40 transition-colors group flex flex-col shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-base-200">
                      <img
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-base-100/80 backdrop-blur-sm text-green-600 text-xs font-bold px-2 py-1 rounded capitalize">
                        {product.condition}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-base-content mb-2 line-clamp-1">{product.title}</h3>

                      <div className="flex items-center gap-1 text-base-content/60 text-xs mb-3">
                        <FiMapPin />
                        <span>{product.sellerInfo?.location || 'Not specified'}</span>
                      </div>

                      <div className="flex items-center gap-1 mb-4">
                        <FiStar className="text-yellow-500 fill-yellow-500" size={14} />
                        <span className="text-sm font-medium text-base-content/80">{product.averageRating?.toFixed(1) || '—'}</span>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-500">${Number(product.price).toLocaleString()}</span>
                        <span className="text-xs text-base-content/50">Stock: {product.stock ?? 1}</span>
                      </div>

                      <div className="flex gap-2 mt-5">
                        <Link
                          href={`/products/${product._id}`}
                          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg flex justify-center items-center gap-2 text-sm font-semibold transition-colors"
                        >
                          <FiShoppingCart /> View Deal
                        </Link>
                        <button
                          onClick={(e) => handleWishlist(e, product)}
                          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                          className={`p-2.5 rounded-lg border transition-all hover:scale-110 ${isWishlisted ? 'border-red-400 bg-red-50 text-red-500' : 'border-base-300 hover:bg-base-200 text-base-content/50 hover:text-pink-500'}`}
                        >
                          <FiHeart size={18} className={isWishlisted ? 'fill-red-500' : ''} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
