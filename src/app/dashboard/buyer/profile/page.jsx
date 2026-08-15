"use client";
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { FiUser, FiImage } from 'react-icons/fi';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [photo, setPhoto] = useState(user?.image || '');
  const [updating, setUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await updateUserProfile(name, photo);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6 text-base-content">
      <h1 className="text-3xl font-extrabold">Profile Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card Summary */}
        <div className="bg-base-200 border border-base-300 p-6 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
          <div className="w-24 h-24 rounded-full bg-base-300 flex items-center justify-center font-bold text-3xl text-blue-400 border-2 border-blue-500/25">
            {user?.image ? (
              <img src={user.image} alt={user.name} className="rounded-full w-full h-full object-cover" />
            ) : (
              user?.name?.slice(0, 2).toUpperCase()
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-base-content leading-tight">{user?.name}</h3>
            <p className="text-xs text-slate-500">{user?.email}</p>
            <span className="badge badge-primary badge-sm text-white uppercase font-bold mt-2">{user?.role}</span>
          </div>
        </div>

        {/* Edit Form details */}
        <div className="md:col-span-2 bg-base-200 border border-base-300 p-8 rounded-3xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-medium">Display Name</span>
              </label>
              <div className="relative">
                <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full pl-12 bg-base-100 text-base-content"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80 font-medium">Avatar Image URL</span>
              </label>
              <div className="relative">
                <FiImage className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="url"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="input input-bordered w-full pl-12 bg-base-100 text-base-content"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={updating}
              className="btn btn-primary w-full text-white mt-4"
            >
              {updating ? <span className="loading loading-spinner text-white"></span> : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
