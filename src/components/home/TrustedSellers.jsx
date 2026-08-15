"use client";
import { motion } from 'framer-motion';
import { FiStar, FiAward } from 'react-icons/fi';

const sellers = [
  { id: 1, name: 'Alex Rivera', location: 'New York, NY', rating: 4.9, listings: 45, color: 'bg-blue-500', initials: 'AR' },
  { id: 2, name: 'Jordan Lee', location: 'Los Angeles, CA', rating: 5.0, listings: 120, color: 'bg-emerald-500', initials: 'JL' },
  { id: 3, name: 'Morgan Chen', location: 'Chicago, IL', rating: 4.8, listings: 85, color: 'bg-purple-500', initials: 'MC' },
  { id: 4, name: 'Taylor Kim', location: 'Houston, TX', rating: 4.9, listings: 62, color: 'bg-orange-500', initials: 'TK' },
];

const TrustedSellers = () => {
  return (
    <section className="py-20 bg-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-2">Top Sellers</p>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">Trusted Sellers</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers.map((seller, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={seller.id}
              className="bg-base-200 rounded-2xl p-6 border border-base-300 hover:border-base-300/80 hover:shadow-lg transition-all flex flex-col items-center text-center group relative overflow-hidden"
            >
              {/* Top Badge */}
              <div className="absolute top-4 right-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <FiAward size={24} />
              </div>

              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg ${seller.color}`}>
                {seller.initials}
              </div>
              
              <h3 className="text-lg font-bold text-base-content mb-1">{seller.name}</h3>
              <p className="text-base-content/60 text-sm mb-3">{seller.location}</p>
              
              <div className="flex gap-1 mb-4 text-yellow-500">
                {[...Array(Math.floor(seller.rating))].map((_, i) => (
                  <FiStar key={i} className="fill-current" size={14} />
                ))}
              </div>

              <div className="w-full bg-base-300 py-2 rounded-lg mt-auto border border-base-300">
                <p className="text-blue-500 text-sm font-bold">{seller.listings} Listings</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedSellers;
