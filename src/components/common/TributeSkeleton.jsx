import React from "react";
import { Home, MessageCircle, Quote } from "lucide-react";
import BackSection from "./BackSection";
import Link from "next/link";

const TributeSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#050000] text-white pb-32 pt-32 px-6">
      <div className="max-w-[1400px] px-6 mx-auto">
        <BackSection
          links={[{ path: "/", text: "", icon: <Home size={15} /> }]}
          current={`Tributes`}
        />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 flex items-center justify-center md:justify-start gap-2">
              <span className="w-12 h-px bg-red-600 hidden md:block"></span>
              Digital Memorial
            </h3>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none italic">
              শ্রদ্ধাঞ্জলি <br />
              <span className="text-zinc-800 not-italic">আর্কাইভ</span>
            </h2>
          </div>
          <Link
            href="/tributes/add"
            className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-700 hover:text-white transition-all duration-500 shadow-xl"
          >
            <MessageCircle size={14} /> শ্রদ্ধা নিবেদন করুন
          </Link>
        </div>

        {/* Timeline Layout Skeleton */}
        <div className="relative mb-20">
          {/* Central Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-zinc-900 md:-translate-x-1/2 hidden sm:block"></div>

          <div className="space-y-12">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={item}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                } animate-pulse`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-12 w-3 h-3 rounded-full bg-zinc-800 border-4 border-[#050000] z-10 md:-translate-x-1/2 hidden sm:block"></div>

                <div className="md:w-1/2 w-full">
                  <div className="bg-zinc-950/50 border border-white/10 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden h-[300px]">
                    {/* Decorative Quote Icon Placeholder */}
                    <Quote
                      className="absolute right-6 top-6 text-zinc-900/50"
                      size={80}
                    />

                    <div className="relative z-10 space-y-4">
                      {/* Name & Relation */}
                      <div className="space-y-2">
                        <div className="h-6 w-40 bg-zinc-900 rounded"></div>
                        <div className="h-4 w-20 bg-zinc-900 rounded"></div>
                      </div>

                      {/* Message Lines */}
                      <div className="pt-6 space-y-3">
                        <div className="h-4 w-full bg-zinc-900 rounded"></div>
                        <div className="h-4 w-full bg-zinc-900 rounded"></div>
                        <div className="h-4 w-2/3 bg-zinc-900 rounded"></div>
                      </div>

                      {/* Footer Metadata */}
                      <div className="pt-8 mt-4 border-t border-white/10 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-zinc-900 rounded-full"></div>
                          <div className="h-3 w-24 bg-zinc-900 rounded"></div>
                        </div>
                        <div className="h-3 w-32 bg-zinc-900 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Empty space for alternating layout */}
                <div className="md:w-1/2 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-12 animate-pulse">
          <div className="flex gap-2">
            {[1, 2, 3].map((p) => (
              <div key={p} className="w-10 h-10 bg-zinc-900 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TributeSkeleton;
