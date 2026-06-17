'use client'
import React from 'react';
import { Card, Button, Input, TextArea, Form, TextField, Label } from '@heroui/react';
import { FiX, FiPhone, FiSend } from 'react-icons/fi';

export default function ContactUs() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-[#F3EDC8 overflow-hidden">
      
      {/* Decorative Professional Studio Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-orange-100/50 blur-[120px] pointer-events-none" />

      {/* Main Floating Container */}
      <Card 
        className="w-full max-w-5xl min-h-[650px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_24px_70px_rgba(0,0,0,0.07)] rounded-[32px] overflow-hidden"
      >
        {/* Compound API Architecture layout container */}
        <Card.Content className="p-0 grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Isometric Floating Visual (5 Cols) */}
          <div className="relative lg:col-span-5 hidden lg:flex flex-col justify-between p-8 bg-gradient-to-b from-neutral-100/50 to-neutral-200/30 border-r border-white/40 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-95 transition-transform duration-700 hover:scale-105"
              style={{ 
                backgroundImage: "url('/images/contactImage.jpg')",
                backgroundPosition: 'center 45%' 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 pointer-events-none" />
          </div>

          {/* Right Column: Premium Form Section (7 Cols) */}
          <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-white/40 backdrop-blur-md">
            
            {/* Top Action Row */}
            <div className="flex justify-between items-center w-full mb-8">
              {/* Contact Number Pill */}
              <a 
                href="tel:+1234567890" 
                className="group flex items-center gap-2.5 bg-white/80 hover:bg-neutral-900 border border-neutral-200/50 hover:border-neutral-900 px-3.5 py-1.5 rounded-full transition-all duration-300 shadow-sm"
              >
                <FiPhone size={13} className="text-neutral-600 group-hover:text-white transition-colors" />
                <span className="text-xs font-semibold text-neutral-700 group-hover:text-white transition-colors">+1 (234) 567-890</span>
              </a>

              {/* Close Button Glass Pill */}
            
            </div>

            {/* Typography Content */}
            <div className="space-y-3 mb-8">
              <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900">
                Contact Us
              </h1>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-md">
                Have questions or need assistance? Reach out to our team — we're here to help you find the right solutions.
              </p>
            </div>

            {/* Premium Capsule Form */}
            <Form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              
              {/* Name Field */}
              <TextField className="w-full flex flex-col">
                <Label className="text-neutral-700 text-xs font-semibold mb-1.5">Name</Label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  variant="secondary"
                  className="w-full bg-white/80 backdrop-blur-sm border border-neutral-200/60 hover:border-neutral-300 focus-within:!border-neutral-950 transition-all h-11 px-3 rounded-xl shadow-sm text-sm text-neutral-800 placeholder:text-neutral-400 outline-none"
                />
              </TextField>

              {/* Email Field */}
              <TextField className="w-full flex flex-col" type="email">
                <Label className="text-neutral-700 text-xs font-semibold mb-1.5">Email</Label>
                <Input
                  placeholder="temp@gmail.com"
                  variant="secondary"
                  className="w-full bg-white/80 backdrop-blur-sm border border-neutral-200/60 hover:border-neutral-300 focus-within:!border-neutral-950 transition-all h-11 px-3 rounded-xl shadow-sm text-sm text-neutral-800 placeholder:text-neutral-400 outline-none"
                />
              </TextField>

              {/* Question Field */}
              <TextField className="w-full flex flex-col">
                <Label className="text-neutral-700 text-xs font-semibold mb-1.5">Your question</Label>
                <TextArea
                  placeholder="Type your message here..."
                  variant="secondary"
                  rows={4}
                  className="w-full bg-white/80 backdrop-blur-sm border border-neutral-200/60 hover:border-neutral-300 focus-within:!border-neutral-950 transition-all p-3 rounded-xl shadow-sm text-sm text-neutral-800 placeholder:text-neutral-400 resize-none outline-none"
                />
              </TextField>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit"
                  size="lg"
                  radius="lg"
                  className="w-full sm:w-auto bg-neutral-950 hover:bg-neutral-800 text-white font-medium px-8 h-11 transition-all duration-300 shadow-md shadow-neutral-950/10 tracking-wide text-xs"
                  endContent={<FiSend size={12} className="opacity-80" />}
                >
                  Send Message
                </Button>
              </div>

            </Form>

          </div>
        </Card.Content>
      </Card>
    </section>
  );
}