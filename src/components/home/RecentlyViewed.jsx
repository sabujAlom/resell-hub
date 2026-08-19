"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiClock, FiTrash2 } from 'react-icons/fi';
import ProductCard from '@/components/ProductCard/ProductCard';

const RecentlyViewed = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      setItems(Array.isArray(stored) ? stored : []);
    } catch {
      setItems([]);
    }
  }, []);

  const clearAll = () => {
    localStorage.removeItem('recentlyViewed');
    setItems([]);
  };

  if (items.length === 0) return null;

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="bg-blue-500/10 text-blue-500 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide flex items-center gap-1 w-fit">
              <FiClock /> Recent
            </span>
            <h2 className="text-3xl font-bold text-base-content mt-3">Recently Viewed</h2>
          </div>
          <button onClick={clearAll} className="btn btn-ghost btn-sm text-base-content/60 gap-1">
            <FiTrash2 /> Clear
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
