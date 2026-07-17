"use client";

import { motion } from "framer-motion";

export default function ProductFilters() {
  const categories = [
    { name: "All Products", active: true },
    { name: "Automotive", active: false },
    { name: "Industrial", active: false },
    { name: "Custom Molding", active: false },
    { name: "Footwear", active: false },
  ];

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
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat.active 
                    ? "bg-black text-white" 
                    : "bg-white text-zinc-600 border border-zinc-300 hover:border-black hover:text-black"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <span className="text-sm text-zinc-500">Sort by:</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-zinc-300 text-black text-sm rounded-md pl-4 pr-10 py-2 outline-none focus:ring-2 focus:ring-black/20 cursor-pointer">
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
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
