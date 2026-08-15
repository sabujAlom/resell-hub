import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import { 
  FiUser, FiShoppingBag, FiHeart, FiCreditCard, FiSliders,
  FiPlusCircle, FiList, FiTrendingUp, FiUsers, FiLock, FiHome, FiLogOut
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [role, loading] = useRole();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Signed out successfully.");
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error("Logout failed.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Render role-specific navigation links
  const renderSidebarLinks = () => {
    if (role === 'admin') {
      return (
        <>
          <li>
            <NavLink to="/dashboard/admin" end className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
              <FiSliders className="w-5 h-5" /> Admin Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/manage-users" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
              <FiUsers className="w-5 h-5" /> Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/manage-products" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
              <FiList className="w-5 h-5" /> Manage Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/manage-orders" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
              <FiShoppingBag className="w-5 h-5" /> Manage Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/platform-analytics" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
              <FiTrendingUp className="w-5 h-5" /> Platform Analytics
            </NavLink>
          </li>
        </>
      );
    }

    if (role === 'seller') {
      return (
        <>
          <li>
            <NavLink to="/dashboard/seller" end className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
              <FiSliders className="w-5 h-5" /> Seller Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/seller/add-product" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
              <FiPlusCircle className="w-5 h-5" /> Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/seller/my-products" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
              <FiList className="w-5 h-5" /> My Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/seller/manage-orders" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
              <FiShoppingBag className="w-5 h-5" /> Manage Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/seller/analytics" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
              <FiTrendingUp className="w-5 h-5" /> Sales Analytics
            </NavLink>
          </li>
        </>
      );
    }

    // Default: Buyer
    return (
      <>
        <li>
          <NavLink to="/dashboard/buyer" end className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
            <FiSliders className="w-5 h-5" /> Buyer Overview
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/buyer/my-orders" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
            <FiShoppingBag className="w-5 h-5" /> My Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/buyer/wishlist" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
            <FiHeart className="w-5 h-5" /> Wishlist
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/buyer/payment-history" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
            <FiCreditCard className="w-5 h-5" /> Payment History
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/buyer/profile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'}`}>
            <FiUser className="w-5 h-5" /> Profile Settings
          </NavLink>
        </li>
      </>
    );
  };

  return (
    <div className="flex min-h-screen bg-base-300 text-base-content font-sans">
      {/* Sidebar Container */}
      <aside className="w-80 bg-base-200 border-r border-base-300 flex flex-col justify-between p-6 shrink-0 hidden md:flex">
        <div className="space-y-8">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 px-3">
            ReSell Hub
          </Link>

          {/* User profile Summary */}
          <div className="flex items-center gap-4 bg-base-300 p-4 rounded-2xl border border-base-200">
            <div className="w-12 h-12 rounded-full bg-base-100 flex items-center justify-center font-bold text-primary border border-primary/20">
              {user?.image ? (
                <img src={user.image} alt={user.name} className="rounded-full w-full h-full object-cover" />
              ) : (
                <span className="uppercase">{user?.name?.slice(0, 2)}</span>
              )}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-sm text-base-content truncate">{user?.name}</h4>
              <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{role}</p>
            </div>
          </div>

          {/* Links */}
          <ul className="space-y-2">
            {renderSidebarLinks()}
          </ul>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-6 border-t border-base-300">
          <Link to="/" className="flex items-center gap-3 p-3 rounded-xl text-base-content/75 hover:bg-base-300 hover:text-base-content transition-all font-semibold">
            <FiHome className="w-5 h-5" /> Return Home
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all font-semibold">
            <FiLogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-h-screen bg-base-100 overflow-y-auto">
        <div className="p-6 md:p-10 flex-grow">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
