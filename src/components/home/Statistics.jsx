"use client";
import { motion } from 'framer-motion';
import { FiBox, FiUsers, FiSmile, FiCheckCircle } from 'react-icons/fi';

const stats = [
  { id: 1, value: '16+', label: 'Products Listed', sub: 'Active listings', icon: FiBox },
  { id: 2, value: '5+', label: 'Total Sellers', sub: 'Verified sellers', icon: FiUsers },
  { id: 3, value: '10+', label: 'Happy Buyers', sub: 'Satisfied buyers', icon: FiSmile },
  { id: 4, value: '2+', label: 'Orders Completed', sub: 'Successful deals', icon: FiCheckCircle },
];

const Statistics = () => {
  return (
    <section className="py-20 bg-blue-600 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-blue-500/30">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={stat.id}
                className="flex flex-col items-center text-center px-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white mb-4 backdrop-blur-sm">
                  <Icon size={24} />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-blue-100 font-semibold mb-1">{stat.label}</p>
                <p className="text-blue-200/70 text-xs">{stat.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
