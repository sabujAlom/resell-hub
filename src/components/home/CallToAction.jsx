"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-blue-600 rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-blue-600/20"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-blue-700 rounded-full blur-3xl opacity-50"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Buying or Selling?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join over 15+ thousand users who trust ReSellHub for the best second-hand marketplace experience.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link 
                href="/register"
                className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg active:scale-95"
              >
                Create Free Account
              </Link>
              <Link 
                href="/products"
                className="w-full sm:w-auto px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors border border-blue-500 shadow-lg active:scale-95"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
