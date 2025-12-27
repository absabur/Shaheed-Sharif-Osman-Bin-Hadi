"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, baseUrl }) => {
  const getPagePath = (page) => `${baseUrl}?page=${page}`;

  // logic to show limited buttons (e.g., 1, current-1, current, current+1, last)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-8 px-4">
      {/* Previous Button */}
      <Link
        href={getPagePath(Math.max(1, currentPage - 1))}
        className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-xl border transition-all ${
          currentPage === 1
            ? "opacity-20 pointer-events-none border-zinc-900"
            : "border-white/10 hover:border-red-600 bg-zinc-950 text-white"
        }`}
      >
        <ChevronLeft size={16} />
      </Link>

      {/* Page Numbers - We hide them on tiny screens and show on md+ */}
      <div className="flex items-center gap-2">
        {pages.map((page) => {
          // Logic: Show only 2 pages around current page on mobile to prevent overflow
          const isNearCurrent = Math.abs(page - currentPage) <= 1;
          const isFirstOrLast = page === 1 || page === totalPages;

          if (!isNearCurrent && !isFirstOrLast) {
            // This hides the middle buttons on small mobile screens
            return (
              <span key={page} className="hidden md:block text-zinc-700">
                .
              </span>
            );
          }

          return (
            <Link
              key={page}
              href={getPagePath(page)}
              className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-xl text-[10px] md:text-xs font-black transition-all ${
                currentPage === page
                  ? "bg-red-700 text-white border-red-600 shadow-lg shadow-red-900/20"
                  : "bg-zinc-950 text-zinc-500 border border-white/5 hover:border-white/20"
              } ${
                !isNearCurrent && !isFirstOrLast ? "hidden md:flex" : "flex"
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      <Link
        href={getPagePath(Math.min(totalPages, currentPage + 1))}
        className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-xl border transition-all ${
          currentPage === totalPages
            ? "opacity-20 pointer-events-none border-zinc-900"
            : "border-white/10 hover:border-red-600 bg-zinc-950 text-white"
        }`}
      >
        <ChevronRight size={16} />
      </Link>
    </div>
  );
};

export default Pagination;
