"use client";

import { ChevronDown, Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useEffect, useState, useCallback } from "react";

export default function SearchField() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  // Local state for the input field (UI feels fast)
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  // 1. Wrap updateURL in useCallback to prevent it from changing on every render
  const updateURL = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      startTransition(() => {
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, replace, searchParams]
  ); // Dependencies for useCallback

  // Logic 1: Debounce search input to update URL
  useEffect(() => {
    const currentSearchFromURL = searchParams.get("search") || "";

    // Only update URL if the user has actually typed something different than what's in the URL
    if (searchTerm === currentSearchFromURL) return;

    const timer = setTimeout(() => {
      updateURL("search", searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, searchParams, updateURL]); // All dependencies included

  // Logic 2: Handle external URL changes (back/forward button)
  useEffect(() => {
    const fromURL = searchParams.get("search") || "";
    if (fromURL !== searchTerm) {
      setSearchTerm(fromURL);
    }
    // We omit searchTerm here to prevent the cascading render loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full md:w-2/3 items-stretch">
      <div className="relative flex-[3] group">
        <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
          <Search size={15} color="red" />
        </div>
        <input
          type="text"
          placeholder="Search Video..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pr-16 pl-6 text-xs font-black tracking-widest text-white focus:outline-none focus:border-red-600/50 transition-all shadow-2xl"
        />
      </div>

      <div className="relative">
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-red-600">
          <ChevronDown size={18} />
        </div>
        <select
          value={searchParams.get("sort") || "views"}
          onChange={(e) => updateURL("sort", e.target.value)}
          className="w-full appearance-none bg-zinc-950 text-white border border-white/10 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest focus:outline-none focus:border-red-700 transition-all cursor-pointer"
        >
          {/* Custom Arrow Icon for the Select */}
          <option value="views">Default</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="duration">Longest Duration</option>
        </select>
      </div>
    </div>
  );
}
