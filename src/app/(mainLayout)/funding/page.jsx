'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Xmark, Calendar, Person } from '@gravity-ui/icons';
import PaymentButton from '@/components/PaymentButton';
// Import your Better Auth client instance
import { authClient } from "@/lib/auth-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function FundingPage() {
  // Fetch the active session reactively from Better Auth
  const { data: session } = authClient.useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState('10');
  const [donorName, setDonorName] = useState('');

  const [fundingData, setFundingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Automatically sync the user's name when the session loads or changes
  useEffect(() => {
    if (session?.user?.name) {
      setDonorName(session.user.name);
    }
  }, [session]);

  // Fetch existing funds from backend
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/api/get-funds`);
        if (res.ok) {
          const data = await res.json();
          setFundingData(data);
        }
      } catch (error) {
        console.error("Error fetching funds:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFunds();
  }, []);

  const handleDonationSubmit = async (e) => {
    e.preventDefault();

    const newDonationPayload = {
      name: donorName || "Anonymous", // Fallback if name is empty
      amount: donationAmount,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const res = await fetch(`${baseUrl}/api/add-fund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDonationPayload),
      });

      if (res.ok) {
        const savedDonation = await res.json();

        setFundingData((prevData) => [savedDonation, ...prevData]);

        // Reset state values cleanly
        setIsModalOpen(false);
        setDonationAmount('10');
        setDonorName(session?.user?.name || ''); // Reset back to the logged-in user's name
      } else {
        console.error("Failed to save donation.");
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6 sm:p-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Organization Funds</h1>
            <p className="text-gray-500 mt-1">Track and manage all contributions supporting our lifesaving operations.</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#7D0A0A] cursor-pointer hover:bg-red-800 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition duration-200"
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
                {isLoading ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-gray-400">Loading contributions...</td>
                  </tr>
                ) : fundingData.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-gray-400">No donations found. Be the first to donate!</td>
                  </tr>
                ) : (
                  fundingData.map((fund) => (
                    <tr key={fund._id || fund.id} className="hover:bg-gray-50/70 transition">
                      <td className="px-6 py-4 font-medium flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-full text-gray-500">
                          <Person width={16} height={16} />
                        </div>
                        {fund.name}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ${Number(fund.amount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar width={14} height={14} />
                          {fund.date}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- DONATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl relative text-center">

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition"
              aria-label="Close modal"
            >
              <Xmark width={20} height={20} />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2 mt-2">Make a Contribution</h2>
            <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed mb-6">
              Enter your information and the amount you wish to donate.
            </p>

            <form onSubmit={handleDonationSubmit} className="space-y-4">
              {/* Added Donor Name Input Field */}
              <div className="text-left">
                <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Your Name</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E10022] text-sm text-gray-900 font-medium bg-gray-50"
                  placeholder="e.g. John Doe (or leave blank for Anonymous)"
                />
              </div>

              {/* Input Field for Donation Amount */}
              <div className="text-left">
                <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Donation Amount</label>
                <div className="relative mt-1 rounded-2xl border-2 border-red-200 focus-within:border-[#E10022] transition px-4 py-3 bg-white flex items-center shadow-sm">
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
                </div>
              </div>

              {/* Confirm Button */}
              <PaymentButton price={donationAmount} />

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="block mx-auto text-gray-400 hover:text-gray-600 text-sm font-medium pt-1 transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}