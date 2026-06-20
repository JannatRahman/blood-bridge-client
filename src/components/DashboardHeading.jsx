import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';

const DashboardHeading = ({title, description}) => {
  return (
    <div>
      <div className='border-b border-white pb-5'>
              <h1 className='text-3xl font-extrabold flex items-center gap-2'>Donor Profile <CgProfile/></h1>
              <p className='text-slate-700 pt-2 flex items-center gap-2'>Update Your Profile <BiEdit/></p>
            </div>
    </div>
  );
};

export default DashboardHeading;