'use client';

import React, { useEffect, useState } from "react";
import { FiHeart, FiUsers } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import { motion } from "framer-motion";
import DashboardHeading from "@/components/DashboardHeading";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

// Animation configs
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const textFadeVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const VolunteerDashboard = () => {
  const [fundingData, setFundingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/get-funds`);
        if (res.ok) {
          const data = await res.json();
          setFundingData(data);
        }
      } catch (error) {
        // console.error("Error fetching funds for banner stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFunds();
  }, []);

  // Compute the real-time dynamic total sum safely
  const totalFunding = fundingData.reduce(
    (total, fund) => total + Number(fund.amount || 0),
    0
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-8 bg-slate-50/30 min-h-screen">
      
      {/* Heading Area */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={textFadeVariants}
        className="text-center sm:text-left space-y-1.5"
      >
        <DashboardHeading title={'Volunteer Dashboard'}/>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Overview
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Track and manage your volunteer operations.
        </p>
      </motion.div>

      {/* Stats Cards Grid */}
      <div className="pt-2">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {isLoading ? (
            // Premium Skeleton State
            [...Array(3)].map((_, idx) => (
              <div 
                key={`skeleton-${idx}`} 
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm animate-pulse flex flex-col items-center"
              >
                <div className="h-14 w-14 rounded-2xl bg-slate-100 mb-4" />
                <div className="h-8 bg-slate-100 rounded w-1/3 mb-3" />
                <div className="h-3 bg-slate-50 rounded w-1/2" />
              </div>
            ))
          ) : (
            <>
              {/* Donors Card */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ y: -6, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
                className="group rounded-3xl bg-white p-6 text-center shadow-sm border border-slate-100 hover:border-slate-200/60 transition-colors duration-200"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50/60 text-rose-500 transition-colors duration-300 group-hover:bg-rose-50">
                  <FiUsers className="text-xl sm:text-2xl" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 truncate tracking-tight">
                  {fundingData.length > 0 ? `${fundingData.length}+` : "0"}
                </h3>
                <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[2px] text-slate-400 font-bold">
                  Active Donors
                </p>
              </motion.div>

              {/* Funding Card */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ y: -6, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
                className="group rounded-3xl bg-white p-6 text-center shadow-sm border border-slate-100 hover:border-slate-200/60 transition-colors duration-200"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50/60 text-rose-500 transition-colors duration-300 group-hover:bg-rose-50">
                  <BiDollar className="text-xl sm:text-2xl" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 break-all sm:break-words tracking-tight">
                  ${totalFunding.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </h3>
                <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[2px] text-slate-400 font-bold">
                  Total Funding
                </p>
              </motion.div>

              {/* Requests Card */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ y: -6, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
                className="group rounded-3xl bg-white p-6 text-center shadow-sm border border-slate-100 hover:border-slate-200/60 transition-colors duration-200 sm:col-span-2 lg:col-span-1"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50/60 text-rose-500 transition-colors duration-300 group-hover:bg-rose-50">
                  <FiHeart className="text-xl sm:text-2xl" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 truncate tracking-tight">
                  19
                </h3>
                <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[2px] text-slate-400 font-bold">
                  Total Requests
                </p>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>

    </div>
  );
};

export default VolunteerDashboard;