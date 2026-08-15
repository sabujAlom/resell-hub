"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiTrendingUp } from 'react-icons/fi';

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
            >
              <FiTrendingUp className="text-blue-500" />
              <span>Sustainable Marketplace</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6"
            >
              Buy & Sell <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Second-Hand</span> Goods Effortlessly
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              Join thousands of buyers and sellers in the most trusted marketplace for pre-owned items. Save money, reduce waste, live better.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16"
            >
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 active:scale-95 group"
              >
                Browse Products
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold flex items-center justify-center transition-all active:scale-95"
              >
                Start Selling
              </Link>
            </motion.div>

            {/* Micro Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-8 border-t border-base-300 pt-8"
            >
              <div>
                <p className="text-3xl font-bold text-base-content mb-1">16+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Active Listings</p>
              </div>
              <div className="w-px h-12 bg-base-300" />
              <div>
                <p className="text-3xl font-bold text-base-content mb-1">5+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Trusted Sellers</p>
              </div>
              <div className="w-px h-12 bg-base-300" />
              <div>
                <p className="text-3xl font-bold text-base-content mb-1">2+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Deals Completed</p>
              </div>
            </motion.div>
          </div>

          {/* Image/Visual Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 relative w-full max-w-lg lg:max-w-none px-10"
          >
            <div className="relative rounded-2xl bg-gray-800/50 border border-gray-700/50 p-2 backdrop-blur-sm shadow-2xl">
              <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=600&auto=format&fit=crop" alt="Laptop" className="h-40 w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=600&auto=format&fit=crop" alt="Chair" className="h-40 w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" alt="Shoes" className="h-40 w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop" alt="Headphones" className="h-40 w-full object-cover" />
              </div>
              
              {/* Floating Badges */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 top-8 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-lg border border-blue-500"
              >
                <p className="text-xs font-semibold uppercase opacity-90">New Listings</p>
                <p className="text-2xl font-bold">+16</p>
                <p className="text-[10px] opacity-75">This month</p>
              </motion.div>

              <motion.div 
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-8 bottom-8 bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <FiShield size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Buyer Protection</p>
                  <p className="text-xs text-gray-400">100% Guaranteed</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
