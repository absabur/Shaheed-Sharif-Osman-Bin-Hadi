"use client";
import React, { useState } from "react";
import {
  Share2,
  Link as LinkIcon,
  Check,
  Facebook,
  Twitter,
  MessageCircle,
  Copy,
  Send,
  Linkedin,
} from "lucide-react";

const ShareSection = ({ title, url, thumbnail }) => {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: "Facebook",
      icon: <Facebook size={18} />,
      color: "bg-[#1877F2]",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "X / Twitter",
      icon: <span className="font-bold text-lg">X</span>, // Or use the X icon from Lucide
      color: "bg-[#000000]",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      color: "bg-[#0A66C2]",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle size={18} />,
      color: "bg-[#25D366]",
      href: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    },
    {
      name: "Telegram",
      icon: <Send size={18} />,
      color: "bg-[#26A5E4]",
      href: `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.log("Error sharing", err);
      }
    }
  };

  return (
    <div className="pt-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {shareLinks.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 ${platform.color} rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-black/20`}
                title={`Share on ${platform.name}`}
              >
                {platform.icon}
              </a>
            ))}
          </div>

          {/* Copy Link Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              copied
                ? "bg-green-600 text-white"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </button>
          {/* Native Share for Mobile */}
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white active:scale-95 transition-all"
          >
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>

      {/* Hidden SEO Preview Hint (For bots) */}
      <div className="hidden">
        <img src={thumbnail} alt="Preview" />
      </div>
    </div>
  );
};

export default ShareSection;
