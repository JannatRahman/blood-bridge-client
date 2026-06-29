'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Added to track active link
import { FaCalendarAlt, FaHome, FaPlus, FaSignOutAlt, FaUsers, FaUserSecret, FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import { authClient, useSession } from '@/lib/auth-client';
import { MdDashboard, MdOutlinePublic, MdPublic } from 'react-icons/md';

import toast from 'react-hot-toast';

const DashboardSidebar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the active route path
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    toast('Logged Out');
  };

  const volunteerMenu = [
    { key: "dashboard", label: "Dashboard", icon: MdDashboard, href: '/dashboard/volunteer' },
    { key: "public-request", label: "Public Request", icon: MdPublic, href: '/dashboard/volunteer/public-request' },
  ];

  const donorMenu = [
    { key: "dashboard", label: "Dashboard", icon: MdDashboard, href: '/dashboard/donor' },
    { key: "profile", label: "Profile", icon: FaUsers, href: '/dashboard/donor/profile' },
    { key: "my-request", label: "My Requests", icon: FaPlus, href: '/dashboard/donor/my-request' },
    { key: "create-request", label: "Create Request", icon: FaCalendarAlt, href: '/dashboard/donor/create-request' },
  ];

  const adminMenu = [
    { key: "dashboard", label: "Dashboard", icon: MdDashboard, href: '/dashboard/admin' },
    { key: "profile", label: "Profile", icon: FaUsers, href: '/dashboard/admin/profile' },


    { key: "all-users", label: "All Users", icon: FaUserSecret, href: '/dashboard/admin/all-users' },
    { key: "public-request", label: "Public Request", icon: MdOutlinePublic, href: '/dashboard/admin/public-request' },
  ];

  const role = session?.user?.role;
  const normalizedRole = role ? role.toLowerCase() : '';

  const menuItems = normalizedRole === 'volunteer'
    ? volunteerMenu
    : normalizedRole === 'donor'
      ? donorMenu
      : normalizedRole === 'admin'
        ? adminMenu
        : [];

  const renderSidebarContent = () => (
    <div className="h-full flex flex-col bg-[#7D0A0A] backdrop-blur-xl">
      {/* Brand / Logo */}
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Logo />
          <Link href={'/'} className="flex items-center gap-2 group">
            {/* Modern Drop/Bridge Icon */}


            {/* Typographic Logo */}
            <div className="font-sans tracking-tight text-white">
              <span className="text-xl font-extrabold tracking-wide">BLOOD</span>
              <span className="text-xl font-light text-white/90">BRIDGE</span>
            </div>
          </Link>
        </div>
        <button className="md:hidden text-white cursor-pointer" onClick={() => setIsOpen(false)}>
          <FaTimes size={20} />
        </button>
      </div>

      {/* User Profile */}
      <div className="px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
            <Image
              width={40}
              height={40}
              src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || "User")}&background=7c3aed&color=fff&bold=true`}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-[15px] font-bold truncate leading-tight">
              {session?.user?.name || "Jane Doe"}
            </p>
            <span className={`text-[11px] font-bold uppercase tracking-wider ${normalizedRole === "admin" ? "text-yellow-400" : "text-indigo-400"}`}>
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-1">
        <p className="text-sm text-slate-300 font-bold uppercase tracking-widest px-3 pb-2">Menu</p>
        {menuItems.map(({ key, label, icon: Icon, href }) => {
          // Check if the link route strictly matches or starts with the item's href path
          const isActive = pathname === href;

          return (
            <Link
              key={key}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left ${isActive
                ? "bg-white text-[#7D0A0A] shadow-md"
                : "text-white hover:text-slate-200 hover:bg-white/5"
                }`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? "bg-[#7D0A0A]/10 text-[#7D0A0A]" : "bg-white/5"
                }`}>
                <Icon size={20} />
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Links */}
      <div className="px-3 py-3 border-t border-white/5 space-y-1">
        <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150">
          <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <FaHome size={13} />
          </span>
          <h2 className="text-white">Back To Site</h2>
        </Link>
        <Link href={'/login'}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <FaSignOutAlt size={13} />
            </span>
            <h2 className="text-white">Sign Out</h2>
          </button></Link>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. MOBILE HEADER BAR */}
      <div className="md:hidden flex items-center justify-between bg-[#7D0A0A] text-white px-4 py-3 sticky top-0 z-40 shadow-md w-full">
        <div className="flex items-center gap-2">
          <Logo />
          <h2 className="text-xl font-bold">BloodBridge</h2>
        </div>
        <button onClick={() => setIsOpen(true)} className="p-2 focus:outline-none cursor-pointer">
          <FaBars size={22} />
        </button>
      </div>

      {/* 2. MOBILE OVERLAY + DRAWER PANEL */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
        <aside className={`absolute top-0 left-0 w-64 h-full transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          {renderSidebarContent()}
        </aside>
      </div>

      {/* 3. DESKTOP PERMANENT SIDEBAR */}
      <aside className="hidden md:block w-64 h-screen border-r border-white/5 sticky top-0 shrink-0">
        {renderSidebarContent()}
      </aside>
    </>
  );
};

export default DashboardSidebar;