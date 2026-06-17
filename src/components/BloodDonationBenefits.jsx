import React from 'react';
import { Card, Tooltip, Form } from '@heroui/react';
// Importing specific icons from both sets
import { HeartFill, Gift, ScalesBalanced } from '@gravity-ui/icons';
import { BiBody } from 'react-icons/bi';
import { IoIosFitness } from 'react-icons/io';

/**
 * A Next.js component showcasing the benefits of donating blood.
 * Formatted cleanly using explicit HeroUI v3.1.0 layout standards.
 */
export default function BloodDonationBenefits() {
  return (
    <section className="bg-[#f4f6fa] py-16 px-6 md:px-12 relative overflow-hidden">
      
      {/* Premium Studio Background Blur Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-red-100/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-5%] w-[600px] h-[600px] rounded-full bg-blue-50/60 blur-[120px] pointer-events-none" />

      {/* Main Grid Wrapper */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* === Left "Why" Card === */}
        <Card className="md:col-span-4 bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[32px]">
          <Card.Content className="p-8 h-full flex flex-col justify-center">
            <Tooltip content="Be a local hero" offset={10}>
              <div className="w-14 h-14 flex items-center justify-center bg-red-50 text-red-600 rounded-2xl mb-6 border border-red-100/80 shadow-sm">
                <HeartFill className="w-7 h-7" />
              </div>
            </Tooltip>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
              Why Donate <br />
              <span className="text-red-600">Blood</span> Today?
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed pt-3">
              Beyond the amazing act of saving lives, your simple donation offers powerful health benefits for you too. It’s a transformation of your own wellness.
            </p>
          </Card.Content>
        </Card>

        {/* === Right Side Bento Grid for Benefits === */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Card 1: Free Health Checkup */}
          <Card className="bg-white/80 backdrop-blur-md border border-neutral-200/50 shadow-[0_15px_40px_rgba(0,0,0,0.03)] rounded-[24px] transition-all duration-300 hover:scale-[1.01] hover:border-red-200">
            <Card.Content className="p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-50 rounded-xl text-red-500">
                    <ScalesBalanced className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900">Complimentary Health Check</h4>
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Every donation starts with a mini-physical. We screen your blood pressure, hemoglobin, pulse, and temperature—giving you a quick snapshot of your current health.
                </p>
              </div>
              <div className="mt-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50/60 px-2.5 py-1 rounded-md border border-red-100">
                  Know Your Stats
                </span>
              </div>
            </Card.Content>
          </Card>

          {/* Card 2: Cardiovascular Wellness */}
          <Card className="bg-white/80 backdrop-blur-md border border-neutral-200/50 shadow-[0_15px_40px_rgba(0,0,0,0.03)] rounded-[24px] transition-all duration-300 hover:scale-[1.01] hover:border-red-200">
            <Card.Content className="p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-50 rounded-xl text-red-500">
                    <BiBody className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900">Heart Health Support</h4>
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Donating blood helps reduce blood viscosity, which may reduce the risk of cardiovascular disease. It manages iron levels, potentially decreasing the strain on your heart.
                </p>
              </div>
              <div className="mt-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50/60 px-2.5 py-1 rounded-md border border-red-100">
                  Pure & Smooth Flow
                </span>
              </div>
            </Card.Content>
          </Card>

          {/* Card 3: Visual Image Card */}
          <Card className="bg-white border border-neutral-200/50 shadow-[0_15px_40px_rgba(0,0,0,0.03)] rounded-[24px] overflow-hidden group">
            <Card.Content className="p-0 flex flex-col h-full">
              <div className="relative h-48 sm:h-full min-h-[200px] overflow-hidden">
                {/* Standard semantic background configuration to bypass HeroUI image dependencies safely */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512626120412-faf41adb4874?q=80&w=600&auto=format&fit=crop')" }}
                />
              </div>
              <div className="p-6 bg-white border-t border-neutral-100">
                <h3 className="text-lg font-bold text-neutral-900 mb-1">A Gift Beyond Measure</h3>
                <p className="text-neutral-500 text-xs leading-relaxed">Each donation can save up to three lives. Make your mark on your community.</p>
              </div>
            </Card.Content>
          </Card>

          {/* Card 4: Iron Management & Psychological Boost */}
          <Card className="bg-white border border-neutral-200/50 shadow-[0_15px_40px_rgba(0,0,0,0.03)] rounded-[24px]">
            <Card.Content className="p-8 space-y-6 h-full flex flex-col justify-between">
              
              {/* Part A */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-red-50 rounded-lg text-red-500">
                    <Gift className="w-4 h-4" />
                  </div>
                  <h4 className="text-md font-semibold text-neutral-900">Balance Your Iron</h4>
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Iron is essential, but too much can accumulate. Donating helps regulate excess iron, lowering oxidative stress that can damage biological tissue over time.
                </p>
              </div>

              {/* Part B */}
              <div className="space-y-2 pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-red-50 rounded-lg text-red-500">
                    <IoIosFitness className="w-4 h-4" />
                  </div>
                  <h4 className="text-md font-semibold text-neutral-900">A Powerful Mental Boost</h4>
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Knowing you’ve helped others provides a profound sense of purpose. It releases feel-good tracking hormones that reduce mental stress and elevate mood.
                </p>
              </div>

            </Card.Content>
          </Card>

        </div>
      </div>
    </section>
  );
}