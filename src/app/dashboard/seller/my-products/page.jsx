"use client";
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { FiTrash2, FiToggleLeft, FiToggleRight, FiCheckCircle } from 'react-icons/fi';

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyProducts = () => {
    setLoading(true);
    axiosSecure.get(`/products?sellerId=${user.id || user._id}`)
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
    if (user) {
      fetchMyProducts();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const res = await axiosSecure.delete(`/products/${id}`);
      if (res.data?.success) {
        toast.success("Listing deleted successfully!");
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete listing.");
    }
  };

  const handleToggleStatus = async (product) => {
    const nextStatus = product.status === 'available' ? 'sold' : 'available';
    try {
      await axiosSecure.patch(`/products/${product._id}`, { status: nextStatus });
      toast.success(`Marked as ${nextStatus}!`);
      setProducts(products.map(p => p._id === product._id ? { ...p, status: nextStatus } : p));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status.");
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
    <div className="space-y-6 text-base-content">
      <h1 className="text-3xl font-extrabold">My Products</h1>

      {products.length === 0 ? (
        <div className="p-8 bg-base-200 border border-base-300 rounded-3xl text-center text-slate-400">
          You haven't listed any products yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl">
          <table className="table w-full text-base-content font-medium">
            <thead>
              <tr className="border-b border-base-300 text-base-content/70">
                <th>Product details</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-b border-base-300/50 hover:bg-base-300/30 transition-colors">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-xl bg-base-300 overflow-hidden">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.title} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-base-300 text-base-content/60 text-xs">No img</div>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-base-content text-sm">{product.title}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="font-bold text-base-content">${product.price}</td>
                  <td>
                    <button
                      onClick={() => handleToggleStatus(product)}
                      className={`badge flex items-center gap-1 font-bold border-0 cursor-pointer ${product.status === 'available' ? 'badge-success text-slate-950' : 'badge-error text-slate-950'}`}
                    >
                      {product.status === 'available' ? <FiToggleRight /> : <FiToggleLeft />}
                      {product.status}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(product._id)}
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

export default MyProducts;
