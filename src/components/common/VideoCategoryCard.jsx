"use client";
import React from "react";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import { videoCategories } from "@/data/videos";

const VideoCategoryCards = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 mb-20">
      {/* HEADER FOR HOMEPAGE SECTION */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h3 className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px] mb-5">
            Browse Archives
          </h3>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic text-white">
            ভিডিও <span className="text-zinc-800 not-italic">ক্যাটাগরি</span>
          </h2>
        </div>
        <Link
          href="/videos"
          className="text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group transition-all"
        >
          View All{" "}
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* UNIQUE CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videoCategories
          .filter((cat) => cat.id !== "All")
          .map((cat) => (
            <Link
              key={cat.id}
              href={`/videos?category=${cat.id}`}
              className="group relative h-48 bg-zinc-950 rounded-3xl overflow-hidden border border-white/5 hover:border-red-600/50 transition-all duration-700 shadow-2xl"
            >
              {/* Background Decorative Element */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-50" />

              {/* Hover Background Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-600/10 blur-[50px] group-hover:bg-red-600/20 transition-all duration-700" />

              <div className="relative h-full p-8 flex flex-col justify-between z-10">
                {/* Top Row: Icon and Count */}
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-red-700 group-hover:border-red-600 transition-all duration-500">
                    <Play size={16} className="text-white fill-current" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-black text-white tabular-nums">
                      {cat.videos?.length || 0}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Label */}
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-zinc-400 group-hover:text-white transition-colors duration-500 tracking-tighter leading-none">
                    {cat.label.split("(")[0]} {/* Bengali Part */}
                  </h4>
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
                    {cat.label.split("(")[1]?.split(")")[0] || cat.id}{" "}
                    Collection
                  </p>
                </div>
              </div>

              {/* Cinematic Slide Overlay */}
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-red-700 transition-transform duration-500 ease-out z-0 flex items-center justify-center">
                <span className="text-white font-black uppercase text-xs tracking-widest">
                  গ্যালারি দেখুন
                </span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default VideoCategoryCards;
