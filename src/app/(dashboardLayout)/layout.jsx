'use client'
import DashboardSidebar from '@/components/DashboardSidebar';


const DashboardLayout = ({
  children }) => {

  return (
    <div className='min-h-screen flex bg-[#F3EDC8]'>
      <DashboardSidebar />

      <div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;