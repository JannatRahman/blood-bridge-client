'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { FiUsers, FiHeart, FiArrowRight } from 'react-icons/fi';
import { BiDollar } from 'react-icons/bi';
import Link from 'next/link';
import { Magnifier } from '@gravity-ui/icons';

// 1. CRITICAL FIX: Define baseUrl so the fetch hook knows where to go
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function Banner() {
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/get-funds`);
        if (res.ok) {
          const data = await res.json();
          setFundingData(data);
        }
      } catch (error) {
        console.error("Error fetching funds for banner stats:", error);
      }
    };
    fetchFunds();
  }, []);

  // 2. Compute the real-time dynamic total sum safely
  const totalFunding = fundingData.reduce(
    (total, fund) => total + Number(fund.amount || 0),
    0
  );

  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/banner.png')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col items-center justify-center text-center min-h-[80vh] md:min-h-[85vh] py-16">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2">
            <FiHeart
              className="text-red-500 fill-red-500 animate-pulse"
              size={14}
            />
            <span className="text-xs sm:text-sm font-medium text-gray-200">
              Trusted by thousands of donors
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
            Saving Lives,
            <br />
            <span className="text-red-500">
              One Drop at a Time
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed">
            Connect with blood donors instantly, support emergency
            requests, and become part of a life-saving community
            making a real difference every day.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

            <Button
              className="h-12 sm:h-14 px-8 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-lg shadow-red-500/30 transition-all duration-300"
              endContent={<FiArrowRight />}
            >
              Become a Donor
            </Button>

            <Link href="/search-donor">
              <Button
                variant="bordered"
                className="h-12 sm:h-14 px-8 border-white/20 bg-white/5 backdrop-blur-md text-white rounded-2xl hover:bg-white/10"
                endContent={<Magnifier />}
              >
                Search Donors
              </Button>
            </Link>

          </div>

        </div>

        {/* Stats Section */}
        <div className="relative -mt-10 md:-mt-16 pb-10 pt-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Donors */}
            <div className="group rounded-3xl bg-white p-6 text-center shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <FiUsers size={24} />
              </div>

              <h3 className="text-3xl font-black text-gray-900">
                {fundingData.length > 0
                  ? `${fundingData.length}+`
                  : "0"}
              </h3>

              <p className="mt-2 text-xs uppercase tracking-[3px] text-gray-500 font-bold">
                Active Donors
              </p>
            </div>

            {/* Funding */}
            <div className="group rounded-3xl bg-white p-6 text-center shadow-2xl transition-all duration-300 hover:-translate-y-2">
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
            </div>

            {/* Requests */}
            <div className="group rounded-3xl bg-white p-6 text-center shadow-2xl transition-all duration-300 hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <FiHeart size={24} />
              </div>

              <h3 className="text-3xl font-black text-gray-900">
                19
              </h3>

              <p className="mt-2 text-xs uppercase tracking-[3px] text-gray-500 font-bold">
                Total Requests
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}