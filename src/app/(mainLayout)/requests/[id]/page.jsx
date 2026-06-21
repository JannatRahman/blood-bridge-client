import CardDetailsPage from '@/components/CardDetailsPage';
import { baseUrl } from '@/lib/api/baseUrl';

const fetchDonation = async (id) => {
  const res = await fetch(`${baseUrl}/api/single-request/${id}`, {
    cache: "no-store",
  });

  return res.json();
};

const DetailsPage = async ({ params }) => {
  const { id } = await params;
  const donation = await fetchDonation(id);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <CardDetailsPage donation={donation} />
    </div>
  );
};

export default DetailsPage;