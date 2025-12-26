"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl py-3 shadow-2xl border-b border-white/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        <Link href={`/`} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center font-black text-xl shadow-lg shadow-red-700/30 rotate-3">
            হ
          </div>
          <div>
            <h1 className="text-lg text-white tracking-tighter leading-none">
              OSMAN HADI
            </h1>
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-[0.2em]">
              Legacy Archive
            </p>
          </div>
        </Link>

        <div className="ml-auto hidden lg:flex items-center gap-10 text-sm font-bold tracking-wide text-zinc-400">
          <Link
            href="/bio"
            className="hover:text-red-500 transition-colors uppercase"
          >
            জীবনী
          </Link>
          <Link
            href="/গ্যালারি "
            className="hover:text-red-500 transition-colors uppercase"
          >
            ছবি
          </Link>
          <Link
            href="/videos"
            className="hover:text-red-500 transition-colors uppercase"
          >
            ভিডিও
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="lg:hidden text-zinc-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-black p-6 animate-in slide-in-from-top duration-300 flex flex-col">
          <div className="flex justify-between items-center mb-16">
            <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center font-black">
              হ
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white"
            >
              <X size={40} />
            </button>
          </div>
          <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase">
            <a href="#biography" onClick={() => setMobileMenuOpen(false)}>
              Biography
            </a>
            <a href="#vision" onClick={() => setMobileMenuOpen(false)}>
              Vision
            </a>
            <a href="#vault" onClick={() => setMobileMenuOpen(false)}>
              Videos
            </a>
            <a href="#poetry" onClick={() => setMobileMenuOpen(false)}>
              Literature
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
