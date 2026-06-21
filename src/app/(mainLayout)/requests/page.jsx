import DonationCard from "@/components/DonationCard";
import { fetchDonationData } from "@/lib/api/create-request/data";
import React from "react";



const DonorRequestPage = async () => {
  const donations = await fetchDonationData();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Blood Donation Requests
        </h1>
        <p className="text-gray-600 mt-2">
          Browse active blood donation requests and help save lives.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
        {donations.map((donation) => (
          <DonationCard
            key={donation._id}
            donation={donation}
          />
        ))}
      </div>

    </section>
  );
};

export default DonorRequestPage;