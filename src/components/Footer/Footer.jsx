import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-base-200 pt-20 pb-10 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                R
              </div>
              <span className="text-2xl font-bold text-base-content tracking-tight">
                ReSell<span className="text-blue-500">Hub</span>
              </span>
            </Link>
            <p className="text-base-content/60 text-sm leading-relaxed max-w-xs">
              The premier marketplace for second-hand goods. Buy and sell sustainably, saving money while helping the environment.
            </p>
            <div className="space-y-2 text-sm text-base-content/60">
              <p className="flex items-center gap-2">
                <span className="text-blue-500">✉</span> support@resellhub.com
              </p>
              <p className="flex items-center gap-2">
                <span className="text-blue-500">☏</span> +1 (555) 123-4567
              </p>
              <p className="flex items-center gap-2">
                <span className="text-blue-500">⚲</span> San Francisco, CA 94102
              </p>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-base-content/60 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base-content font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-base-content/60">
              <li><Link href="/" className="hover:text-blue-500 transition-colors text-sm">Home</Link></li>
              <li><Link href="/products" className="hover:text-blue-500 transition-colors text-sm">Products</Link></li>
              <li><Link href="/about" className="hover:text-blue-500 transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-base-content font-semibold text-lg mb-6">Account</h3>
            <ul className="space-y-4 text-base-content/60">
              <li><Link href="/login" className="hover:text-blue-500 transition-colors text-sm">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-blue-500 transition-colors text-sm">Register</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-500 transition-colors text-sm">Dashboard</Link></li>
              <li><Link href="/dashboard/buyer/my-orders" className="hover:text-blue-500 transition-colors text-sm">My Orders</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base-content font-semibold text-lg mb-6">Categories</h3>
            <ul className="space-y-4 text-base-content/60">
              <li><Link href="/products?category=electronics" className="hover:text-blue-500 transition-colors text-sm">Electronics</Link></li>
              <li><Link href="/products?category=furniture" className="hover:text-blue-500 transition-colors text-sm">Furniture</Link></li>
              <li><Link href="/products?category=vehicles" className="hover:text-blue-500 transition-colors text-sm">Vehicles</Link></li>
              <li><Link href="/products?category=fashion" className="hover:text-blue-500 transition-colors text-sm">Fashion</Link></li>
              <li><Link href="/products?category=mobile%20phones" className="hover:text-blue-500 transition-colors text-sm">Mobile Phones</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base-content/50 text-sm">
            © {new Date().getFullYear()} ReSellHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-base-content/50">
            <Link href="/privacy" className="hover:text-base-content/80 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-base-content/80 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-base-content/80 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
