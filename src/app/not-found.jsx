"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiAlertCircle } from 'react-icons/fi';
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import { useEffect, useState } from 'react';

export default function NotFound() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

  return (
    <div data-theme={theme} className="flex flex-col min-h-screen bg-base-100 text-base-content w-full">
      <Navbar />
      <main className="flex-grow w-full flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-8 bg-base-200 border border-base-300 p-10 rounded-3xl shadow-2xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 mx-auto rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500"
          >
            <FiAlertCircle size={44} />
          </motion.div>

          <div className="space-y-3">
            <h1 className="text-6xl font-black text-primary">404</h1>
            <h2 className="text-2xl font-bold">Page Not Found</h2>
            <p className="text-base-content/60 text-sm leading-relaxed">
              The page you are looking for does not exist or has been moved to another URL.
            </p>
          </div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Link
              href="/"
              className="btn btn-primary text-white w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform"
            >
              <FiHome /> Back to Home
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
