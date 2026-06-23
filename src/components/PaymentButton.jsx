'use client'
import { ShieldCheck } from '@gravity-ui/icons';
import React from 'react';

const PaymentButton = ({price}) => {
  const giveFunding = async () => {
    console.log(price);
   
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({price})
      });
      
      const data = await res.json();
      console.log(data);

      if(data?.url){
        window.location.href = data.url;
      }
  }

  return (
    <div>
      <button
        type="button" // Prevents native form submission handling issues
        onClick={giveFunding}
        className="w-full bg-[#E10022] hover:bg-[#c4001d] text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-red-500/20 active:scale-[0.99] transition duration-150 cursor-pointer flex items-center justify-center gap-2"
      >
        <ShieldCheck width={20} height={20} />
        Confirm & Pay
      </button>
    </div>
  );
};

export default PaymentButton;