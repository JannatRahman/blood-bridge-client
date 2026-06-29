
import DashboardHeading from '@/components/DashboardHeading';
import RequestTable from './RequestTable';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { myRequest } from '@/lib/api/create-request/data';
import { Suspense } from 'react';
import { Spinner } from '@heroui/react';


const fetchMyRequest = () => {

}

const DonorRequestPage = async ({searchParams}) => {
  const params = await searchParams;
  

  const session = await auth.api.getSession({
    headers: await headers()
  })

  const request = await myRequest(session?.user?.email, params.page)

  return (
    <div>
     <div className='flex justify-between items-center'>
       <DashboardHeading title='My Request'
        description='Donor All Requests' />
        
     </div>

      <Suspense fallback={<Spinner />}>

        <RequestTable request={request} />
        
      </Suspense>
 
 

    </div>
  );
};

export default DonorRequestPage;