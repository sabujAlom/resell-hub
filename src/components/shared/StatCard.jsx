"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const accentMap = {
  primary: 'bg-blue-500/10 text-blue-500',
  secondary: 'bg-purple-500/10 text-purple-500',
  success: 'bg-green-500/10 text-green-500',
  warning: 'bg-amber-500/10 text-amber-500',
  error: 'bg-rose-500/10 text-rose-500',
};

const StatCard = ({ label, value, icon: Icon, accent = 'primary', sub, link }) => {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all flex items-center gap-4"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${accentMap[accent] || accentMap.primary}`}>
        {Icon && <Icon size={26} />}
      </div>
      <div className="min-w-0">
        <p className="text-3xl font-black text-base-content">{value}</p>
        <p className="text-sm text-base-content/60 font-medium truncate">{label}</p>
        {sub && <p className="text-xs text-base-content/40">{sub}</p>}
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <Link href={link} className="block hover:-translate-y-1 transition-transform">
        <div className="relative">
          {card}
          <FiArrowRight className="absolute top-4 right-4 text-base-content/30" />
        </div>
      </Link>
    );
  }
  return card;
};

export default StatCard;
