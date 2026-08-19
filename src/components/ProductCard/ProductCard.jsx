'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiCheckCircle, FiHeart, FiColumns } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';
import { useCompare } from '@/context/CompareContext';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { isCompared, toggle: toggleCompare } = useCompare();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(saved.some(item => item._id === product._id));
  }, [product._id]);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to save to wishlist.');
      return;
    }
    const saved = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) {
      const updated = saved.filter(item => item._id !== product._id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setIsWishlisted(false);
      toast.success('Removed from wishlist.');
    } else {
      saved.push(product);
      localStorage.setItem('wishlist', JSON.stringify(saved));
      setIsWishlisted(true);
      toast.success('Added to wishlist! ❤️');
    }
  };

  return (
    <div className="card bg-base-100 border border-base-300 hover:border-blue-500/50 shadow-xl overflow-hidden hover:scale-[1.02] transition-all group">
      {/* Product Image */}
      <figure className="relative h-56 bg-base-200 overflow-hidden">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 badge badge-primary font-semibold text-white">
          {product.category}
        </span>
        <button
          onClick={handleWishlist}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-4 right-4 bg-base-100/80 backdrop-blur-sm p-2 rounded-full cursor-pointer transition-all hover:scale-110 ${isWishlisted ? 'text-red-500 bg-red-50' : 'text-base-content/60 hover:text-red-400 hover:bg-red-500/10'}`}
        >
          <FiHeart className={`h-5 w-5 transition-all ${isWishlisted ? 'fill-red-500' : ''}`} />
        </button>
        <button
          onClick={() => toggleCompare(product)}
          title={isCompared(product._id) ? 'Remove from comparison' : 'Compare product'}
          className={`absolute top-4 right-16 bg-base-100/80 backdrop-blur-sm p-2 rounded-full cursor-pointer transition-all hover:scale-110 ${isCompared(product._id) ? 'text-primary bg-primary/10' : 'text-base-content/60 hover:text-primary hover:bg-primary/10'}`}
        >
          <FiColumns className="h-5 w-5" />
        </button>
      </figure>

      {/* Product Info */}
      <div className="card-body p-6 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-black text-blue-500">${product.price}</span>
          <span className="badge badge-outline text-xs text-base-content/60 capitalize">{product.condition}</span>
        </div>

        <h3 className="card-title text-lg font-bold text-base-content leading-tight group-hover:text-blue-500 transition-colors">
          {product.title}
        </h3>

        {/* Seller Info & Verification Badge */}
        <div className="flex items-center justify-between pt-3 border-t border-base-300">
          <div className="flex items-center gap-2">
            <div className="avatar placeholder">
              <div className="bg-base-300 text-base-content rounded-full w-8">
                <span className="text-xs uppercase">{product.sellerInfo?.name?.slice(0, 2) || 'SE'}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-base-content flex items-center gap-1">
                {product.sellerInfo?.name || 'Anonymous Seller'}
                {(product.sellerInfo?.verified || product.verified) && (
                  <FiCheckCircle className="text-blue-500 fill-blue-500/20 text-sm" title="Verified Seller" />
                )}
              </p>
              <p className="text-[10px] text-base-content/50">Location: {product.sellerInfo?.location || 'Not Specified'}</p>
            </div>
          </div>
        </div>

        <div className="card-actions justify-end pt-2">
          <Link href={`/products/${product._id}`} className="btn btn-outline btn-primary btn-sm w-full gap-2">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
