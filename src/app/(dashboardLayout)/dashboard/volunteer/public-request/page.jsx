'use client'

import React, { useState, useEffect } from 'react';
import { Button, Chip } from '@heroui/react';
import { FaFilter, FaEllipsisV, FaRegUser, FaRegEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import EditRequestModal from '@/components/EditRequestModal';
import DeleteRequestModal from '@/components/DeleteRequestModal';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

// Framer Motion Variants for layout transitions
const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  },
  exit: { opacity: 0, x: 10, transition: { duration: 0.15 } }
};

const PublicRequest = () => {
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
        console.error("Error fetching blood requests:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Filter Logic matching status strings safely
  const filteredRequests = requests.filter((req) => {
    if (selectedStatus === "All Statuses") return true;

    const currentStatus = (req.status || "Inprogress").toLowerCase();
    const targetedStatus = selectedStatus.toLowerCase().replace(/\s+/g, '');

    return currentStatus === targetedStatus;
  });

  return (
    <div className="w-full space-y-8 bg-slate-50/50 p-4 sm:p-8 min-h-screen font-sans antialiased">

      {/* Top Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 px-1"
      >
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            All <span className="text-rose-600 relative inline-block">Donation Requests</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Manage public donation activities across the platform.
          </p>
        </div>

        {/* Status Dropdown Trigger */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="flex items-center gap-2.5 border border-slate-200 bg-white rounded-2xl px-5 py-3 shadow-sm hover:shadow-md hover:border-rose-500/30 transition-all cursor-pointer min-w-[170px]"
        >
          <FaFilter className="text-slate-400 text-xs" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-transparent border-none outline-none cursor-pointer text-slate-700 font-bold text-sm w-full focus:ring-0"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Inprogress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </motion.div>
      </motion.div>

      {/* Styled Card Container Frame */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="border border-slate-100 bg-white shadow-xl shadow-slate-100/60 rounded-[2rem] overflow-hidden p-2 sm:p-6"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                <th className="py-5 px-6 w-16">#</th>
                <th className="py-5 px-6">Participants</th>
                <th className="py-5 px-6">Location</th>
                <th className="py-5 px-6 text-center">Group</th>
                <th className="py-5 px-6 text-center">Status</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50/80">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="loading"
                  >
                    <td colSpan={6} className="text-slate-400 py-24 text-center font-medium text-sm">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                        <span>Loading requests summary...</span>
                      </div>
                    </td>
                  </motion.tr>
                ) : filteredRequests.length > 0 ? (
                  filteredRequests.map((req, index) => (
                    <motion.tr 
                      variants={rowVariants}
                      layout
                      key={req._id} 
                      className="hover:bg-slate-50/60 transition-colors group relative"
                    >
                      {/* Index Counter */}
                      <td className="py-5 px-6 font-bold text-slate-300 text-sm tracking-tight">
                        {String(index + 1).padStart(2, '0')}
                      </td>

                      {/* Participant Details */}
                      <td className="py-5 px-6">
                        <div className="flex flex-col space-y-0.5">
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                            <FaRegUser className="text-slate-400 text-xs shrink-0" />
                            <span className="group-hover:text-rose-600 transition-colors">{req.recipientName || "Anonymous user"}</span>
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
                          <FaMapMarkerAlt className="text-rose-500/80 text-xs shrink-0" />
                          <span>{req.recipientDistrict}</span>
                        </div>
                      </td>

                      {/* Blood Group Badge */}
                      <td className="py-5 px-6 text-center">
                        <span className="inline-flex items-center justify-center w-10 h-8 rounded-xl text-xs font-black bg-rose-50 text-rose-600 border border-rose-100/70 shadow-sm shadow-rose-100/20">
                          {req.bloodGroup}
                        </span>
                      </td>

                      {/* Status Chips */}
                      <td className="py-5 px-6 text-center">
                        <Chip
                          size="sm"
                          variant="flat"
                          className={`font-black uppercase text-[9px] tracking-widest px-2.5 py-1 rounded-lg ${
                            req.status?.toLowerCase() === "done"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200/40"
                              : req.status?.toLowerCase() === "inprogress" || req.status?.toLowerCase() === "pending"
                                ? "bg-blue-50 text-blue-600 border border-blue-200/40"
                                : "bg-rose-50 text-rose-500 border border-rose-200/40"
                          }`}
                        >
                          • {req.status || "Inprogress"}
                        </Chip>
                      </td>

                      {/* Action Controls */}
                      <td className="py-5 px-6 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            isIconOnly
                            size="sm"
                            className="text-slate-400 hover:text-slate-900 min-w-0 h-8 w-8 bg-transparent hover:bg-slate-100 rounded-xl transition-all active:scale-95"
                            onPress={() => { setEditingRequest({ ...req }); setIsModalOpen(true); }}
                          >
                            <FaEllipsisV size={12} />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="empty"
                  >
                    <td colSpan={6} className="text-slate-400 py-20 text-center font-medium text-sm">
                      No donation requests match this filter.
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* System Modals */}
      <EditRequestModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} editingRequest={editingRequest} />
      <DeleteRequestModal isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen} id={deletedId} />
    </div>
  );
};

export default PublicRequest;