'use client'

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiUsers } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import DashboardHeading from "@/components/DashboardHeading";
import { fetchDonationData } from "@/lib/api/create-request/data";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

// Animation variants for the container to stagger its children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card's animation
    },
  },
};

// Animation variants for individual elements
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const AdminDashboard = () => {
  const [fundingData, setFundingData] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [donorsData, setDonorsData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Fetch funds
        const resFunds = await fetch(`${baseUrl}/api/get-funds`);
        if (resFunds.ok) {
          const data = await resFunds.json();
          setFundingData(data);
        }

        // 2. Fetch requests using your custom server fetch function
        const requests = await fetchDonationData("");
        if (requests) {
          setRequestsData(requests);
        }

        // 3. Fetch all users from your backend route
        const resUsers = await fetch(`${baseUrl}/api/all-users`);
        if (resUsers.ok) {
          const allUsers = await resUsers.json();
          const donors = allUsers.filter(user => user.role === 'donor');
          setDonorsData(donors);
        }
      } catch (error) {
        // console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Compute total funding safely
  const totalFunding = fundingData.reduce(
    (total, fund) => total + Number(fund.amount || 0),
    0
  );

  // Compute dynamic counts
  const totalRequests = requestsData.length;
  const totalDonors = donorsData.length;

  return (
    <motion.div 
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <DashboardHeading title="Admin Dashboard" />

      {/* Heading Area */}
      <motion.div className="text-center sm:text-left space-y-1" variants={itemVariants}>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Overview
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Track and manage all operations.
        </p>
      </motion.div>

      {/* Stats Cards Grid */}
      <div className="pt-4">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
        >

          {/* Donors Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="group rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 text-center shadow-md border border-slate-100 transition-shadow duration-300"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-red-50 text-red-500 transition-colors group-hover:bg-red-500 group-hover:text-white duration-300">
              <FiUsers className="text-xl sm:text-2xl" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 truncate">
              {totalDonors > 0 ? `${totalDonors}+` : "0"}
            </h3>
            <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] text-gray-500 font-bold group-hover:text-red-500 transition-colors duration-300">
              Active Donors
            </p>
          </motion.div>

          {/* Funding Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="group rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 text-center shadow-md border border-slate-100 transition-shadow duration-300"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-500 transition-colors group-hover:bg-emerald-500 group-hover:text-white duration-300">
              <BiDollar className="text-xl sm:text-2xl" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 break-all sm:break-words">
              ${totalFunding.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </h3>
            <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] text-gray-500 font-bold group-hover:text-emerald-500 transition-colors duration-300">
              Total Funding
            </p>
          </motion.div>

          {/* Requests Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="group rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 text-center shadow-md border border-slate-100 transition-shadow duration-300 sm:col-span-2 lg:col-span-1"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-50 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white duration-300">
              <FiHeart className="text-xl sm:text-2xl" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 truncate">
              {totalRequests}
            </h3>
            <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] text-gray-500 font-bold group-hover:text-blue-500 transition-colors duration-300">
              Total Requests
            </p>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;