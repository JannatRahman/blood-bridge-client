import React from "react";
import { Card, Button } from "@heroui/react";
import { FaUsers, FaCrown } from "react-icons/fa";
import { GiBlood, GiMoneyStack } from "react-icons/gi";

const VolunteerDashboard = () => {
  const stats = {
    totalDonors: 150,
    totalFunding: 25000,
    bloodRequests: 45,
  };

  const isPremium = false; // Toggle for testing layout

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Heading Area */}
      <div className="space-y-1 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">Overview</h1>
        <p className="text-sm text-slate-500 font-medium">Track and manage your volunteer operations.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Donors */}
        <Card className="bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-shadow" radius="lg">
          <div className="p-6 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">Total Donors</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{stats.totalDonors}</h2>
            </div>
            <div className="p-4 bg-pink-50 text-pink-600 rounded-2xl border border-pink-100 shadow-sm">
              <FaUsers size={26} />
            </div>
          </div>
        </Card>

        {/* Total Funding */}
        <Card className="bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-shadow" radius="lg">
          <div className="p-6 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">Total Funding</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {`$${stats.totalFunding.toLocaleString()}`}
              </h2>
            </div>
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-sm">
              <GiMoneyStack size={26} />
            </div>
          </div>
        </Card>

        {/* Blood Requests */}
        <Card className="bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1" radius="lg">
          <div className="p-6 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">Blood Requests</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{stats.bloodRequests}</h2>
            </div>
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 shadow-sm">
              <GiBlood size={26} />
            </div>
          </div>
        </Card>
      </div>

      {/* Premium Content / Dynamic Section */}
      <div className="mt-4">
        {!isPremium ? (
          <Card className="border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/30 shadow-md" radius="lg">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-bold text-amber-900 flex items-center gap-2">
                  <FaCrown className="text-amber-600 animate-pulse" /> Unlock Unlimited Event Creation
                </h3>
                <p className="text-slate-600 text-sm max-w-xl leading-relaxed">
                  Standard organizer accounts are limited to <strong>3 events</strong>. Upgrade to our Premium Package for <strong>$49.00</strong> to host unlimited campaigns and events.
                </p>
              </div>
              <Button className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-6 shadow-md shadow-orange-500/20 hover:scale-105 transition-transform">
                Upgrade Now
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/30 shadow-md" radius="lg">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-bold text-emerald-900 flex items-center gap-2">
                  <FaCrown className="text-emerald-600" /> Premium Active
                </h3>
                <p className="text-slate-600 text-sm max-w-xl leading-relaxed">
                  Thank you for supporting us! You can now create unlimited volunteer drives and tracking events.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;