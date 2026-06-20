import React from 'react';


const DashboardHeading = ({title, description}) => {
  return (
    <div>
      <div className='border-b border-white pb-5'>
              <h1 className='text-3xl font-extrabold flex items-center gap-2'>{title} </h1>
              <p className='text-slate-700 pt-2 flex items-center gap-2'>{description} </p>
            </div>
    </div>
  );
};

export default DashboardHeading;