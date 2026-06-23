'use client';

import React, { useState } from 'react';
// Import Gravity UI Icons
import { Plus, Xmark,  Calendar, Person } from '@gravity-ui/icons';
import PaymentButton from '@/components/PaymentButton';

export default function FundingPage() {
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState('10');
  console.log(donationAmount);

  // Dummy Data for the Tabular View
  const fundingData = [
    { id: 1, name: 'Anik Rahman', amount: 50, date: '2026-06-20' },
    { id: 2, name: 'Sarah Khan', amount: 100, date: '2026-06-18' },
    { id: 3, name: 'Tanvir Ahmed', amount: 25, date: '2026-06-15' },
    { id: 4, name: 'Nabila Islam', amount: 10, date: '2026-06-12' },
  ];

  // This is where you will plug in your Stripe integration logic
  const handleStripePayment = (e) => {
    e.preventDefault();
   
    // alert(`Redirecting to Stripe to pay $${donationAmount}...`);
    // Your Stripe SDK / API checkout code goes here
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6 sm:p-12">
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Organization Funds</h1>
            <p className="text-gray-500 mt-1">Track and manage all contributions supporting our lifesaving operations.</p>
          </div>

          {/* Give Fund Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#E10022] hover:bg-[#c4001d] text-white font-semibold px-5 py-3 rounded-xl shadow-md transition duration-200"
          >
            <Plus width={18} height={18} />
            Give Fund
          </button>
        </div>

        {/* Funds Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-semibold text-sm uppercase tracking-wider border-b border-gray-200">
                  <th className="px-6 py-4">Donor Name</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Funding Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {fundingData.map((fund) => (
                  <tr key={fund.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-full text-gray-500">
                        <Person width={16} height={16} />
                      </div>
                      {fund.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${fund.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar width={14} height={14} />
                        {fund.date}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- DONATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">

          {/* Modal Container */}
          <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-center">

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition"
              aria-label="Close modal"
            >
              <Xmark width={20} height={20} />
            </button>

            {/* Modal Title & Description */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2 mt-2">Make a Contribution</h2>
            <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed mb-6">
              Enter the amount you wish to donate to support our lifesaving operations.
            </p>

            {/* Payment Form */}
            <form onSubmit={handleStripePayment} className="space-y-5">

              {/* Input Field matched to image theme */}
              <div className="relative rounded-2xl border-2 border-red-200 focus-within:border-[#E10022] transition px-4 py-3 bg-white flex items-center shadow-sm">
                <span className="text-gray-400 font-semibold text-lg mr-2">$</span>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full text-xl font-bold text-gray-900 outline-none pr-6"
                  placeholder="0"
                  min="1"
                  required
                />
                {/* Visual custom spinner arrows to look like the image */}
                <div className="absolute right-4 flex flex-col text-gray-400 text-[10px] pointer-events-none">
                  <span>▲</span>
                  <span>▼</span>
                </div>
              </div>

              {/* Confirm & Pay Button */}
              <PaymentButton price={donationAmount}/>

              {/* Maybe Later Link */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="block mx-auto text-gray-400 hover:text-gray-600 text-sm font-medium pt-1 transition"
              >
                Maybe later
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}