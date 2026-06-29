"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { FiUsers, FiHeart, FiArrowRight } from 'react-icons/fi';
import { BiDollar } from 'react-icons/bi';
import Link from 'next/link';
import { Magnifier } from '@gravity-ui/icons';
import { motion } from 'framer-motion';

// Import your custom request fetch utility just like in your Admin Dashboard
import { fetchDonationData } from "@/lib/api/create-request/data";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Smooth sequential load
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

const statCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
};

export default function Banner() {
  const [fundingData, setFundingData] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [donorsData, setDonorsData] = useState([]);

  useEffect(() => {
    const fetchBannerStats = async () => {
      try {
        // 1. Fetch Funding
        const resFunds = await fetch(`${baseUrl}/api/get-funds`);
        if (resFunds.ok) {
          const data = await resFunds.json();
          setFundingData(data);
        }

        // 2. MATCHING ADMIN DASHBOARD: Fetch requests using your custom import
        const requests = await fetchDonationData("");
        if (requests) {
          setRequestsData(requests);
        }

        // 3. Fetch All Users & Filter Donors
        const resUsers = await fetch(`${baseUrl}/api/all-users`);
        if (resUsers.ok) {
          const allUsers = await resUsers.json();
          const donors = allUsers.filter(user => user.role === 'donor');
          setDonorsData(donors);
        }
      } catch (error) {
        // console.error("Error fetching banner stats:", error);
      }
    };
    
    fetchBannerStats();
  }, []);

  // Compute the real-time dynamic total sum safely
  const totalFunding = fundingData.reduce(
    (total, fund) => total + Number(fund.amount || 0),
    0
  );

  // Compute dynamic counts
  const totalRequests = requestsData.length;
  const totalDonors = donorsData.length;

  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* Background with simple fade-in */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/banner.png')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center text-center min-h-[80vh] md:min-h-[85vh] py-16"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full backdrop-blur-xl px-4 py-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 mb-3 border border-red-100 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Trusted by thousands of donors
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={itemVariants} className="max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
            Connecting Heroes,
            <br />
            <span className="text-red-500">
              One Life at a Time
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={itemVariants} className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed">
            Every donation has the power to give someone a second chance. Connect with nearby donors, respond to urgent requests, and become a part of a community that saves lives every day.
          </motion.p>

          {/* CTA Buttons with micro-interactions */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                className="w-full h-12 sm:h-14 px-8 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-lg shadow-red-500/30 transition-all duration-300"
                endContent={<FiArrowRight />}
              >
                Become a Donor
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link href="/search-donor" className="w-full block">
                <Button
                  variant="bordered"
                  className="w-full h-12 sm:h-14 px-8 border-white/20 bg-white/5 backdrop-blur-md text-white rounded-2xl hover:bg-white/10"
                  endContent={<Magnifier />}
                >
                  Search Donors
                </Button>
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>

        {/* Stats Section */}
        <div className="relative -mt-10 md:-mt-16 pb-10 pt-7">
          <motion.div 
            variants={statsContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >

            {/* Donors Card */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-3xl bg-white p-6 text-center shadow-2xl cursor-default select-none"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <FiUsers size={24} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 truncate">
                {totalDonors > 0 ? `${totalDonors}+` : "0"}
              </h3>
              <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] text-gray-500 font-bold">
                Active Donors
              </p>
            </motion.div>

            {/* Funding Card */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-3xl bg-white p-6 text-center shadow-2xl cursor-default select-none"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <BiDollar size={24} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 break-words">
                $
                {totalFunding.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[3px] text-gray-500 font-bold">
                Total Funding
              </p>
            </motion.div>

            {/* Requests Card */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-3xl bg-white p-6 text-center shadow-2xl sm:col-span-2 lg:col-span-1 cursor-default select-none"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <FiHeart size={24} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 truncate">
                {totalRequests > 0 ? `${totalRequests}+` : "0"}
              </h3>
              <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] text-gray-500 font-bold">
                Total Requests
              </p>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}