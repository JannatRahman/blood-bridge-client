import { roleValidator } from '@/lib/api/session';


const DonorLayout =async ({children}) => {

  await roleValidator('Donor')
  return children
};

export default DonorLayout;