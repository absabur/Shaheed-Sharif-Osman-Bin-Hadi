"use client";
import { Download } from "lucide-react";
import React from "react";

const ImageDownload = ({ img }) => {
  return (
    <button
      onClick={() => handleDownload(img.url, `osman-hadi-${img.title}.jpg`)}
      className="cursor-pointer p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-700 hover:border-red-500"
      title="Download Image"
    >
      <Download size={20} />
    </button>
  );
};

export default ImageDownload;

export const handleDownload = async (imageUrl, imageName) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    // Set the filename
    link.download = imageName || "osman-hadi-memorial.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};
