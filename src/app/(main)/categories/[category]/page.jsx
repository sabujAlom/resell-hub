"use client";
import React, { useEffect, useState, use } from 'react';
import apiClient from '@/lib/api-client';
import ProductCard from '@/components/ProductCard/ProductCard';
import Skeleton from '@/components/Skeleton/Skeleton';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

const CategoryProducts = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);
  const rawCategory = params.category;
  const decodedCategory = decodeURIComponent(rawCategory);
  
  // Format for querying e.g. "mobile-phones" or "mobile phones" -> "mobile phones"
  const queryCategory = decodedCategory.toLowerCase().replace(/-/g, ' ');

  // Format for display e.g. "mobile-phones" or "mobile phones" -> "Mobile Phones"
  const displayCategory = queryCategory
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    apiClient.get(`/products?category=${queryCategory}`)
      .then(res => {
        if (res.data?.success) {
          setProducts(res.data.products);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading products by category", err);
        setProducts([]);
        setLoading(false);
      });
  }, [rawCategory]);

  return (
    <div className="min-h-screen bg-base-100 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-500 font-semibold transition-colors">
            <FiArrowLeft /> Back to Home
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-500">
              Category: <span className="text-base-content">{displayCategory}</span>
            </h1>
            <p className="text-slate-400 text-sm">Browse curated items in the {displayCategory} section.</p>
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-base-200 border border-base-300 rounded-3xl space-y-4">
            <p className="text-slate-400">No listings found in this category.</p>
            <Link href="/products" className="btn btn-primary btn-sm text-white">View All Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
