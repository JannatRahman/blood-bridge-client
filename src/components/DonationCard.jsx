'use client'

import {
  ArrowRight,
  Person,
  MapPin,
  Calendar,
  Clock,
  Heart,
} from "@gravity-ui/icons";
import Link from "next/link";


export default function DonationCard({ donation }) {

 

  const currentDonation = donation;

  return (
    <div className="group w-full max-w-sm mx-auto bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">

      {/* Header */}
      <div className="p-5 sm:p-6 bg-gradient-to-br from-rose-50 via-white to-red-50">

        {/* Blood Group */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7D0A0A] text-white font-bold text-lg sm:text-xl shadow-sm">
            <Heart size={18} />
            {currentDonation?.bloodGroup}
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${currentDonation?.status === "Pending"
              ? "bg-amber-100 text-amber-700"
              : "bg-green-100 text-green-700"
              }`}
          >
            {currentDonation?.status}
          </span>
        </div>

        {/* Message */}




        {/* Info Section */}
        <div className="mt-5 pt-5 space-y-3">

          <div className="flex items-center gap-3 text-sm text-gray-700">
            <Person size={16} className="text-red-800 shrink-0" />
            <span className="truncate">
              {currentDonation?.recipientName}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-700">
            <MapPin size={16} className="text-red-800 shrink-0" />
            <span className="truncate">
              {currentDonation?.recipientUpazila},{" "}
              {currentDonation?.recipientDistrict}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar size={16} className="text-red-800" />
              <span>{currentDonation?.donationDate}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock size={16} className="text-red-800" />
              <span>{currentDonation?.donationTime}</span>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 sm:p-5 border-t border-gray-100">
        <Link href={`/requests/${currentDonation._id}`}>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gray-50 hover:bg-rose-50 text-gray-900 font-semibold transition-all
        bg-rose-100
        duration-300 group-hover:border-rose-200">
            <span>View Details</span>

            <div className="w-10 h-10 rounded-xl  shadow-sm flex items-center bg-rose-100 cursor-pointer justify-center group-hover:bg-[#7D0A0A] group-hover:text-white transition-all duration-300">
              <ArrowRight size={18} />
            </div>
          </button>
        </Link>
      </div>

      
    </div>
  );
}