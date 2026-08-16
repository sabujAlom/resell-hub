"use client";
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-base-200 py-20 px-6"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
            About ReSell Hub
          </h1>
          <p className="text-base-content/60 text-lg max-w-lg mx-auto">
            Making pre-owned trading simple, secure, and environmentally responsible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="p-8 rounded-3xl bg-base-100 border border-base-300 shadow-md space-y-4">
            <h3 className="text-xl font-bold text-blue-500">Our Vision</h3>
            <p className="text-base-content/70 text-sm leading-relaxed">
              We envision a world where products are kept in circulation for as long as possible, reducing industrial waste and promoting a sustainable circular economy.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-base-100 border border-base-300 shadow-md space-y-4">
            <h3 className="text-xl font-bold text-green-500">Our Mission</h3>
            <p className="text-base-content/70 text-sm leading-relaxed">
              To create a trusted peer-to-peer marketplace where buyers discover great deals on quality products and sellers can sell with confidence, simplicity, and peace of mind .
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-base-100 border border-base-300 shadow text-center space-y-2">
            <div className="text-4xl font-extrabold text-primary">5K+</div>
            <p className="text-base-content/60 text-sm">Active Listings</p>
          </div>
          <div className="p-6 rounded-2xl bg-base-100 border border-base-300 shadow text-center space-y-2">
            <div className="text-4xl font-extrabold text-primary">2K+</div>
            <p className="text-base-content/60 text-sm">Happy Sellers</p>
          </div>
          <div className="p-6 rounded-2xl bg-base-100 border border-base-300 shadow text-center space-y-2">
            <div className="text-4xl font-extrabold text-primary">10K+</div>
            <p className="text-base-content/60 text-sm">Satisfied Buyers</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
