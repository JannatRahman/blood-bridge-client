"use client";

import Link from "next/link";
import { FaArrowUp, FaGithub, FaLinkedin, FaYoutube, FaFacebookF, FaPhoneAlt, FaEnvelope, FaHeart } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "../../public/logo.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-white/10 relative overflow-hidden mt-auto font-sans text-white bg-gradient-to-b from-[#610808] via-[#4A0707] to-[#2D0404]">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        {/* UPPER BANNER / CTA CARD */}
        <div className="mb-12 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300 shrink-0">
              <FaHeart className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Need Urgent Blood Assistance?</h3>
              <p className="text-xs text-rose-200/70 mt-1">Our network of verified donors is available across Bangladesh 24/7.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/search-donor"
              className="w-full md:w-auto px-6 py-3 bg-white text-[#610808] hover:bg-rose-100 font-bold text-xs rounded-xl shadow-lg transition-all text-center"
            >
              Search Donors
            </Link>
            <Link
              href="/requests"
              className="w-full md:w-auto px-6 py-3 bg-red-700/80 hover:bg-red-700 text-white font-bold text-xs rounded-xl border border-white/20 shadow-lg transition-all text-center"
            >
              View Requests
            </Link>
          </div>
        </div>

        {/* MAIN GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* BRAND & ANIMATION COLUMN */}
          <div className="md:col-span-4 flex flex-col items-start space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  style={{ width: 48, height: 48 }}
                />
              </div>
              <div className="font-sans tracking-tight text-white">
                <span className="text-2xl font-black tracking-wider">BLOOD</span>
                <span className="text-2xl font-light text-rose-200/90 ml-1">BRIDGE</span>
              </div>
            </Link>

            <p className="text-xs text-rose-200/70 leading-relaxed max-w-sm">
              BloodBridge is a digital platform dedicated to streamlining life-saving blood donations, connecting active donors, volunteers, and patients across Bangladesh swiftly and securely.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-rose-200/80">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-rose-400 text-xs shrink-0" />
                <span>Helpline: +880 1800-BLOOD (25663)</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-rose-400 text-xs shrink-0" />
                <span>Support: support@bloodbridge.org</span>
              </div>
            </div>
          </div>

          {/* NAVIGATION LINKS COLUMNS */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs text-rose-200/70">
                <li>
                  <Link href="/" className="hover:text-white transition flex items-center gap-1.5">
                    <span className="text-rose-400">›</span> Home
                  </Link>
                </li>
                <li>
                  <Link href="/requests" className="hover:text-white transition flex items-center gap-1.5">
                    <span className="text-rose-400">›</span> Donation Requests
                  </Link>
                </li>
                <li>
                  <Link href="/search-donor" className="hover:text-white transition flex items-center gap-1.5">
                    <span className="text-rose-400">›</span> Find Donors
                  </Link>
                </li>
                <li>
                  <Link href="/funding" className="hover:text-white transition flex items-center gap-1.5">
                    <span className="text-rose-400">›</span> Support & Funding
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Dashboard & Community */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                Community
              </h4>
              <ul className="space-y-2.5 text-xs text-rose-200/70">
                <li>
                  <Link href="/register" className="hover:text-white transition flex items-center gap-1.5">
                    <span className="text-rose-400">›</span> Register as Donor
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition flex items-center gap-1.5">
                    <span className="text-rose-400">›</span> Login Terminal
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white transition flex items-center gap-1.5">
                    <span className="text-rose-400">›</span> My Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/unauthorized" className="hover:text-white transition flex items-center gap-1.5">
                    <span className="text-rose-400">›</span> Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Social & Connect */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                Connect With Us
              </h4>
              <p className="text-xs text-rose-200/70 mb-4 leading-relaxed">
                Follow our official channels for real-time donor drives and blood bank alerts.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/JannatRahman"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white hover:text-[#610808] border border-white/10 flex items-center justify-center transition-all duration-200 shadow-sm"
                  aria-label="GitHub"
                >
                  <FaGithub size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/jannat-amila-rahman/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white hover:text-[#610808] border border-white/10 flex items-center justify-center transition-all duration-200 shadow-sm"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={16} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white hover:text-[#610808] border border-white/10 flex items-center justify-center transition-all duration-200 shadow-sm"
                  aria-label="YouTube"
                >
                  <FaYoutube size={16} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white hover:text-[#610808] border border-white/10 flex items-center justify-center transition-all duration-200 shadow-sm"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={14} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* LOWER SECTION: SUB-FOOTER BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-200/60 font-light">
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} <strong className="font-bold text-white">BloodBridge</strong>. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition">Privacy Policy</Link>
            <span>•</span>
            <Link href="/" className="hover:text-white transition">Terms of Service</Link>
            <span>•</span>
            <Link href="/" className="hover:text-white transition">Security</Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer group active:scale-95"
          >
            <span className="text-xs font-medium">Back to top</span>
            <FaArrowUp className="text-[10px] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}