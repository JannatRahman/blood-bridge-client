import { roleValidator } from '@/lib/api/session';
import React from 'react';

const VolunteerLayout =async ({children}) => {

  await roleValidator('Volunteer')
  return children
};

export default VolunteerLayout;