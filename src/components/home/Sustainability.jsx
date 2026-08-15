"use client";
import { motion } from 'framer-motion';
import { FiWind, FiDroplet, FiZap, FiTrash2 } from 'react-icons/fi';

const metrics = [
  { id: 1, label: 'Energy Saved', value: '75%', icon: FiZap, color: 'text-green-500' },
  { id: 2, label: 'CO₂ Reduced', value: '60%', icon: FiWind, color: 'text-teal-500' },
  { id: 3, label: 'Water Saved', value: '45%', icon: FiDroplet, color: 'text-blue-500' },
  { id: 4, label: 'Waste Diverted', value: '80%', icon: FiTrash2, color: 'text-purple-500' },
];

const Sustainability = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium mb-6"
            >
              <FiWind /> Sustainability
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-base-content mb-6 leading-tight"
            >
              Shopping Second-Hand <br className="hidden lg:block" /> Helps the Planet
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base-content/60 text-lg mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Every second-hand purchase reduces manufacturing demand, saves energy, and keeps goods out of landfills. Join our community in making a positive environmental impact.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 max-w-xl mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-4 p-4 rounded-xl bg-base-100 border border-base-300">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                  <FiWind size={24} />
                </div>
                <div>
                  <h4 className="text-base-content font-bold text-lg">2.5 tons</h4>
                  <p className="text-base-content/60 text-sm">Carbon Saved</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-base-100 border border-base-300">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <FiDroplet size={24} />
                </div>
                <div>
                  <h4 className="text-base-content font-bold text-lg">6+</h4>
                  <p className="text-base-content/60 text-sm">Items Reused</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-base-100 border border-base-300">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <FiTrash2 size={24} />
                </div>
                <div>
                  <h4 className="text-base-content font-bold text-lg">1,200 kg</h4>
                  <p className="text-base-content/60 text-sm">Waste Prevented</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 w-full max-w-lg mx-auto lg:max-w-none grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={metric.id}
                className="bg-base-100 aspect-square rounded-2xl flex flex-col items-center justify-center p-6 border border-base-300 hover:border-primary/30 transition-colors"
              >
                <h3 className={`text-5xl font-bold mb-2 ${metric.color}`}>{metric.value}</h3>
                <p className="text-base-content/60 text-sm font-medium">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
