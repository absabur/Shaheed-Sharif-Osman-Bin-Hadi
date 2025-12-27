"use client";
import React, { Suspense } from "react";
import ImagesPage from "@/components/ImagesPage";
import { useSearchParams } from "next/navigation";

// 1. Hook is called ONLY here, inside the component wrapped by Suspense
function GalleryContent() {
  const searchParams = useSearchParams();

  return (
    <ImagesPage
      key={JSON.stringify(searchParams)}
      resolvedParams={searchParams}
    />
  );
}

// 2. The main page component acts ONLY as the Suspense boundary
export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-800 text-xs uppercase tracking-widest">
          Loading...
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}
