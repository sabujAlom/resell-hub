"use client";
import { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { FiTrash2, FiEye } from 'react-icons/fi';
import Link from 'next/link';

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    axiosSecure.get('/products?all=true')
      .then(res => {
        if (res.data?.success) {
          setProducts(res.data.products);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const res = await axiosSecure.delete(`/products/${productId}`);
      if (res.data?.success) {
        toast.success("Listing deleted successfully!");
        setProducts(products.filter(p => p._id !== productId));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete listing.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <span className="loading loading-ring loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-base-content font-medium">
      <h1 className="text-3xl font-extrabold">Manage Products</h1>

      {products.length === 0 ? (
        <div className="p-8 bg-base-200 border border-base-300 rounded-3xl text-center text-slate-400">
          No product listings present on the platform.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl">
          <table className="table w-full text-base-content">
            <thead>
              <tr className="border-b border-base-300 text-base-content/70">
                <th>Product title</th>
                <th>Seller Info</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} className="border-b border-base-300/50 hover:bg-base-300/30 transition-colors">
                  <td>
                    <p className="font-bold text-base-content text-sm">{p.title}</p>
                    <p className="text-[10px] text-slate-500 uppercase">{p.category}</p>
                  </td>
                  <td>
                    <p className="text-xs font-semibold text-base-content/85">{p.sellerInfo?.name || 'Anonymous'}</p>
                    <p className="text-[10px] text-slate-500">{p.sellerInfo?.email || ''}</p>
                  </td>
                  <td className="font-bold text-base-content">${p.price}</td>
                  <td>
                    <span className={`badge badge-sm font-bold capitalize ${p.status === 'available' ? 'badge-success text-slate-950' : 'badge-error text-slate-950'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="space-x-2">
                    <Link href={`/products/${p._id}`} className="btn btn-outline btn-info btn-xs font-semibold">
                      <FiEye /> View
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="btn btn-outline btn-error btn-xs flex items-center gap-1 font-semibold"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
