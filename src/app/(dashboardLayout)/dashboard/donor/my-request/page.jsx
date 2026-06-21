
import DashboardHeading from '@/components/DashboardHeading';
import RequestTable from './RequestTable';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { myRequest } from '@/lib/api/create-request/data';
import { Suspense } from 'react';
import { Spinner } from '@heroui/react';

const fetchMyRequest = () => {

}

const DonorRequestPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const request = await myRequest(session?.user?.email)

  return (
    <div>
      <DashboardHeading title='My Request'
        description='Donor All Requests' />

      <Suspense fallback={<Spinner />}>

        <RequestTable request={request} />
        
      </Suspense>


    </div>
  );
};

export default DonorRequestPage;