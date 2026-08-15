"use client";
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you shortly.");
    e.target.reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-base-200 py-20 px-6"
    >
      <div className="max-w-xl mx-auto space-y-8 bg-base-100 border border-base-300 p-8 rounded-3xl shadow-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-extrabold text-base-content">Contact Us</h1>
          <p className="text-base-content/60 text-sm">Have queries or suggestions? Drop us a line below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base-content/80">Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full bg-base-200 text-base-content"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base-content/80">Email</span>
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="input input-bordered w-full bg-base-200 text-base-content"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-base-content/80">Message</span>
            </label>
            <textarea
              placeholder="Type your message..."
              className="textarea textarea-bordered w-full bg-base-200 text-base-content h-32"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
