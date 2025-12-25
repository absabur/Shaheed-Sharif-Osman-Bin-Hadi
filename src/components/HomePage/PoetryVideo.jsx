import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SectionHeader } from "./Home";
import { getYouTubeID } from "@/utils/ytId";
import { kobita } from "../../../public/videos/poetry";
import { getThumbnailSrc } from "@/app/videos/page";

const PoetryVideo = () => {
  return (
    <section className="py-32 bg-[#050000] px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-900/10 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        {/* Left Side: Content */}
        <div className="lg:w-1/3 sticky top-32 h-fit">
          <SectionHeader
            number="03"
            title="শব্দের বিদ্রোহ"
            sub="Poetic Resistance"
          />
          <p className="mt-8 text-zinc-500 leading-relaxed text-lg">
            তার প্রতিটি আবৃত্তি ছিল এক একটি আগ্নেয়াস্ত্র। ভিজ্যুয়াল এবং শব্দের
            মাধ্যমে তিনি ফুটিয়ে তুলতেন এক শোষিত জাতির দীর্ঘশ্বাস।
          </p>
          <Link
            href={`/videos?category=Poetry`}
            className="w-fit mt-4 flex items-center p-5 border border-red-900/50 text-red-600 font-black hover:bg-red-700 hover:text-white transition-all uppercase tracking-[0.3em] text-[10px] rounded-2xl active:scale-95"
          >
            সবগুলো ভিডিও দেখুন
            <ArrowRight
              size={18}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </div>

        {/* Right Side: Creative Video List */}
        <div className="lg:w-2/3 space-y-6">
          {kobita.slice(0, 3).map((video, i) => {
            return (
              <Link
                key={i}
                href={`/videos/${encodeURIComponent(video.source_title)}`}
                className="group relative flex items-center justify-between gap-3 p-10 rounded-[2.5rem] bg-zinc-950/50 border border-white/5 hover:border-red-700/50 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Hover Image Reveal Logic */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10">
                  <img
                    src={getThumbnailSrc(video)}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                    alt=""
                  />
                </div>

                <div className="flex items-center gap-8 z-10">
                  {/* The Index Number */}
                  <span className="text-zinc-800 font-black text-5xl group-hover:text-red-700/40 transition-colors">
                    0{i + 1}
                  </span>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-2 block opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                      {video.category}
                    </span>
                    <h5 className="text-lg font-black tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                      {video.source_title}
                    </h5>
                  </div>
                </div>

                {/* Right Side: Thumbnail & Play */}
                <div className="flex items-center gap-6 z-10">
                  <div className="hidden md:block w-32 aspect-video rounded-xl overflow-hidden border border-white/10 scale-0 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                    <img
                      src={getThumbnailSrc(video)}
                      className="w-full h-full object-cover"
                      alt={video.title}
                    />
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-zinc-500 font-black mb-2">
                      {video.length}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-600 group-hover:bg-red-700 group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700 shadow-xl">
                      <Play size={18} fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Background overlay that grows on hover */}
                <div
                  className={`absolute inset-0 ${video.color} translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-20`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PoetryVideo;
