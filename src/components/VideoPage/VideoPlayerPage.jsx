import React from "react";
import {
  Youtube,
  Facebook,
  HardDrive,
  Shield,
  ExternalLink,
} from "lucide-react";
import { getYouTubeID } from "@/utils/ytId";
import Link from "next/link";
import { videoCategories } from "@/app/videos/page";

// Next.js Server Components receive params and searchParams as props

const VideoPlayerPage = async ({ params, searchParams }) => {
  // Await params in Next.js 15+
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const videoTitle = decodeURIComponent(resolvedParams?.video);

  // Data finding logic on the server
  const allVideos =
    videoCategories.find((item) => item.id == "All")?.videos || [];
  const video = allVideos.find((item) => item.source_title === videoTitle);

  if (!video) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Video not found
      </div>
    );
  }

  const sources = [
    {
      id: "youtube_original",
      label: "YouTube (Source)",
      icon: <Youtube size={16} />,
      url: video.yt_source_url,
    },
    {
      id: "facebook_orginal",
      label: "Facebook (Source)",
      icon: <Facebook size={16} />,
      url: video.fb_url,
    },
    {
      id: "drive",
      label: "Google Drive",
      icon: <HardDrive size={16} />,
      url: video.drive_url,
    },
    {
      id: "youtube_personal",
      label: "Youtube (Backup)",
      icon: <Shield size={16} />,
      url: video.yt_personal_url,
    },
  ];

  const activeSource =
    resolvedSearchParams?.source || sources.find((item) => item.url != "").id;

  const getEmbedUrl = (sourceId) => {
    switch (sourceId) {
      case "youtube_original":
        return `https://www.youtube.com/embed/${getYouTubeID(
          video?.yt_source_url
        )}?rel=0`;
      case "youtube_personal":
        return `https://www.youtube.com/embed/${getYouTubeID(
          video?.yt_personal_url
        )}?rel=0`;
      case "facebook_orginal":
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
          video?.fb_url
        )}&show_text=0&width=900&height=600`;
      case "drive":
        if (!video?.drive_url) return "";
        const driveId = video.drive_url.match(/[-\w]{25,}/);
        return driveId
          ? `https://drive.google.com/file/d/${driveId[0]}/preview`
          : video.drive_url;
      default:
        return "";
    }
  };

  const isFacebook = activeSource === "facebook_orginal";
  const isDrive = activeSource === "drive";

  return (
    <div className="min-h-screen bg-[#050000] text-white selection:bg-red-600/40 font-sans">
      <main className="pt-28 pb-20 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-3">
          <div className="space-y-8">
            {/* SOURCE SWITCHER (Now using Links instead of Buttons) */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sources.map((src) => {
                  if (src.url) {
                    const isActive = activeSource === src.id;
                    return (
                      <Link
                        key={src.id}
                        // Use scroll={false} to prevent jumping to top on click
                        scroll={false}
                        href={`?source=${src.id}`}
                        className={`flex items-center justify-center gap-3 p-5 rounded-3xl border transition-all text-[10px] font-black uppercase tracking-widest ${
                          isActive
                            ? "bg-red-700 border-red-600 text-white shadow-xl shadow-red-700/20 scale-[1.02]"
                            : "bg-zinc-950 border-white/5 text-zinc-500 hover:border-red-900/50 hover:text-zinc-300"
                        }`}
                      >
                        {src.icon} {src.label}
                      </Link>
                    );
                  }
                  return null;
                })}
              </div>
              <h3 className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 px-2">
                <ExternalLink size={12} /> ভিডিও না পাওয়া গেলেঅন্য উৎস সিলেক্ট
                করুন
                {isFacebook && (
                  <Link
                    className="z-30 group/fb"
                    target="_blank"
                    href={video.fb_url}
                  >
                    <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full transition-all duration-300 hover:border-red-600/50 hover:bg-black/80">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover/fb:text-white transition-colors">
                        অথবা এখানে ক্লিক করুন
                      </span>
                    </div>
                  </Link>
                )}
                {isDrive && (
                  <GetDriveDownloadLink
                    from={`top`}
                    driveUrl={getEmbedUrl(activeSource)}
                  />
                )}
              </h3>
            </div>

            <div
              className={`relative bg-black rounded-lg border border-red-700/20 shadow-2xl shadow-red-900/5 ${
                isFacebook ? "overflow-visible" : "overflow-hidden aspect-video"
              }`}
            >
              {isFacebook && (
                <Link
                  className="absolute right-3 top-3 z-30 group/fb"
                  target="_blank"
                  href={video.fb_url}
                >
                  <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full transition-all duration-300 hover:border-red-600/50 hover:bg-black/80">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover/fb:text-white transition-colors">
                      Show On Facebook
                    </span>
                  </div>
                </Link>
              )}
              {isDrive && (
                <GetDriveDownloadLink driveUrl={getEmbedUrl(activeSource)} />
              )}

              <iframe
                className="mx-auto"
                src={getEmbedUrl(activeSource)}
                // Dynamic styling for Facebook
                {...(isFacebook
                  ? {
                      width: "900",
                      height: "600",
                      style: { border: "none", overflow: "hidden" },
                    }
                  : { className: "absolute inset-0 w-full h-full border-0" })}
                scrolling={isFacebook ? "no" : "yes"}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-950 border border-red-700/20 rounded-lg p-8 md:p-10 flex flex-col h-full shadow-2xl">
              <div className="space-y-6 flex-1">
                <span className="inline-block px-4 py-1 rounded-full bg-red-900/20 border border-red-900/30 text-red-500 text-[10px] font-black uppercase tracking-widest mb-4">
                  {video.category}
                </span>
                <h2 className="text-xl md:text-2xl font-black leading-tight tracking-tighter">
                  {video.source_title}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPlayerPage;

const GetDriveDownloadLink = ({ driveUrl, from = "" }) => {
  if (!driveUrl) return "";

  // Regex to find the ID between /d/ and the next slash
  const regex = /\/d\/([^/]+)/;
  const match = driveUrl.match(regex);
  let fileId = null;
  if (match && match[1]) {
    fileId = match[1];
  }

  return (
    <Link
      href={
        fileId
          ? `https://drive.google.com/uc?export=download&id=${fileId}`
          : driveUrl
      } // Pass your preview link here
      target="_blank"
      rel="noopener noreferrer"
      className={`${
        from !== "top" ? "absolute right-3 top-3" : ""
      } z-30 group/fb`}
    >
      <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full transition-all duration-300 hover:border-red-600/50 hover:bg-black/80">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover/fb:text-white transition-colors">
          Download Video
        </span>
      </div>
    </Link>
  ); // Return original if no ID found
};
