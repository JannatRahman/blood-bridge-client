"use client";

import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "../../public/logo.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      className="w-full border-t border-white/10 px-6 pt-16 pb-8 mt-auto font-sans text-white" 
      style={{ backgroundColor: "#7D0A0A" }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* UPPER MAIN SECTION */}
        <div className="grid  md:grid-cols-12  pb-12 ">
          
          {/* LEFT SIDE: LOTTIE ANIMATION LOGO */}
          <div className="md:col-span-5 flex justify-start items-center ">
            <div className="w-50 h-50 flex items-center justify-between">
              <Lottie
                animationData={animationData}
                loop={true}
                style={{ width: 200, height: 200 }}
              />
            </div>
          </div>

          {/* RIGHT SIDE: TEXT COLUMNS */}
          <div className="md:col-span-7 w-full">
            {/* Large Brand Title */}
            <h2 className="text-4xl font-normal tracking-tight mb-10 text-left">
              ClosetNow
            </h2>

            {/* Links Columns Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
              {/* Column 1 */}
              <div>
                <h3 className="text-base font-medium mb-4 text-white/90">About Us</h3>
                <div className="flex flex-col gap-2 text-xs text-rose-200/60 font-light">
                  <Link href="/mission" className="hover:text-white transition">Mission</Link>
                  <Link href="/team" className="hover:text-white transition">Team</Link>
                  <Link href="/newsletter" className="hover:text-white transition">Newsletter</Link>
                </div>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="text-base font-medium mb-4 text-white/90">Support</h3>
                <div className="flex flex-col gap-2 text-xs text-rose-200/60 font-light">
                  <Link href="/contact" className="hover:text-white transition">Contact</Link>
                  <Link href="/refund-policy" className="hover:text-white transition">Refund Policy</Link>
                  <Link href="/faq" className="hover:text-white transition">FAQ&apos;s</Link>
                </div>
              </div>

              {/* Column 3 */}
              <div className="col-span-2 sm:col-span-1">
                <h3 className="text-base font-medium mb-4 text-white/90">Social</h3>
                <div className="flex flex-col gap-2 text-xs text-rose-200/60 font-light">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition">Instagram</a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition">YouTube</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* LOWER SECTION: SUB-FOOTER BAR */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-200/50 font-light">
          <div>
            Copyright &copy; ClosetNow {currentYear}
          </div>
          
          <div>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition group focus:outline-none"
          >
            <span>Back to top</span>
            <div className="border border-white/20 p-1 rounded-sm group-hover:border-white transition">
              <FaArrowUp className="text-[10px]" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}