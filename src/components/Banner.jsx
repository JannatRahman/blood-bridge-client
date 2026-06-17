import React from 'react';
import { Button } from '@heroui/react'; // Adjust import path based on your HeroUI setup (e.g., '@nextui-org/react' if using the older package name)
import { FiUsers, FiHeart, FiArrowRight, FiEye } from 'react-icons/fi';
import { BiDollar } from 'react-icons/bi';

export default function Banner() {
  return (
    <section className="relative min-h-[600px] w-full overflow-hidden rounded-b-[40px] bg-black text-white">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-lighten"
        style={{ backgroundImage: "url('/banner.jpg')" }} // Ensure your image is in the public folder as banner.jpg
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-[600px] pt-16 px-4 max-w-6xl mx-auto text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-neutral-900/80 border border-neutral-700/50 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium tracking-wide">
          <FiHeart className="text-red-500 fill-red-500 animate-pulse" size={12} />
          <span>Trusted by 15+ Local Heroes</span>
        </div>

        {/* Hero Typography & CTA */}
        <div className="max-w-3xl my-auto py-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Saving Lives, <br />
            <span className="text-red-500">One Drop</span> at a Time
          </h1>
          
          <p className="text-neutral-300 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Connect directly with 19 pending requests or join our community of 
            donors to help save more lives.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 h-12 rounded-xl shadow-lg shadow-red-500/20"
              endContent={<FiArrowRight />}
            >
              Become a Donor
            </Button>
            <Button 
              variant="bordered"
              className="border-neutral-500/50 hover:border-white text-white font-medium px-8 h-12 rounded-xl backdrop-blur-sm bg-white/5"
              endContent={<FiEye className="opacity-80" />}
            >
              Search Donors
            </Button>
          </div>
        </div>

        {/* Bottom Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl translate-y-6 md:translate-y-8 mt-auto">
          
          {/* Card 1: Active Donors */}
          <div className="bg-white text-neutral-900 rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl border border-neutral-100">
            <div className="p-2.5 bg-red-50 rounded-xl text-red-500 mb-2">
              <FiUsers size={20} />
            </div>
            <span className="text-3xl font-black tracking-tight">15+</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mt-1">Active Donors</span>
          </div>

          {/* Card 2: Total Funding */}
          <div className="bg-white text-neutral-900 rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl border border-neutral-100">
            <div className="p-2.5 bg-red-50 rounded-xl text-red-500 mb-2">
              <BiDollar size={20} />
            </div>
            <span className="text-3xl font-black tracking-tight">$12,886</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mt-1">Total Funding</span>
          </div>

          {/* Card 3: Total Requests */}
          <div className="bg-white text-neutral-900 rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl border border-neutral-100">
            <div className="p-2.5 bg-red-50 rounded-xl text-red-500 mb-2">
              <FiHeart size={20} />
            </div>
            <span className="text-3xl font-black tracking-tight">19</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mt-1">Total Requests</span>
          </div>

        </div>

      </div>
    </section>
  );
}