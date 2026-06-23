"use client";

import { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CircleDollar, Calendar, Person, CirclePlus, Xmark, ArrowChevronRight } from "@gravity-ui/icons";
import toast from "react-hot-toast";

export default function FundingPageClient({ initialFunds }) {
  const [funds, setFunds] = useState(initialFunds);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalFunds = funds.reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Organization Funds</h1>
          <p className="text-sm text-gray-500 mt-1">View community contributions or back our mission directly.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-[#7D0A0A] hover:bg-red-800 text-white font-medium text-sm px-6 py-3 rounded-xl transition shadow-md shadow-red-200 active:scale-[0.98] cursor-pointer"
        >
          <CirclePlus width={16} height={16} />
          Give Fund
        </button>
      </div>

      {/* METRICS SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-red-500 uppercase tracking-wider">Total Raised</p>
          <p className="text-2xl font-black text-gray-900 mt-1">${totalFunds.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-red-500 uppercase tracking-wider">Total Donors</p>
          <p className="text-2xl font-black text-gray-900 mt-1">{funds.length}</p>
        </div>
      </div>

      {/* FUNDS TABLE */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Donor Name</th>
                <th className="py-4 px-6">Fund Amount</th>
                <th className="py-4 px-6">Funding Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {funds.map((fund) => (
                <tr key={fund.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-700">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <Person width={14} height={14} />
                      </div>
                      {fund.name}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-600">
                    ${fund.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar width={14} height={14} className="text-gray-400" />
                      {fund.date}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* STRIPE PAYMENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative text-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <Xmark width={18} height={18} />
            </button>

            {/* <Elements stripe={stripePromise}> */}
            <CheckoutForm
              onCancel={() => setIsModalOpen(false)}
              onSuccess={(newFund) => {
                setFunds([newFund, ...funds]);
                setIsModalOpen(false);
              }}
            />
            {/* </Elements> */}
          </div>
        </div>
      )}
    </>
  );
}

function CheckoutForm({ onSuccess, onCancel }) {
  const stripe = true;
  const elements = true;

  const [amount, setAmount] = useState("0.00");
  const [donorName, setDonorName] = useState("");
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("amount");

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter an amount greater than 0");
      return;
    }
    setPhase("stripe");
  };

  // async / await works natively right here inside your event handler block!
  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    if (!donorName.trim()) {
      toast.error("Please enter a valid donor name");
      return;
    }

    setLoading(true);

    try {
      // This is where your async API network requests go later:
      // const res = await fetch('/api/checkout', { method: 'POST', body: ... })
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Funding successful! Thank you.");

      onSuccess({
        id: Date.now(),
        name: donorName,
        amount: parseFloat(amount),
        date: new Date().toISOString().split("T")[0]
      });

    } catch (error) {
      toast.error(error.message || "Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  if (phase === "amount") {
    return (
      <form onSubmit={handleInitialSubmit} className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Make a Contribution</h2>
        <p className="text-sm text-gray-500 max-w-xs mb-6 leading-relaxed">
          Enter the amount you wish to donate to support our lifesaving operations.
        </p>

        <div className="w-full relative mb-6">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">
            $
          </span>
          <input
            type="number"
            step="0.01"
            min="1"
            required
            value={amount === "0.00" ? "" : amount}
            placeholder="0.00"
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-50/70 border border-gray-100 rounded-2xl pl-10 pr-10 py-4 text-xl font-bold text-gray-700 text-left focus:outline-none focus:ring-2 focus:ring-red-100 focus:bg-white transition"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col text-gray-400 pointer-events-none text-xs">
            ▲<span className="mt-[-4px]">▼</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#7D0A0A] hover:bg-red-800 text-white font-bold text-base py-4 rounded-2xl transition shadow-md shadow-red-200 active:scale-[0.99] cursor-pointer mb-4"
        >
          Confirm & Pay
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-semibold text-gray-400 hover:text-gray-600 transition bg-transparent border-0 cursor-pointer"
        >
          Maybe later
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleFinalSubmit} className="space-y-5 text-left">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Complete Donation</h2>
        <p className="text-xs text-gray-500 mb-4">You are donating <span className="font-bold text-gray-800">${parseFloat(amount).toFixed(2)}</span></p>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Donor Name</label>
        <input
          type="text"
          required
          placeholder="e.g. John Doe"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-red-500 transition"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Card details</label>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-[48px]">
          <span className="text-xs text-gray-400 italic">[Stripe Card Component placeholder]</span>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => setPhase("amount")}
          className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm py-3 rounded-xl transition cursor-pointer"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-2/3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-300 text-white font-semibold text-sm py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <ArrowChevronRight width={16} height={16} className="animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${parseFloat(amount).toFixed(2)}`
          )}
        </button>
      </div>
    </form>
  );
}