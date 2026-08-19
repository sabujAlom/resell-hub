"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { FiX, FiColumns, FiStar, FiMapPin } from 'react-icons/fi';

const CompareBar = () => {
  const { items, remove, clear } = useCompare();
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  const fields = [
    { label: 'Price', render: p => `$${Number(p.price).toLocaleString()}` },
    { label: 'Category', render: p => p.category },
    { label: 'Condition', render: p => <span className="capitalize">{p.condition}</span> },
    { label: 'Seller', render: p => p.sellerInfo?.name || 'Anonymous' },
    { label: 'Location', render: p => p.sellerInfo?.location || 'Not specified' },
    { label: 'Rating', render: p => p.averageRating ? `${Number(p.averageRating).toFixed(1)} ⭐` : '—' },
  ];

  return (
    <>
      {/* Floating bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
        <div className="bg-base-200 border border-base-300 rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3">
          <FiColumns className="text-primary shrink-0" />
          <span className="text-sm font-semibold text-base-content/70 hidden sm:block">
            Compare ({items.length})
          </span>
          <div className="flex-1 flex gap-2 overflow-x-auto">
            {items.map(item => (
              <div key={item._id} className="relative shrink-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-base-300 border border-base-300">
                  <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200'} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => remove(item._id)}
                  className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  title="Remove"
                >
                  <FiX size={12} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => setOpen(true)} className="btn btn-primary btn-sm text-white shrink-0">Compare</button>
          <button onClick={clear} className="btn btn-ghost btn-sm text-base-content/60 shrink-0">Clear</button>
        </div>
      </div>

      {/* Comparison modal */}
      <input type="checkbox" id="compare-modal" className="modal-toggle" checked={open} onChange={() => setOpen(false)} />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-4xl bg-base-100 text-base-content">
          <h3 className="font-bold text-lg mb-4">Product Comparison</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th></th>
                  {items.map(item => (
                    <th key={item._id}>
                      <Link href={`/products/${item._id}`} className="link link-primary font-bold text-sm">{item.title}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">Image</td>
                  {items.map(item => (
                    <td key={item._id}>
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-base-300">
                        <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200'} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                  ))}
                </tr>
                {fields.map(f => (
                  <tr key={f.label}>
                    <td className="font-semibold">{f.label}</td>
                    {items.map(item => (
                      <td key={item._id}>{f.render(item)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <button onClick={() => setOpen(false)} className="btn">Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareBar;
