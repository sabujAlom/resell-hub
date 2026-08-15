"use client";
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const stories = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Buyer',
    initials: 'SM',
    content: '"Found an amazing MacBook for half the price! The seller was incredibly responsive and shipping was super fast."',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Seller',
    initials: 'JC',
    content: '"Sold 15+ items in my first month. ReSellHub has the best interface and the buyers here are serious about purchasing."',
    rating: 5,
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'Buyer',
    initials: 'PP',
    content: '"I furnished my entire apartment from ReSellHub. Saved over $2,000 compared to buying new. Highly recommend!"',
    rating: 5,
  },
  {
    id: 4,
    name: 'Marcus Johnson',
    role: 'Seller',
    initials: 'MJ',
    content: '"The analytics dashboard helped me price my items perfectly. Revenue tripled in 3 months!"',
    rating: 5,
  },
];

const SuccessStories = () => {
  return (
    <section className="py-20 bg-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-green-500 uppercase tracking-wider mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">Success Stories</h2>
          <p className="text-base-content/60 max-w-2xl mx-auto">What our community says</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={story.id}
              className="bg-base-200 p-8 rounded-2xl border border-base-300 hover:border-primary/30 transition-colors"
            >
              <div className="flex gap-1 mb-4 text-yellow-500">
                {[...Array(story.rating)].map((_, i) => (
                  <FiStar key={i} className="fill-current" size={16} />
                ))}
              </div>
              <p className="text-base-content/80 mb-6 italic leading-relaxed text-sm md:text-base">
                {story.content}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-base-300 flex items-center justify-center text-base-content font-bold border border-base-300">
                  {story.initials}
                </div>
                <div>
                  <h4 className="text-base-content font-semibold text-sm">{story.name}</h4>
                  <p className="text-blue-500 text-xs">{story.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
