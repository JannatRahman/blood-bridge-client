import { filterRequest } from '@/lib/api/create-request/data';
import DonorFilter from './FilterPage';

const SearchDonor = async ({ searchParams }) => {
  const params = await searchParams;
  
  const { bloodGroup, recipientDistrict, recipientUpazila } = params;
  
  let result = null;

  // Execute the fetch only if search filters have been set in the URL parameters
  if (bloodGroup || recipientDistrict || recipientUpazila) {
    try {
      result = await filterRequest(bloodGroup, recipientDistrict, recipientUpazila);
    } catch (error) {
      console.error("Failed to retrieve filtered blood request listings:", error);
    }
  }

  return (
    <div>
      {/* Pass down the active search params alongside the data result set 
        extracted directly from your Node.js API data key field.
      */}
      <DonorFilter 
        initialParams={params} 
        donors={result?.data || []} 
      />
    </div>
  );
};

export default SearchDonor;