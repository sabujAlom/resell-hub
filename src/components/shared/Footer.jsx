import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-base-200 pt-20 pb-10 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
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
            <ul className="space-y-4">
              {['Home', 'Products', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <Link to="/" className="text-base-content/60 hover:text-blue-500 transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-base-content font-semibold text-lg mb-6">Account</h3>
            <ul className="space-y-4">
              {['Sign In', 'Register', 'Dashboard', 'My Orders'].map((link) => (
                <li key={link}>
                  <Link to="/" className="text-base-content/60 hover:text-blue-500 transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base-content font-semibold text-lg mb-6">Categories</h3>
            <ul className="space-y-4">
              {['Electronics', 'Furniture', 'Vehicles', 'Fashion', 'Mobile Phones'].map((category) => (
                <li key={category}>
                  <Link to="/" className="text-base-content/60 hover:text-blue-500 transition-colors text-sm">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base-content/50 text-sm">
            © {new Date().getFullYear()} ReSellHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-base-content/50">
            <Link to="/" className="hover:text-base-content/80 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-base-content/80 transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-base-content/80 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
