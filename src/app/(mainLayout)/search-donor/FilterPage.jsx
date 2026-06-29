'use client';

import React, { useEffect, useState } from 'react';
import FilterComponent from '@/components/FilterComponent';
import Link from 'next/link';

const DonorFilter = ({ donors = [], initialParams = {} }) => {
  // If initialParams contain values, a search has been executed
  const hasSearched = Object.keys(initialParams).length > 0;
  const donorsCount = donors?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50/50 via-gray-50 to-white pb-16">

      {/* --- Top Hero/Header Section --- */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100 py-12 mb-8">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-72 h-72 bg-gray-100 rounded-full blur-2xl opacity-50 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 mb-3 border border-red-100 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Live Donor Network
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">
            Search Available <span className="text-red-600">Blood Donors</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Select a blood group and target location below to connect with verified life-savers in your immediate area.
          </p>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="max-w-5xl mx-auto px-4">

        {/* The Filter Search Form Wrapper */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/70 border border-gray-100 p-4 md:p-6 mb-8 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50">
          <FilterComponent initialParams={initialParams} />
        </div>

        {/* --- Results Info Header (Visible only after a search) --- */}
        {hasSearched && (
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              Search Results <span className="text-sm font-normal text-gray-500">({donorsCount} found)</span>
            </h2>
          </div>
        )}

        {/* --- Dynamic Search Results Display --- */}
        {hasSearched && donorsCount > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {donors.map((request) => (
              <div 
                key={request._id} 
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{request.recipientName}</h3>
                      <p className="text-xs text-gray-400 font-medium">Status: 
                        <span className={`ml-1 px-2 py-0.5 rounded-full font-bold ${request.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                          {request.status}
                        </span>
                      </p>
                    </div>
                    {/* Blood Group Badge */}
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex flex-col items-center justify-center border border-red-100">
                      <span className="text-xs font-semibold leading-none">Group</span>
                      <span className="text-lg font-black leading-none mt-0.5">{request.bloodGroup}</span>
                    </div>
                  </div>

                  {/* Request Message */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm text-gray-600 italic">
                    {request.requestMessage}
                  </div>

                  {/* Meta Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      <span className="font-medium text-gray-700">{request.hospitalName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="text-xs text-gray-500">{request.fullAddress}, {request.recipientUpazila}, {request.recipientDistrict}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="text-xs font-semibold text-gray-700">Date: {request.donationDate} at {request.donationTime}</span>
                    </div>
                  </div>
                </div>

                {/* Call to Action Button */}
                <Link href={`/requests/${request._id}`}>
                <button className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-md shadow-red-100 transition-colors">
                 View Details
                </button>
                </Link>
              </div>
            ))}
          </div>
        ) : hasSearched && donorsCount === 0 ? (
          /* --- Searched but Empty State --- */
          <div className="mt-8 text-center p-12 bg-white rounded-2xl border border-gray-100 max-w-md mx-auto">
            <p className="text-gray-500 font-medium mb-1">No requests found</p>
            <p className="text-xs text-gray-400">There are currently no matching blood requests for the selected group or location.</p>
          </div>
        ) : (
          /* --- Default Empty State (Before Search) --- */
          <div className="mt-12 border border-dashed border-gray-200 rounded-2xl p-8 md:p-12 bg-white/50 text-center backdrop-blur-sm max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">Ready to Find Donors</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              To protect donor privacy and save system bandwidth, results are generated on-demand. Fill in the filters above to initiate a live search.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left border-t border-gray-100 pt-8">
              <div className="p-3 rounded-xl hover:bg-white transition-colors">
                <div className="text-xs font-bold text-red-600 mb-1">01. Filter Quickly</div>
                <p className="text-xs text-gray-400">Narrow down down to your exact Upazila for urgent cases.</p>
              </div>
              <div className="p-3 rounded-xl hover:bg-white transition-colors">
                <div className="text-xs font-bold text-red-600 mb-1">02. Verified Details</div>
                <p className="text-xs text-gray-400">Access phone numbers and match records instantaneously.</p>
              </div>
              <div className="p-3 rounded-xl hover:bg-white transition-colors">
                <div className="text-xs font-bold text-red-600 mb-1">03. Privacy Guaranteed</div>
                <p className="text-xs text-gray-400">Donor identities are secured using strict data masking rules.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DonorFilter;