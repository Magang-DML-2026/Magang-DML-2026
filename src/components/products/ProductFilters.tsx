"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  "All Products",
  "Automotive",
  "Industrial",
  "Custom Molding",
  "Footwear",
];

type Props = {
  searchQuery?: string;
  category?: string;
  sort?: string;
};

export default function ProductFilters({ searchQuery = "", category = "", sort = "newest" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const activeCategory = category || "All Products";

  const buildUrl = (params: { q?: string; cat?: string; sort?: string }) => {
    const sp = new URLSearchParams(searchParams.toString());
    if (params.q !== undefined) {
      if (params.q) sp.set("q", params.q);
      else sp.delete("q");
      sp.set("page", "1");
    }
    if (params.cat !== undefined) {
      if (params.cat && params.cat !== "All Products") sp.set("cat", params.cat);
      else sp.delete("cat");
      sp.set("page", "1");
    }
    if (params.sort !== undefined) {
      if (params.sort) sp.set("sort", params.sort);
      else sp.delete("sort");
      sp.set("page", "1");
    }
    return `/products?${sp.toString()}`;
  };

  const handleCategoryChange = (cat: string) => {
    router.push(buildUrl({ cat }));
  };

  const handleSearchSubmit = (q: string) => {
    router.push(buildUrl({ q }));
  };

  const handleSortChange = (newSort: string) => {
    router.push(buildUrl({ sort: newSort }));
  };

  return (
    <section className="w-full bg-[#f9fafb]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="max-w-[1400px] mx-auto px-6 md:px-12 w-full py-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-zinc-200 rounded-lg p-4">

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-black text-white"
                    : "bg-white text-zinc-600 border border-zinc-300 hover:border-black hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right: Search input + Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">

            {/* Inline search (page-level) */}
            <div className="relative flex items-center flex-1 md:flex-none">
              <Search className="w-4 h-4 absolute left-3 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit(localSearch);
                }}
                placeholder="Filter products..."
                className="pl-9 pr-8 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/50 w-full md:w-[200px] transition-all"
              />
              {localSearch && (
                <button
                  onClick={() => {
                    setLocalSearch("");
                    handleSearchSubmit("");
                  }}
                  className="absolute right-2.5 text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <span className="text-sm text-zinc-500 hidden md:inline shrink-0">Sort by:</span>
            <div className="relative shrink-0">
              <select 
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none bg-white border border-zinc-300 text-black text-sm rounded-md pl-4 pr-10 py-2 outline-none focus:ring-2 focus:ring-black/20 cursor-pointer">
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
