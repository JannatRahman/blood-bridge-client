

import { headers } from 'next/headers';

import { Suspense } from 'react';
import { Button, Spinner } from '@heroui/react';
import Link from 'next/link';
import { myRequest } from '@/lib/api/create-request/data';
import { auth } from '@/lib/auth';
import DashboardHeading from '@/components/DashboardHeading';
import RequestTable from './my-request/RequestTable';

const DonorDashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const allRequests = await myRequest(session?.user?.email) || [];

  // 1. Sort by date (newest first) assuming you have a 'createdAt' or 'date' field
  const sortedRequests = allRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // 2. Slice to get maximum 3 recent items
  const recentRequests = sortedRequests.slice(0, 3);

  return (
    // Added progressive layout padding across mobile, tablet, and desktop
    <div className="space-y-6 px-4 py-6 sm:px-6 md:px-8 lg:max-w-7xl lg:mx-auto">
      
      {/* Welcome Section */}
      <DashboardHeading
        title={`Welcome, ${session?.user?.name || 'Donor'}! 👋`}
        description="Thank you for your life-saving contributions." 
      />

      {/* 3. Conditional Rendering: Only show if the donor has requests */}
      {recentRequests.length > 0 && (
        <div className="space-y-4 mt-6 md:mt-8">
          {/* Responsive Typography for sub-headings */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 px-1">
            Recent Donation Requests
          </h2>
          
          <Suspense fallback={<Spinner color="danger" size="lg" />}>
            {/* Responsive table wrapper layout. 
              Ensures the table scrolls horizontally on small screens instead of breaking the entire page layout.
            */}
            <div className="w-full overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
              <RequestTable request={recentRequests} />
            </div>
          </Suspense>
        </div>
      )}

      {/* Centered actions container built for thumb-reachability on mobile devices */}
      <div className="pt-6 pb-10 flex justify-center items-center">
        <Link href="/requests" className="w-full sm:w-auto">
          <Button 
            className="w-full sm:w-auto bg-red-800 text-white font-medium px-8 py-6 rounded-xl transition-transform active:scale-98 shadow-md"
          >
            View All Requests
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DonorDashboardPage;