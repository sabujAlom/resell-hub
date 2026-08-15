"use client";
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const categoriesList = ['Electronics', 'Furniture', 'Vehicles', 'Fashion', 'Mobile Phones', 'Books', 'Sports', 'Home & Garden'];
const conditionsList = ['excellent', 'good', 'fair'];

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('electronics');
  const [condition, setCondition] = useState('excellent');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const productPayload = {
        title,
        category,
        condition,
        price: parseFloat(price),
        images: imageUrl ? [imageUrl] : [],
        description,
        sellerId: user.id || user._id,
        sellerInfo: {
          name: user.name,
          email: user.email,
          location: user.location || 'Not Specified',
          verified: user.verified || false
        }
      };

      const res = await axiosSecure.post('/products', productPayload);
      if (res.data?.success) {
        toast.success("Listing created successfully!");
        router.push('/dashboard/seller/my-products');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to create product listing.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-base-content max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold">Add New Product</h1>

      <div className="bg-base-200 border border-base-300 p-8 rounded-3xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/80 font-medium">Product Title</span>
            </label>
            <input
              type="text"
              placeholder="e.g. iPhone 14 Pro Max"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full bg-base-100 text-base-content"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-medium">Category</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered bg-base-100 text-base-content font-semibold"
              >
                {categoriesList.map(cat => (
                  <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-medium">Condition</span>
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="select select-bordered bg-base-100 text-base-content font-semibold"
              >
                {conditionsList.map(cond => (
                  <option key={cond} value={cond} className="capitalize">{cond}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-medium">Price ($)</span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="299.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered w-full bg-base-100 text-base-content font-bold"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-medium">Product Image URL</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/item.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="input input-bordered w-full bg-base-100 text-base-content"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/80 font-medium">Description / Specifications</span>
            </label>
            <textarea
              placeholder="Detail item usage, original box presence, scratches, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full bg-base-100 text-base-content h-32"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary w-full text-white mt-4"
          >
            {submitting ? <span className="loading loading-spinner text-white"></span> : "Publish Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
