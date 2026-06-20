import DashboardHeading from '@/components/DashboardHeading';
import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const DonorDashboard = () => {
  return (
    <div>
     <DashboardHeading title='Dashboard' description='Donor Dashboard'/>
     <div className=''>
     <Link href='/dashboard/donor/my-request'>
      <Button className={'bg-[#7D0A0A] hover:bg-red-800'}>View All Request</Button>
     </Link>
     </div>
    </div>
  );
};

export default DonorDashboard;