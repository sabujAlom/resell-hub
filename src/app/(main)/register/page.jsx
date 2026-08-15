"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiImage } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Register = () => {
  const { createUser, googleSignIn } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('buyer');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }
    setPasswordError('');
    setLoading(true);
    try {
      await createUser(email, password, name, role, phone, location, photo);
      toast.success("Welcome! Registered successfully.");
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed. Please check details.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      toast.success("Welcome! Registered with Google.");
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error("Google login failed.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-base-100 text-base-content px-6 py-12"
    >
      <div className="card w-full max-w-xl bg-base-200 border border-base-300 shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
            Create Account
          </h2>
          <p className="text-xs text-slate-400">Join ReSell Hub to start trading pre-owned goods safely</p>
        </div>

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/85 font-semibold text-sm">Full Name</span>
            </label>
            <div className="relative">
              <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full pl-12 bg-base-100 text-base-content"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/85 font-semibold text-sm">Email Address</span>
            </label>
            <div className="relative">
              <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full pl-12 bg-base-100 text-base-content"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/85 font-semibold text-sm">Password</span>
              <span className="label-text-alt text-base-content/50 text-xs">Min. 8 characters</span>
            </label>
            <div className="relative">
              <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(''); }}
                className={`input input-bordered w-full pl-12 bg-base-100 text-base-content ${passwordError ? 'input-error' : ''}`}
                required
              />
            </div>
            {passwordError && (
              <p className="text-error text-xs mt-1 flex items-center gap-1">
                ⚠️ {passwordError}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/85 font-semibold text-sm">Photo URL</span>
            </label>
            <div className="relative">
              <FiImage className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="input input-bordered w-full pl-12 bg-base-100 text-base-content"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/85 font-semibold text-sm">Phone Number</span>
            </label>
            <div className="relative">
              <FiPhone className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
              <input
                type="tel"
                placeholder="+1 555 0199"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input input-bordered w-full pl-12 bg-base-100 text-base-content"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/85 font-semibold text-sm">Location / City</span>
            </label>
            <div className="relative">
              <FiMapPin className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="New York, NY"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input input-bordered w-full pl-12 bg-base-100 text-base-content"
                required
              />
            </div>
          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text text-base-content/85 font-semibold text-sm">Account Type (Role)</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="select select-bordered w-full bg-base-100 text-base-content font-semibold"
            >
              <option value="buyer">Buyer (I want to browse & buy items)</option>
              <option value="seller">Seller (I want to list & sell items)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-white mt-4 md:col-span-2"
          >
            {loading ? <span className="loading loading-spinner text-white"></span> : "Register"}
          </button>
        </form>

        <div className="divider text-xs text-slate-500">OR REGISTER WITH</div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="btn btn-outline border-base-300 hover:bg-base-300 text-base-content w-full flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Google Signup
        </button>

        <p className="text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
