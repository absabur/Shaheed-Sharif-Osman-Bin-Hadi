import React from "react";
import { CompactVideo, FeaturedVideo, SectionHeader } from "./Home";
import Link from "next/link";
import { discussion } from "../../../public/videos/discussion";

const DiscussionVideo = () => {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="01"
          title="রণাঙ্গনের কন্ঠস্বর"
          sub="Frontline Battles"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          <FeaturedVideo
            title={discussion[0].source_title}
            url={discussion[0].yt_source_url}
          />
          <div className="space-y-6">
            <CompactVideo
              title={discussion[1].source_title}
              url={discussion[1].yt_source_url}
            />
            <CompactVideo
              title={discussion[2].source_title}
              url={discussion[2].yt_source_url}
            />
            <CompactVideo
              title={discussion[3].source_title}
              url={discussion[3].yt_source_url}
            />
            <Link
              href={`/videos?category=Discussion`}
              className="w-full p-5 border border-red-900/50 text-red-600 font-black hover:bg-red-700 hover:text-white transition-all uppercase tracking-[0.3em] text-[10px] rounded-2xl active:scale-95"
            >
              View Battlefield Archive
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscussionVideo;
