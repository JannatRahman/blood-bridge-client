'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShieldExclamation } from '@gravity-ui/icons';
import Link from 'next/link';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 antialiased selection:bg-red-200">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in">

        {/* Gravity UI Icon Container */}
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
          <ShieldExclamation width={40} height={40} strokeWidth={1.5} />
        </div>

        {/* Header Badging */}
        <span className="inline-block text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-red-100/50">
          Error 403 • Restricted
        </span>

        {/* Typography */}
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Access Denied
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          You do not have the required permissions to view this resource. Please log in with an authorized account or contact support if you believe this is an error.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link href='/login'>
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-red-600 hover:bg-red-700 text-white 
              cursor-pointer
              font-medium text-sm py-3 px-4 rounded-xl shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Log In
            </button>
          </Link>

          <Link href='/'>
            <button
              onClick={() => router.back()}
              className="w-full bg-white 
              cursor-pointer
              hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-sm py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Go Back
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}