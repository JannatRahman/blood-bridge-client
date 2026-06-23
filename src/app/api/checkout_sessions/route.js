import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { auth } from '@/lib/auth';

export async function POST(req) {
  const {user} = await auth.api.getSession({
    headers: await headers()
  });
  const data = await req.json();
  
  // console.log(user, 'user');
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: 
          {
          currency: 'usd',
          unit_amount: Number(data?.price) * 100,
          product_data: {
            name: user?.name
          } ,
        
         },
     
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/dashboard/donor/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`
    });
    // console.log(session);
    return NextResponse.json({url: session.url} )
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}