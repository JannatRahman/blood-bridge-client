import { protectedFetch, serverFetch } from "../server"

export const myRequest = async (email, page) => {
  const result = await protectedFetch(`/api/my-request/${email}?page=${page}`);
  console.log(result);
  return result;
};


export const fetchDonationData = async (query) => {
  const result = await protectedFetch(`/api/donation-request?${query.toString()}`);
  return result;
}

export const filterRequest = async (bloodGroup, recipientDistrict, recipientUpazila) => {
  // Create a clean, URL-encoded query string
  const params = new URLSearchParams({
    bloodGroup: bloodGroup || '',
    recipientDistrict: recipientDistrict || '',
    recipientUpazila: recipientUpazila || ''
  });

  const result = await serverFetch(`/api/filter-request?${params.toString()}`);
  console.log(result);
  return result;
};