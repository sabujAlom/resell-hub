"use client";
import { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { FiTrash2, FiCheckCircle } from 'react-icons/fi';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    axiosSecure.get('/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleVerifySeller = async (userId) => {
    try {
      const res = await axiosSecure.patch(`/users/${userId}`, { verified: true });
      if (res.data?.success) {
        toast.success("Seller verified successfully!");
        setUsers(users.map(u => u._id === userId ? { ...u, verified: true } : u));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to verify seller.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axiosSecure.delete(`/users/${userId}`);
      if (res.data?.success) {
        toast.success("User deleted successfully!");
        setUsers(users.filter(u => u._id !== userId));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <span className="loading loading-ring loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-base-content font-medium">
      <h1 className="text-3xl font-extrabold">Manage Users</h1>

      {users.length === 0 ? (
        <div className="p-8 bg-base-200 border border-base-300 rounded-3xl text-center text-base-content/60">
          No users registered in the system.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl">
          <table className="table w-full text-base-content">
            <thead>
              <tr className="border-b border-base-300 text-base-content/75">
                <th>Name / Email</th>
                <th>Role</th>
                <th>Verified Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-b border-base-300/50 hover:bg-base-300/30 transition-colors">
                  <td>
                    <p className="font-bold text-base-content text-sm">{u.name}</p>
                    <p className="text-[10px] text-base-content/60">{u.email}</p>
                  </td>
                  <td>
                    <span className={`badge uppercase text-[10px] font-bold ${u.role === 'admin' ? 'badge-error text-white' : u.role === 'seller' ? 'badge-primary text-white' : 'badge-success text-white'}`}>
                      {u.role || 'buyer'}
                    </span>
                  </td>
                  <td>
                    {u.role === 'seller' ? (
                      u.verified ? (
                        <span className="text-xs text-primary flex items-center gap-1 font-bold">
                          <FiCheckCircle className="fill-primary/10" /> Verified Partner
                        </span>
                      ) : (
                        <button
                          onClick={() => handleVerifySeller(u._id)}
                          className="btn btn-outline btn-info btn-xs font-semibold"
                        >
                          Verify Partner
                        </button>
                      )
                    ) : (
                      <span className="text-xs text-base-content/50 italic">Not applicable</span>
                    )}
                  </td>
                  <td>
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="btn btn-outline btn-error btn-xs flex items-center gap-1 font-semibold"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
