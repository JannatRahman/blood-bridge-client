import React from 'react';
import DonationCard from "@/components/DonationCard";
import { fetchDonationData } from "@/lib/api/create-request/data";

const LimitedDonationCards = async () => {
  // Fetch all available donation data
  const donations = await fetchDonationData("");

  // Grab only the first 6 items from the array safely
  const limitedDonations = donations ? donations.slice(0, 6) : [];

  return (
    <section className="  w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {limitedDonations.length > 0 ? (
        /* Responsive Grid: 1 col on mobile, 2 cols on tablets, 3 cols on desktops */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {limitedDonations.map((donation) => (
            <DonationCard
              key={donation._id}
              donation={donation}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 border border-dashed rounded-3xl text-gray-500 mx-auto max-w-xl px-4">
          No blood donation requests found at the moment.
        </div>
      )}
    </section>
  );
};

export default LimitedDonationCards;