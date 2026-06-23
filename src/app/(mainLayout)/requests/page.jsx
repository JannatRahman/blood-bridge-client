import DonationCard from "@/components/DonationCard";

import { fetchDonationData } from "@/lib/api/create-request/data";
import React from "react";
import FilterComponent from "../search-donor/page";

const DonorRequestPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;

  // Gather matching parameters for the backend
  const bloodGroup = resolvedParams?.bloodGroup || "";
  const recipientDistrict = resolvedParams?.recipientDistrict || "";
  const recipientUpazila = resolvedParams?.recipientUpazila || "";

  const params = new URLSearchParams();
  if (bloodGroup) params.append("bloodGroup", bloodGroup);
  if (recipientDistrict) params.append("recipientDistrict", recipientDistrict);
  if (recipientUpazila) params.append("recipientUpazila", recipientUpazila);

  // Send exact structural fields down to MongoDB API route
  const donations = await fetchDonationData(params.toString());

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Blood Donation Requests
        </h1>
        <p className="text-gray-600 mt-2">
          Browse active blood donation requests and help save lives.
        </p>
      </div>

      {/* Render the Client Filter Component here */}
      <FilterComponent />

      {/* Cards Grid */}
      {donations && donations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <DonationCard
              key={donation._id}
              donation={donation}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 border border-dashed rounded-3xl text-gray-500">
          No blood donation requests found matching those filters.
        </div>
      )}

    </section>
  );
};

export default DonorRequestPage;