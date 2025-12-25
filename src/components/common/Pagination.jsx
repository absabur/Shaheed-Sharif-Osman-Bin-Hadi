"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Import this
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages }) => {
  const searchParams = useSearchParams();

  // This helper creates a new URL string by merging existing params with the new page
  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push("...");
      }
    }
    return [...new Set(pages)];
  };

  return (
    <div className="mt-20 flex flex-col items-center gap-8">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="flex items-center gap-4">
        {/* Prev Button */}
        <Link
          href={createPageURL(Math.max(1, currentPage - 1))}
          scroll={false}
          className={`p-5 rounded-2xl border transition-all ${
            currentPage === 1
              ? "opacity-20 pointer-events-none border-white/5"
              : "bg-zinc-950 border-white/10 hover:border-red-600 hover:text-red-600"
          }`}
        >
          <ChevronLeft size={20} />
        </Link>

        {/* Page Numbers */}
        <div className="flex gap-2">
          {getPageNumbers().map((page, idx) => {
            if (page === "...") {
              return (
                <span
                  key={`dots-${idx}`}
                  className="flex items-end pb-4 text-zinc-700"
                >
                  ...
                </span>
              );
            }

            const isActive = currentPage === page;
            return (
              <Link
                key={page}
                href={createPageURL(page)}
                scroll={false}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm transition-all border ${
                  isActive
                    ? "bg-red-700 border-red-600 text-white shadow-lg shadow-red-700/20"
                    : "bg-zinc-950 border-white/10 text-zinc-500 hover:border-white/20"
                }`}
              >
                {page.toString().padStart(2, "0")}
              </Link>
            );
          })}
        </div>

        {/* Next Button */}
        <Link
          href={createPageURL(Math.min(totalPages, currentPage + 1))}
          scroll={false}
          className={`p-5 rounded-2xl border transition-all ${
            currentPage === totalPages
              ? "opacity-20 pointer-events-none border-white/5"
              : "bg-zinc-950 border-white/10 hover:border-red-600 hover:text-red-600"
          }`}
        >
          <ChevronRight size={20} />
        </Link>
      </div>

      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700">
        End of Page {currentPage}
      </p>
    </div>
  );
};

export default Pagination;
