import { baseUrl } from '@/lib/api/baseUrl';
import { stripe } from '@/lib/stripe';
import { CircleCheckFill } from '@gravity-ui/icons';
import Link from 'next/link';

export default async function PaymentSuccess({ searchParams }) {
  const getSession = await searchParams;
  const session_id = getSession.session_id;
  if (!session_id) {
    throw new Error('Missing session_id');
  }

  // Stripe session
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  const email =
    session?.customer_details?.email || session?.customer_email;




  // 🔥 prevent HTML crash
  // let data;
  // const contentType = res.headers.get('content-type');

  // if (contentType?.includes('application/json')) {
  //   data = await res.json();
  // } else {
  //   const text = await res.text();
  //   console.error('Non-JSON response:', text);
  //   throw new Error('API did not return JSON (check backend route)');
  // }

  // console.log(data);
  // console.log(session);

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-red-100 p-8 md:p-12 text-center">

        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
            <CircleCheckFill className="w-14 h-14 text-[#7D0A0A]" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Fund Received!
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Thank you{' '}
          <span className="text-slate-700 ml-2 font-semibold">
            {email}
          </span>
          . Your donation has been processed successfully.
        </p>

        <div className="border-t border-red-100 my-8"></div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#7D0A0A] hover:bg-red-700 text-white font-medium transition"
          >
            Back to Home
          </Link>

          <Link
            href="/funding"
            className="px-6 py-3 rounded-xl border border-red-200 hover:bg-red-50 text-[#7D0A0A] font-medium transition"
          >
            Back to Funding Page
          </Link>
        </div>
      </div>
    </div>
  );
}