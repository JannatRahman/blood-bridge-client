import { stripe } from '@/lib/stripe';
import { CircleCheckFill } from '@gravity-ui/icons';
import Link from 'next/link';
import { redirect } from 'next/navigation'



export default async function PaymentSuccess({ searchParams }) {
  const { session_id } = await searchParams
  console.log(session_id);

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  console.log(session);
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-red-100 p-8 md:p-12 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
            <CircleCheckFill className="w-14 h-14 text-[#7D0A0A]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
           Fund Received!
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Thank you 
          
          <span className='text-slate-700 ml-2 font-semibold'>{session?.customer_email}</span>
          . Your fund has been processed
          successfully and we have received your donation.
        </p>

        {/* Divider */}
        <div className="border-t border-red-100 my-8"></div>





        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#7D0A0A] hover:bg-red-700 text-white font-medium transition"
          >
            Back to Home
          </Link>

          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl border border-red-200 hover:bg-red-50 text-[#7D0A0A] font-medium transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
