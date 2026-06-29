import DonationCard from "@/components/DonationCard";
import FilterComponent from "@/components/FilterComponent";
import { fetchDonationData } from "@/lib/api/create-request/data";

import { Pagination } from "@heroui/react";
import Link from "next/link";


const DonorRequestPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;

  const page = Number(resolvedParams?.page) || 1;
  const itemsPerPage = 9;

  const bloodGroup = resolvedParams?.bloodGroup || "";
  const recipientDistrict = resolvedParams?.recipientDistrict || "";
  const recipientUpazila = resolvedParams?.recipientUpazila || "";

  // 1. Build base query parameters for filtering
  const params = new URLSearchParams();
  if (bloodGroup) params.append("bloodGroup", bloodGroup);
  if (recipientDistrict) params.append("recipientDistrict", recipientDistrict);
  if (recipientUpazila) params.append("recipientUpazila", recipientUpazila);

  // Helper function to dynamically generate absolute URLs for each page
  const createPageLink = (pageNumber) => {
    const linkParams = new URLSearchParams(params);
    linkParams.set("page", pageNumber.toString());
    return `/requests?${linkParams.toString()}`;
  };

  // 2. Fetch data specifically for the current page
  const fetchParams = new URLSearchParams(params);
  fetchParams.append("page", page.toString());
  fetchParams.append("limit", itemsPerPage.toString());

  const { donations, total } = await fetchDonationData(fetchParams.toString());

  const totalItems = total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

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

      <FilterComponent />

      {/* Cards Grid */}
      {donations && donations.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <DonationCard key={donation._id} donation={donation} />
            ))}
          </div>

          {/* HeroUI Custom Pagination */}
          <div className="flex flex-col items-center justify-center space-y-2 pt-4">
            <Pagination className="justify-center">
              <Pagination.Content>

                {/* Previous Button */}
                <Pagination.Item>
                  <Link href={createPageLink(page - 1)} passHref legacyBehavior>
                    <Pagination.Previous isDisabled={page === 1}>
                      <Pagination.PreviousIcon />
                      <span>Previous</span>
                    </Pagination.Previous>
                  </Link>
                </Pagination.Item>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Pagination.Item key={p}>
                    <Link href={createPageLink(p)} passHref legacyBehavior>
                      <Pagination.Link isActive={p === page}>
                        {p}
                      </Pagination.Link>
                    </Link>
                  </Pagination.Item>
                ))}

                {/* Next Button */}
                <Pagination.Item>
                  <Link href={createPageLink(page + 1)} passHref legacyBehavior>
                    <Pagination.Next isDisabled={page === totalPages}>
                      <span>Next</span>
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Link>
                </Pagination.Item>

              </Pagination.Content>
            </Pagination>

            <p className="text-sm text-gray-500">
              Showing {startItem}-{endItem} of {totalItems} results
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-slate-50 border border-dashed rounded-3xl text-gray-500">
          No blood donation requests found matching those filters.
        </div>
      )}
    </section>
  );
};

export default DonorRequestPage;