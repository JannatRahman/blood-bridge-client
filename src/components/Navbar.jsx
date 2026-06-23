"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaSignOutAlt, FaThLarge, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "./Logo";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    toast('Logged Out');
  };

  const getLinkClass = (path) => {
    const base = "text-xs font-medium tracking-wide transition-all duration-200 px-5 py-2.5 rounded-full text-center";
    if (pathname === path) {
      return `${base} text-white bg-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10`;
    }
    return `${base} text-rose-200/70 hover:text-white`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-md px-6 py-4" style={{ backgroundColor: 'rgba(125, 10, 10, 0.92)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO SECTION */}
        <div className="flex items-center gap-3">
          <div className="h-8 flex items-center justify-center transform rotate-12">
            <Logo />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white font-sans">
            Blood Bridge
          </span>
        </div>

        {/* CENTER NAVIGATION LINKS (DESKTOP) */}
        <div className="hidden md:flex items-center bg-black/30 border border-white/10 p-1 rounded-full shadow-inner">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/requests" className={getLinkClass("/requests")}>
            Donation Requests
          </Link>
          
          {session && session?.user && (
            <Link
              href={`/funding`}
              className={`text-xs font-medium tracking-wide transition-all duration-200 px-5 py-2.5 rounded-full text-center ${pathname.startsWith("/funding") ? "text-white bg-white/15" : "text-rose-200/70 hover:text-white"}`}
            >
              Funding
            </Link>
          )}
        </div>

        {/* RIGHT ACTIONS (DESKTOP) */}
        <div className="hidden md:flex items-center gap-7">
          {!session && (
            <div className="flex gap-5">
              <Link href='/login'>
                <button className="relative inline-flex items-center justify-center text-sm font-medium text-white bg-black/20 hover:bg-black/40 h-10 px-7 rounded-full border border-white/10 transition shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] active:scale-[0.98]">
                  Login
                </button>
              </Link>
              <Link
                href='/register'
                className="relative inline-flex bg-[#BF3131] items-center justify-center text-sm font-medium text-white hover:bg-[#7D0A0A] h-10 px-6 rounded-full border border-white/10 transition shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] active:scale-[0.98]">
                Sign Up
              </Link>
            </div>
          )}

          {session && session?.user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center transition-transform hover:scale-105 outline-none focus:outline-none cursor-pointer"
              >
                <p className="p-3 text-white text-xs">Welcome, {session.user.name}</p>
                <Image
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-md"
                  src={session.user.image || "/fallback-avatar.png"}
                  alt="avatar"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl py-2 z-50" style={{ backgroundColor: '#610808' }}>
                  <div className="px-4 py-2.5 border-b border-white/10 mb-1.5 cursor-default">
                    <p className="text-[10px] text-rose-300 font-bold uppercase tracking-wider">
                      {session.user.role} Account
                    </p>
                    <p className="font-bold text-white text-sm mt-0.5">{session.user.name}</p>
                    <p className="text-[11px] text-rose-200/70 truncate mt-0.5">{session.user.email}</p>
                  </div>

                  <Link
                    href={`/dashboard/${session.user.role.toLowerCase()}`}
                    onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-rose-100 hover:text-white hover:bg-white/10 transition"
                  >
                    <FaThLarge className="text-rose-300 text-sm shrink-0" />
                    <span>My Dashboard</span>
                  </Link>

                  <div className="border-t border-white/10 my-1.5" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-rose-200 hover:text-white hover:bg-red-500/20 transition cursor-pointer"
                  >
                    <FaSignOutAlt className="text-sm shrink-0" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER BUTTON (FIXED: Added this block) */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white text-xl p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 shadow-xl" style={{ backgroundColor: '#610808' }}>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-xl text-sm ${pathname === "/" ? "bg-white/15 text-white" : "text-rose-200/80"}`}
          >
            Home
          </Link>
          <Link
            href="/requests"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-xl text-sm ${pathname === "/requests" ? "bg-white/15 text-white" : "text-rose-200/80"}`}
          >
            Donation Requests
          </Link>
          

          {session && session?.user && (
            <Link
              href={`/dashboard/${session.user.role.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2 rounded-xl text-sm ${pathname.startsWith("/dashboard") ? "bg-white/15 text-white" : "text-rose-200/80"}`}
            >
              Dashboard
            </Link>
          )}

          <div className="border-t border-white/10 my-1"></div>

          {/* Authentication states for mobile drawer */}
          {!session ? (
            <div className="flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <button className="w-full text-center text-xs font-medium text-white bg-white/10 py-3 rounded-xl border border-white/10 cursor-pointer">
                  Login
                </button>
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <button className="w-full text-center text-xs font-medium text-white bg-[#BF3131] py-3 rounded-xl border border-white/10 cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-rose-200 bg-red-500/10 hover:bg-red-500/20 transition cursor-pointer"
            >
              <FaSignOutAlt className="text-sm" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
}