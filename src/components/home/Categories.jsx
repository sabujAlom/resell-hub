"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMonitor, FiBriefcase, FiTruck, FiShoppingBag, FiSmartphone, FiBook, FiDribbble, FiCoffee } from 'react-icons/fi';

const categories = [
  { id: 1, name: 'Electronics', icon: FiMonitor, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { id: 2, name: 'Furniture', icon: FiBriefcase, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 3, name: 'Vehicles', icon: FiTruck, color: 'text-base-content/60', bg: 'bg-base-300/50' },
  { id: 4, name: 'Fashion', icon: FiShoppingBag, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { id: 5, name: 'Mobile Phones', icon: FiSmartphone, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 6, name: 'Books', icon: FiBook, color: 'text-green-500', bg: 'bg-green-500/10' },
  { id: 7, name: 'Sports', icon: FiDribbble, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 8, name: 'Home & Garden', icon: FiCoffee, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
];

const Categories = () => {
  return (
    <section className="py-16 bg-base-100 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">Categories</p>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={cat.id}
              >
                <Link
                  href={`/categories/${cat.name.toLowerCase()}`}
                  className="flex flex-col items-center justify-center p-6 h-full min-h-[160px] rounded-2xl bg-base-200 border border-base-300 hover:border-primary/40 hover:shadow-md transition-all group"
                >
                  <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${cat.bg} ${cat.color}`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-medium text-base-content/70 group-hover:text-base-content transition-colors text-center leading-tight">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
