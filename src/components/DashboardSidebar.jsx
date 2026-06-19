import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaCalendarAlt, FaHome, FaPlus, FaSignOutAlt, FaUsers, FaUserSecret } from 'react-icons/fa';
import Logo from './Logo';
import { useSession } from '@/lib/auth-client';
import { MdDashboard, MdOutlinePublic, MdPublic } from 'react-icons/md';

const DashboardSidebar = () => {
  const { data: session } = useSession();
  const handleLogout = () => {

  }
  

  const volunteerMenu = [
    { key: "dashboard", label: "Dashboard", icon: MdDashboard, href: '/dashboard/volunteer' },

    { key: "volunteer-profile", label: "Volunteer Profile", icon: FaUsers, href: '/dashboard/volunteer/profile' },

    { key: "public-request", label: "Public Request", icon: MdPublic, href: '/dashboard/volunteer/public-request' },
    { key: "profile", label: "Profile", icon: FaUsers, href: '/dashboard/volunteer/profile' },
  ]

  const donorMenu = [
    { key: "dashboard", label: "Dashboard", icon: MdDashboard, href: '/dashboard/donor' },
    { key: "donor-profile", label: "Donor Profile", icon: FaUsers, href: '/dashboard/donor/profile' },
    { key: "my-request", label: "My Requests", icon: FaPlus, href: '/dashboard/donor/my-request' },
    { key: "create-request", label: "Create Request", icon: FaCalendarAlt, href: '/dashboard/donor/create-request' },
  ]
  const adminMenu = [
    { key: "dashboard", label: "Dashboard", icon: MdDashboard, href: '/dashboard/admin' },
    { key: "admin-profile", label: "Admin Profile", icon: FaUsers, href: '/dashboard/admin/profile' },
    { key: "my-request", label: "My Requests", icon: FaPlus, href: '/dashboard/donor/my-request' },
    { key: "create-request", label: "Create Request", icon: FaCalendarAlt, href: '/dashboard/donor/create-request' },
    { key: "all-users", label: "All Users", icon: FaUserSecret, href: '/dashboard/admin/all-users' },
    { key: "public-request", label: "Public Request", icon: MdOutlinePublic, href: '/dashboard/admin/public-request' },
  ]

  

  const menuItems = role === 'Volunteer' ? volunteerMenu : role === 'Donor' ? donorMenu : role === 'admin' ? adminMenu : null;

  // const role = session?.user?.role;

  const role = 'Volunteer' 

  return (
    <aside className="w-64 h-screen border-r border-white/5">
      <div className="h-full flex flex-col bg-[#7D0A0A] backdrop-blur-xl">
        {/* Brand / Logo */}
        <div className="px-5 py-2 border-b border-white/5 flex items-center gap-3">
          <Logo />
          <h2 className='text-white text-2xl font-bold'>BloodBridge</h2>
        </div>

        {/* User Profile */}
        <div className="px-5 py-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
              <Image
                width={40}
                height={40}
                src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent("Jane Doe")}&background=7c3aed&color=fff&bold=true`}
                alt="Avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-[15px] font-bold truncate leading-tight">
                {session?.user?.name}
              </p>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${role === "admin" ? "text-yellow-400" : role === "volunteer" ? "text-indigo-400" : role === "donor" ? "text-indigo-400 " : "text-pink-400"}`}>
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-1">
          <p className="text-sm text-slate-300 font-bold uppercase tracking-widest px-3 pb-2">Menu</p>

          {
            menuItems?.map(({ key, label, icon: Icon, href }) => {
              return (
                <Link
                  key={key}
                  href={href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left cursor-pointer text-white hover:text-slate-400 hover:bg-white/5"
                            `}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors bg-white/5 text-w hover:bg-white`}>
                    <Icon size={20} />
                  </span>
                  <span>{label}</span>


                  {/* {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-400" />} */}
                </Link>
              )
            })
          }


        </nav>

        {/* Bottom Links */}
        <div className="px-3 py-3 border-t border-white/5 space-y-1">
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150">
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <FaHome size={13} />
            </span>
            <h2 className='text-white'>Back To Site</h2>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <FaSignOutAlt size={13} />
            </span>
            <h2 className='text-white'>Sign Out</h2>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;