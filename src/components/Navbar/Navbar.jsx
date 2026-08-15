"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import { FiSun, FiMoon, FiMenu, FiX, FiLogOut, FiSliders } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully.");
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error("Logout failed.");
    }
  };

  const isLinkActive = (path) => {
    return pathname === path;
  };

  const navLinks = (
    <>
      <li>
        <Link href="/" className={`font-semibold ${isLinkActive('/') ? 'text-blue-500' : 'text-base-content/80 hover:text-base-content'}`}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/products" className={`font-semibold ${isLinkActive('/products') ? 'text-blue-500' : 'text-base-content/80 hover:text-base-content'}`}>
          Products
        </Link>
      </li>
      <li>
        <Link 
          href="/#categories" 
          className="font-semibold text-base-content/80 hover:text-base-content"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault();
              document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
            }
            setIsOpen(false);
          }}
        >
          Categories
        </Link>
      </li>
      <li>
        <Link href="/about" className={`font-semibold ${isLinkActive('/about') ? 'text-blue-500' : 'text-base-content/80 hover:text-base-content'}`}>
          About
        </Link>
      </li>
      <li>
        <Link href="/contact" className={`font-semibold ${isLinkActive('/contact') ? 'text-blue-500' : 'text-base-content/80 hover:text-base-content'}`}>
          Contact
        </Link>
      </li>
    </>
  );

  const getDashboardPath = () => {
    if (role === 'admin') return '/dashboard/admin';
    if (role === 'seller') return '/dashboard/seller';
    return '/dashboard/buyer';
  };

  return (
    <div className="navbar bg-base-100/90 backdrop-blur-md border-b border-base-300 sticky top-0 z-50 px-4 md:px-8 text-base-content w-full">
      <div className="navbar-start">
        {/* Mobile Menu Toggle */}
        <div className="dropdown lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost btn-circle text-base-content/80">
            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
          {isOpen && (
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-200 rounded-box w-60 space-y-2 border border-base-300">
              {navLinks}
              {!user && (
                <>
                  <li className="border-t border-base-300 mt-2 pt-2">
                    <Link href="/login" onClick={() => setIsOpen(false)} className="font-semibold text-base-content/80">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white font-semibold rounded-lg justify-center">
                      Get Started
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
        
        {/* Brand Logo with Icon */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xl select-none">
            R
          </div>
          <span className="text-2xl font-bold tracking-tight text-base-content">
            ReSell<span className="text-blue-500">Hub</span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-3 pr-2">
        {/* Dark/Light Theme Toggle */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-base-content/85">
          {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
        </button>

        {/* User profile dropdown or Sign In & Get Started buttons */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-primary/25">
              <div className="w-10 rounded-full bg-base-200 flex items-center justify-center font-bold text-primary">
                {user.image ? (
                  <img src={user.image} alt={user.name} />
                ) : (
                  <span className="text-sm uppercase">{user.name?.slice(0, 2)}</span>
                )}
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-200 border border-base-300 rounded-box w-56 text-base-content space-y-2">
              <li className="px-3 py-2 border-b border-base-300">
                <p className="font-bold text-base-content text-sm leading-tight truncate">{user.name}</p>
                <p className="text-[10px] text-primary uppercase font-semibold">{role || 'buyer'}</p>
              </li>
              <li>
                <Link href={getDashboardPath()} className="flex items-center gap-2 py-2">
                  <FiSliders className="text-primary" /> Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2 text-rose-500 py-2">
                  <FiLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2 md:gap-4 shrink-0">
            <Link href="/login" className="text-base-content/80 hover:text-base-content font-medium text-sm px-2 py-1 transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-blue-500/25 active:scale-95 shrink-0">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
