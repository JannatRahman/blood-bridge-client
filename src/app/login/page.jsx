'use client'
import React, { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Button, Input, } from '@heroui/react';
import { Envelope, Shield, Heart } from '@gravity-ui/icons';
import { useForm } from 'react-hook-form';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const { data: signInData, error: signInError } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      console.log(signInData, signInError, 'data')

      if (signInError) {
        toast.error('Login failed')
      } else {
        toast.success('Login successful')
      }
    } finally {
      redirect('/')
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 md:p-8 font-sans relative overflow-hidden">


      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#7A1111]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#3D0808]/5 blur-3xl pointer-events-none" />

      {/* Main Centered Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 relative z-10">

        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#7A1111] flex items-center justify-center text-white shadow-sm">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-800">Blood Bridge</span>
        </div>

        {/* Header Text */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#7A1111] mb-1">Welcome Back</h1>
          <p className="text-gray-400 text-xs">Please enter your credentials to access your account</p>
        </div>



        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-xs font-semibold mb-1.5 ">Email Address</label>
            <Input
              {...register("email", { required: 'Email is required' })}
              className='w-full'
              type="email"
              placeholder="Enter Your Email"
              variant="bordered"
              radius="md"
              size="sm"
              startContent={<Envelope className="text-gray-400 text-base flex-shrink-0 w-full" />}
              classNames={{
                inputWrapper: "border-gray-200 hover:border-gray-400 focus-within:!border-[#7A1111] h-11 bg-white",
                input: "text-gray-900 text-sm placeholder:text-gray-400",
              }}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-gray-700 text-xs font-semibold">Password</label>

            </div>
            <Input
              {...register("password", { required: 'Password is required' })}
              className='w-full'
              type="password"
              placeholder="••••••••"
              variant="bordered"
              radius="md"
              size="sm"
              startContent={<Shield className="text-gray-400 text-base flex-shrink-0" />}
              classNames={{
                inputWrapper: "border-gray-200 hover:border-gray-400 focus-within:!border-[#7A1111] h-11 bg-white",
                input: "text-gray-900 text-sm placeholder:text-gray-400",
              }}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-[#7A1111] hover:bg-[#5F0D0D] text-white font-bold rounded-md text-sm mt-2 transition-colors shadow-sm"
          >
            Complete Login
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-gray-400 text-[10px] font-medium uppercase tracking-wider">Or Connect With</span>
          <div className="flex-grow border-t border-gray-200"></div>
          
        </div>

        {/* Social Logins */}
        <div className="flex justify-center gap-3 mb-6">
          <button type="button" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.214 1.751 15.46 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.34 0 10.564-4.455 10.564-10.75 0-.725-.078-1.275-.173-1.685H12.24z" />
            </svg>
          </button>
          

        </div>
        
        <p className="text-center text-sm text-slate-600 mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-red-800 hover:text-red-900 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>

        {/* Info Footer */}
        <p className=" text-sm text-slate-600 mt-6  text-center leading-relaxed">
          Create an account to become a donor and save lives. Join our network of heroes today.
        </p>
      </div>

    </div>
  );
}