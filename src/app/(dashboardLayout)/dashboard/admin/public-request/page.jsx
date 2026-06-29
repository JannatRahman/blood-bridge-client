'use client';

import React, { useState, useEffect } from 'react';
import { Button, Chip } from '@heroui/react';
import { FaFilter, FaEllipsisV, FaRegUser, FaRegEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.15 } }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

const AdminPublicRequest = () => {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  // Fetch all global donation requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/get-request`);
        if (res.ok) {
          const data = await res.json();
          setRequests(data);
        }
      } catch (error) {
        // console.error("Error fetching blood requests:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Filter Logic
  const filteredRequests = requests.filter((req) => {
    if (selectedStatus === "All Statuses") return true;
    const currentStatus = (req.status || "Inprogress").toLowerCase();
    const targetedStatus = selectedStatus.toLowerCase().replace(/\s+/g, '');
    return currentStatus === targetedStatus;
  });

  return (
    <div className="w-full space-y-8 bg-slate-50/50 p-4 sm:p-8 min-h-screen">

      {/* Top Header Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2"
      >
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            All <span className="text-rose-600">Donation Requests</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Manage public donation activities across the platform.
          </p>
        </div>

        {/* Status Dropdown */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="flex items-center gap-2 border border-slate-200 bg-white rounded-2xl px-4 py-2.5 shadow-sm hover:border-rose-500/30 hover:shadow-md hover:shadow-slate-100/80 transition-all cursor-pointer min-w-[170px]"
        >
          <FaFilter className="text-slate-400 text-xs shrink-0" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-transparent border-none outline-none cursor-pointer text-slate-700 font-bold text-xs uppercase tracking-wider w-full"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Inprogress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </motion.div>
      </motion.div>

      {/* Main Table Wrapper */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="border border-slate-200/80 bg-white shadow-xl shadow-slate-100/60 rounded-[2rem] overflow-hidden p-2 sm:p-6"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-widest text-slate-400/90">
                <th className="py-5 px-6 w-16">#</th>
                <th className="py-5 px-6">Participants</th>
                <th className="py-5 px-6">Location</th>
                <th className="py-5 px-6 text-center">Group</th>
                <th className="py-5 px-6 text-center">Status</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            
            <motion.tbody 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-slate-50"
            >
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  // Elegant Skeleton Loading UI
                  [...Array(4)].map((_, idx) => (
                    <tr key={`skeleton-${idx}`} className="animate-pulse">
                      <td className="py-5 px-6"><div className="h-4 bg-slate-100 rounded w-4" /></td>
                      <td className="py-5 px-6">
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-100 rounded w-32" />
                          <div className="h-3 bg-slate-50 rounded w-48" />
                        </div>
                      </td>
                      <td className="py-5 px-6"><div className="h-4 bg-slate-100 rounded w-24" /></td>
                      <td className="py-5 px-6 text-center"><div className="h-7 bg-slate-100 rounded-xl w-10 mx-auto" /></td>
                      <td className="py-5 px-6 text-center"><div className="h-6 bg-slate-100 rounded-full w-20 mx-auto" /></td>
                      <td className="py-5 px-6 text-right"><div className="h-8 bg-slate-100 rounded-xl w-8 ml-auto" /></td>
                    </tr>
                  ))
                ) : filteredRequests.length > 0 ? (
                  filteredRequests.map((req, index) => (
                    <motion.tr 
                      variants={rowVariants}
                      key={req._id || index}
                      layoutId={req._id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      {/* Index Counter */}
                      <td className="py-5 px-6 font-bold text-slate-300 text-sm">
                        {String(index + 1).padStart(2, '0')}
                      </td>

                      {/* Participant Details */}
                      <td className="py-5 px-6">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                            <FaRegUser className="text-slate-400 text-xs shrink-0" />
                            <span>{req.recipientName || "Anonymous user"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                            <FaRegEnvelope className="text-slate-300 text-xs shrink-0" />
                            <span>{req.email || "no-email@platform.com"}</span>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                          <FaMapMarkerAlt className="text-rose-500 text-xs shrink-0" />
                          <span>{req.recipientDistrict}</span>
                        </div>
                      </td>

                      {/* Blood Group Badge */}
                      <td className="py-5 px-6 text-center">
                        <span className="inline-flex items-center justify-center w-10 h-8 rounded-xl text-xs font-black bg-rose-50 text-rose-600 border border-rose-100 shadow-sm shadow-rose-100/50">
                          {req.bloodGroup}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-5 px-6 text-center">
                        <Chip
                          size="sm"
                          variant="flat"
                          className={`font-black uppercase text-[9px] tracking-widest px-2.5 py-0.5 border ${
                            req.status?.toLowerCase() === "done"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-200/50"
                              : req.status?.toLowerCase() === "inprogress" || req.status?.toLowerCase() === "pending"
                                ? "bg-sky-50 text-sky-600 border-sky-200/50"
                                : "bg-rose-50 text-rose-500 border-rose-200/50"
                          }`}
                        >
                          • {req.status || "Inprogress"}
                        </Chip>
                      </td>

                      {/* Action Button */}
                      <td className="py-5 px-6 text-right">
                        <div className="flex justify-end">
                          <Button
                            isIconOnly
                            size="sm"
                            className="text-slate-400 hover:text-slate-700 min-w-0 h-8 w-8 bg-transparent hover:bg-slate-100/80 rounded-xl transition-all"
                            onPress={() => { setEditingRequest({ ...req }); setIsModalOpen(true); }}
                          >
                            <FaEllipsisV size={11} />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  // Empty State row
                  <motion.tr 
                    variants={rowVariants}
                    key="empty-state"
                    className="bg-white"
                  >
                    <td colSpan={6} className="text-slate-400 py-20 text-center font-medium text-sm">
                      No donation requests match this filter.
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPublicRequest;