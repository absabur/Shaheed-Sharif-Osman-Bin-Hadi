"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function SearchField() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);

    // Always reset to page 1 when searching
    params.set("page", "1");

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="relative w-full md:w-2/3 group">
      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
        <Search
          size={18}
          className={`${
            isPending
              ? "animate-pulse text-red-600"
              : "text-zinc-500 group-focus-within:text-red-600"
          } transition-colors`}
        />
      </div>
      <input
        type="text"
        placeholder="SEARCH ARCHIVE..."
        // Match the key "search" used in handleSearch
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full h-full bg-zinc-950 border border-white/5 rounded-2xl py-4 pl-16 pr-12 text-xs font-black tracking-widest uppercase text-white placeholder:text-zinc-800 focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-all shadow-2xl"
      />

      {/* Status Indicators */}
      <div className="absolute inset-y-0 right-6 flex items-center gap-3">
        {isPending ? (
          <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
        ) : (
          <div className="w-1 h-4 bg-zinc-900 rounded-full group-focus-within:bg-red-900/40 transition-colors" />
        )}
      </div>
    </div>
  );
}
