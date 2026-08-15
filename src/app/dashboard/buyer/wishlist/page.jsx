"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { FiTrash2, FiEye } from 'react-icons/fi';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  const handleRemove = (id) => {
    const updated = wishlist.filter(item => item._id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    toast.success("Item removed from your wishlist.");
  };

  return (
    <div className="space-y-6 text-base-content">
      <h1 className="text-3xl font-extrabold">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="p-8 bg-base-200 border border-base-300 rounded-3xl text-center text-base-content/60">
          Your wishlist is currently empty. Explore products to add items.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlist.map(item => (
            <div key={item._id} className="card card-side bg-base-200 border border-base-300 overflow-hidden shadow-xl p-4 flex gap-4">
              <figure className="w-28 h-28 rounded-xl overflow-hidden bg-base-300 shrink-0">
                <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'} alt={item.title} className="w-full h-full object-cover" />
              </figure>
              <div className="flex flex-col justify-between flex-grow">
                <div className="space-y-1">
                  <span className="badge badge-primary badge-xs text-white uppercase font-bold">{item.category}</span>
                  <h3 className="text-sm font-bold text-base-content leading-tight truncate">{item.title}</h3>
                  <p className="text-lg font-black text-primary">${item.price}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/products/${item._id}`} className="btn btn-primary btn-xs text-white flex items-center gap-1 font-semibold">
                    <FiEye /> View
                  </Link>
                  <button onClick={() => handleRemove(item._id)} className="btn btn-outline btn-error btn-xs flex items-center gap-1 font-semibold">
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
