"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import apiClient from '@/lib/api-client';
import ProductCard from '@/components/ProductCard/ProductCard';
import Skeleton from '@/components/Skeleton/Skeleton';
import { FiSearch, FiSliders } from 'react-icons/fi';

const categoriesList = ['Electronics', 'Furniture', 'Vehicles', 'Fashion', 'Mobile Phones', 'Books', 'Sports', 'Home & Garden'];
const conditionsList = ['excellent', 'good', 'fair'];

const AllProducts = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const condition = searchParams.get('condition') || '';
  const sort = searchParams.get('sort') || '';
  const priceMin = searchParams.get('priceMin') || '';
  const priceMax = searchParams.get('priceMax') || '';
  const location = searchParams.get('location') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [searchInput, setSearchInput] = useState(search);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams();
      if (search) queryParams.set('search', search);
      if (category) queryParams.set('category', category);
      if (condition) queryParams.set('condition', condition);
      if (sort) queryParams.set('sort', sort);
      if (priceMin) queryParams.set('priceMin', priceMin);
      if (priceMax) queryParams.set('priceMax', priceMax);
      if (location) queryParams.set('location', location);
      queryParams.set('page', page.toString());
      queryParams.set('limit', '6');

      try {
        const res = await apiClient.get(`/products?${queryParams.toString()}`);
        if (res.data?.success) {
          setProducts(res.data.products);
          setTotal(res.data.total);
          setTotalPages(res.data.totalPages);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error loading products", err.message, err.response?.data);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, category, condition, sort, priceMin, priceMax, location, page]);

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateQuery('search', searchInput);
  };

  const clearFilters = () => {
    router.push(pathname);
    setSearchInput('');
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-500">
            Marketplace <span className="text-base-content">Deals</span>
          </h1>
          <p className="text-slate-400 text-sm">Find, compare and grab certified pre-owned items locally.</p>
        </div>

        {/* Search + quick filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-base-200 border border-base-300 p-6 rounded-3xl shadow-lg">
          <form onSubmit={handleSearchSubmit} className="relative md:col-span-2">
            <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name or keyword..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="input input-bordered w-full pl-12 bg-base-100 text-base-content"
            />
          </form>

          <div className="form-control">
            <select
              value={category}
              onChange={(e) => updateQuery('category', e.target.value)}
              className="select select-bordered bg-base-100 text-base-content font-semibold"
            >
              <option value="">All Categories</option>
              {categoriesList.map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <select
              value={sort}
              onChange={(e) => updateQuery('sort', e.target.value)}
              className="select select-bordered bg-base-100 text-base-content font-semibold"
            >
              <option value="">Sort: Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="oldest">Date: Oldest</option>
            </select>
          </div>

          <button
            onClick={() => setShowFilters(v => !v)}
            className="btn btn-outline border-base-300 hover:bg-base-300 text-base-content md:col-span-4 flex items-center gap-2"
          >
            <FiSliders /> Advanced Filters {showFilters ? '▲' : '▼'}
          </button>

          {showFilters && (
            <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              <div className="form-control">
                <label className="label"><span className="label-text text-base-content/70 text-xs">Min Price ($)</span></label>
                <input
                  type="number" min="0"
                  placeholder="0"
                  value={priceMin}
                  onChange={(e) => updateQuery('priceMin', e.target.value)}
                  className="input input-bordered bg-base-100 text-base-content"
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text text-base-content/70 text-xs">Max Price ($)</span></label>
                <input
                  type="number" min="0"
                  placeholder="Any"
                  value={priceMax}
                  onChange={(e) => updateQuery('priceMax', e.target.value)}
                  className="input input-bordered bg-base-100 text-base-content"
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text text-base-content/70 text-xs">Location</span></label>
                <input
                  type="text"
                  placeholder="e.g. New York"
                  value={location}
                  onChange={(e) => updateQuery('location', e.target.value)}
                  className="input input-bordered bg-base-100 text-base-content"
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text text-base-content/70 text-xs">Condition</span></label>
                <select
                  value={condition}
                  onChange={(e) => updateQuery('condition', e.target.value)}
                  className="select select-bordered bg-base-100 text-base-content font-semibold"
                >
                  <option value="">Any</option>
                  {conditionsList.map(cond => (
                    <option key={cond} value={cond} className="capitalize">{cond}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-base-content/60">{loading ? 'Loading...' : `${total} product${total === 1 ? '' : 's'} found`}</p>
          {(search || category || condition || sort || priceMin || priceMax || location) && (
            <button onClick={clearFilters} className="btn btn-ghost btn-sm text-base-content/70">Clear Filters</button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, idx) => <Skeleton key={idx} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-base-200 border border-base-300 rounded-3xl space-y-4">
            <p className="text-slate-400">No listings found matching the criteria.</p>
            <button onClick={clearFilters} className="btn btn-primary btn-sm text-white">Reset Search</button>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map(product => <ProductCard key={product._id} product={product} />)}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 pt-6">
                <button onClick={() => updateQuery('page', (page - 1).toString())} disabled={page === 1} className="btn btn-outline btn-sm">Previous</button>
                <span className="text-sm font-semibold text-base-content/70">Page {page} of {totalPages}</span>
                <button onClick={() => updateQuery('page', (page + 1).toString())} disabled={page === totalPages} className="btn btn-outline btn-sm">Next</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function AllProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading marketplace...</div>}>
      <AllProducts />
    </Suspense>
  );
}
