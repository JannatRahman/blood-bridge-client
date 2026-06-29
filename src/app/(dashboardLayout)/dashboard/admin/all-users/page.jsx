'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { baseUrl } from '@/lib/api/baseUrl';
import toast from 'react-hot-toast';
import { authHeader } from '@/lib/api/server';
import { motion, AnimatePresence } from 'framer-motion';

// Animation configurations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.15, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.1 } }
};

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'blocked'
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/all-users`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        // console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId, currentBlockedStatus) => {
    const nextBlockedStatus = !currentBlockedStatus;
    try {
      const response = await fetch(`${baseUrl}/api/all-users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...await authHeader()
        },
        body: JSON.stringify({ isBlocked: nextBlockedStatus })
      });
      const result = await response.json();

      if (response.ok) {
        setUsers(users.map(user => user._id === userId ? { ...user, isBlocked: nextBlockedStatus } : user));
        toast.success(`${result.message}`);
      }
    } catch (err) {
      console.error("Failed to update user status:", err);
    }
    setActiveDropdownId(null);
  };

  const changeUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`${baseUrl}/api/all-users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...await authHeader()
        },
        body: JSON.stringify({ role: newRole })
      });

      const res = await response.json();

      if (response.ok) {
        setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
        toast.success(res.message || "Role updated successfully!");
      } else {
        toast.error(res.message || "Failed to update role");
      }
    } catch (err) {
      console.error("Failed to update user role:", err);
      toast.error("An error occurred while updating the role.");
    }
    setActiveDropdownId(null);
  };

  const filteredUsers = users.filter(user => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return !user.isBlocked;
    if (filterStatus === 'blocked') return user.isBlocked;
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-3">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <p className="text-sm font-medium text-gray-500">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6"
      >
        {/* Header & Filter System */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-100 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span>👤</span> All Users
            </h1>
            <p className="text-sm text-gray-500 mt-1">Manage platform roles, access levels, and restrictions.</p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Filter:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent text-gray-900 text-sm font-medium outline-none cursor-pointer focus:text-blue-600 transition-colors"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="blocked">Blocked Only</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50/70 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">User</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Email</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Role</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            
            <motion.tbody 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {filteredUsers.length === 0 ? (
                  <motion.tr 
                    variants={rowVariants}
                    key="empty-state"
                    className="bg-white"
                  >
                    <td colSpan="5" className="text-center py-12 text-gray-400 font-medium">
                      No matching users found.
                    </td>
                  </motion.tr>
                ) : (
                  filteredUsers.map((user) => (
                    <motion.tr 
                      variants={rowVariants}
                      key={user._id} 
                      layoutId={user._id}
                      className="bg-white border-b border-gray-50 hover:bg-gray-50/80 transition-colors"
                    >
                      {/* User Avatar & Name */}
                      <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-100 bg-gray-50 shadow-inner">
                          <Image
                            src={user?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                            alt={user.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        <span className="font-semibold text-gray-800">{user.name}</span>
                      </td>

                      {/* User Email */}
                      <td className="px-6 py-4 text-gray-600">{user?.email}</td>

                      {/* Dynamic Role Badge */}
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider
                          ${user.role?.toLowerCase() === 'admin' ? 'bg-rose-50 text-rose-700 border border-rose-100' : ''}
                          ${user.role?.toLowerCase() === 'volunteer' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : ''}
                          ${user.role?.toLowerCase() === 'donor' ? 'bg-sky-50 text-sky-700 border border-sky-100' : ''}
                        `}>
                          {user.role || 'Donor'}
                        </span>
                      </td>

                      {/* Block/Active Status Badge */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                          ${!user.isBlocked ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}
                        `}>
                          <span className={`w-1.5 h-1.5 rounded-full ${!user.isBlocked ? 'bg-green-500' : 'bg-gray-400'}`} />
                          {user.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>

                      {/* 3-Dot Dropdown Actions */}
                      <td className="px-6 py-4 text-right relative">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveDropdownId(activeDropdownId === user._id ? null : user._id)}
                          className="text-gray-400 hover:text-gray-600 text-xl font-bold px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          ⋮
                        </motion.button>

                        <AnimatePresence>
                          {activeDropdownId === user._id && (
                            <>
                              {/* Close backdrop helper */}
                              <div className="fixed inset-0 z-10" onClick={() => setActiveDropdownId(null)}></div>

                              <motion.div 
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="absolute right-6 top-12 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-20 py-1.5 text-left overflow-hidden"
                              >
                                {user.isBlocked ? (
                                  <button
                                    onClick={() => toggleUserStatus(user._id, user.isBlocked)}
                                    className="w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 font-medium text-emerald-600 transition-colors"
                                  >
                                    ✅ Unblock User
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => toggleUserStatus(user._id, user.isBlocked)}
                                      className="w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 font-medium text-rose-600 transition-colors border-b border-gray-50"
                                    >
                                      🚫 Block User
                                    </button>
                                    {user.role?.toLowerCase() === 'donor' && (
                                      <button
                                        onClick={() => changeUserRole(user._id, 'Volunteer')}
                                        className="w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                                      >
                                        🤝 Make Volunteer
                                      </button>
                                    )}
                                    {user.role?.toLowerCase() !== 'admin' && (
                                      <button
                                        onClick={() => changeUserRole(user._id, 'Admin')}
                                        className="w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                                      >
                                        👑 Make Admin
                                      </button>
                                    )}
                                  </>
                                )}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AllUsersPage;