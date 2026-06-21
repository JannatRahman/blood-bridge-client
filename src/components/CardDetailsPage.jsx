"use client";

import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  Person,
  House,
} from "@gravity-ui/icons";

import DonateModal from "./DonateModal";

const CardDetailsPage = ({ donation }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-500 to-red-800 p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <h1 className="text-3xl font-bold">
                Blood Donation Request
              </h1>

              <p className="text-white/80 mt-2">
                Help save a life by donating blood.
              </p>
            </div>

            <div className="bg-white text-red-600 px-6 py-4 rounded-2xl">
              <p className="text-sm font-medium">Blood Group</p>
              <h2 className="text-4xl font-bold">
                {donation?.bloodGroup}
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
          {/* Recipient Info */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold">
              Recipient Information
            </h2>

            <div className="flex items-center gap-3">
              <Person className="text-red-500" size={20} />
              <span>{donation?.recipientName}</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-red-500" size={20} />
              <span>
                {donation?.recipientUpazila},{" "}
                {donation?.hospitalName}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-600 text-sm mb-1">
                Full Address
              </p>
              <p>{donation?.fullAddress}</p>
            </div>
          </div>

          {/* Donation Info */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold">
              Donation Schedule
            </h2>

            <div className="flex items-center gap-3">
              <Calendar className="text-red-500" size={20} />
              <span>{donation?.donationDate}</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="text-red-500" size={20} />
              <span>{donation?.donationTime}</span>
            </div>

            <div className="flex items-center gap-3">
              <Heart className="text-red-500" size={20} />
              <span>{donation?.bloodGroup} Blood Needed</span>
            </div>

            <div>
              <span
                className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${donation?.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                  }`}
              >
                {donation?.status}
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="px-8 pb-8">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
            <h3 className="font-bold text-red-600 mb-2">
              Request Message
            </h3>

            <p className="text-gray-700">
              {donation?.requestMessage}
            </p>
          </div>
        </div>

        {/* CTA */}
        {donation?.status === "Pending" && (
          <div className="p-8 border-t">
            <DonateModal donation={donation} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDetailsPage;