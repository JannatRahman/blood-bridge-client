'use client'
import DashboardSidebar from '@/components/DashboardSidebar';

const DashboardLayout = ({ children }) => {
  return (
    // FIX: Changed 'flex' to 'flex-col md:flex-row' to stack layout vertically on mobile 
    // and layout horizontally on desktop screens.
    <div className='min-h-screen flex flex-col md:flex-row bg-[#F3EDC8]'>
      <DashboardSidebar />

      {/* FIX: Removed 'mx-auto' on mobile so it doesn't leave gaps, and added flex-1 to occupy remaining space */}
      <div className='px-4 py-6 md:px-6 md:py-10 max-w-5xl w-full md:mx-auto flex-1'>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;