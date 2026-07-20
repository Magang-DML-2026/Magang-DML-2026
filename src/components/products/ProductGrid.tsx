"use client";

import { ShoppingCart, PlusCircle, CheckCircle2, Factory, SearchX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import Pagination from "./Pagination";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  tags: string[];
  colSpan?: number;
  featured?: boolean;
};

type Props = {
  products: Product[];
  searchQuery?: string;
  category?: string;
  sort?: string;
  page?: number;
};

export default function ProductGrid({ products, searchQuery = "", category = "", sort = "newest", page = 1 }: Props) {
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const cat = category.toLowerCase().trim();

    let result = products.filter((p) => {
      const matchesCategory =
        !cat || cat === "all products" || (p.category && p.category.toLowerCase() === cat);

      const matchesSearch =
        !q ||
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some((t) => t.includes(q)));

      return matchesCategory && matchesSearch;
    });

    if (sort === "price_asc") {
      result = result.sort((a, b) => {
        const pA = parseInt(a.price.toString().replace(/[^\d]/g, "")) || 0;
        const pB = parseInt(b.price.toString().replace(/[^\d]/g, "")) || 0;
        return pA - pB;
      });
    } else if (sort === "price_desc") {
      result = result.sort((a, b) => {
        const pA = parseInt(a.price.toString().replace(/[^\d]/g, "")) || 0;
        const pB = parseInt(b.price.toString().replace(/[^\d]/g, "")) || 0;
        return pB - pA;
      });
    } else if (sort === "popular") {
      result = result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else {
      // newest (descending ID)
      result = result.sort((a, b) => b.id - a.id);
    }
    return result;
  }, [products, searchQuery, category, sort]);

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.max(1, Math.min(page, totalPages));

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, safePage]);

  return (
    <section className="w-full bg-[#f9fafb] pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col gap-6">

        {/* Result count badge when searching */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-sm text-zinc-500">
              {filteredProducts.length > 0
                ? `${filteredProducts.length} result${filteredProducts.length !== 1 ? "s" : ""} for `
                : "No results for "}
            </span>
            <span className="text-sm font-semibold text-black">&ldquo;{searchQuery}&rdquo;</span>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            /* Empty State */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-28 gap-6 text-center"
            >
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                <SearchX className="w-7 h-7 text-zinc-400" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-black">No products found</h3>
                <p className="text-sm text-zinc-500 max-w-sm">
                  We couldn&apos;t find any products matching{" "}
                  <span className="font-semibold text-zinc-700">&ldquo;{searchQuery}&rdquo;</span>.
                  Try a different keyword or browse all categories.
                </p>
              </div>
              <a
                href="/products"
                className="mt-2 bg-black text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-zinc-800 transition-colors"
              >
                Browse All Products
              </a>
            </motion.div>
          ) : (
            /* Product Bento Grid */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {paginatedProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`${
                    product.colSpan === 2 ? "md:col-span-2" : "md:col-span-1"
                  } bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow`}
                >
                  {product.featured ? (
                    <FeaturedCard product={product} reversed={product.id === 4} />
                  ) : (
                    <StandardCard product={product} />
                  )}
                </motion.div>
              ))}

              {/* Custom Project CTA — always visible at the end */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: paginatedProducts.length * 0.08 }}
                className="md:col-span-2 bg-[#0b1121] rounded-xl overflow-hidden shadow-lg flex flex-col items-center justify-center p-12 text-center gap-6"
              >
                <div className="w-14 h-14 bg-[#f05c35] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(240,92,53,0.4)]">
                  <Factory className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg text-zinc-300">Need Custom Specifications?</h3>
                  <p className="text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">
                    Our engineering team can manufacture rubber components to your exact blueprint
                    requirements and shore hardness needs.
                  </p>
                </div>
                <button className="mt-2 bg-white text-black px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-zinc-200 transition-colors">
                  Start Custom Project
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProducts.length > 0 && (
          <Pagination currentPage={safePage} totalPages={totalPages} />
        )}
      </div>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────────────── */

function FeaturedCard({ product, reversed }: { product: Product; reversed?: boolean }) {
  return (
    <div className={`flex flex-col sm:flex-row${reversed ? "-reverse" : ""} h-full`}>
      {/* Image placeholder */}
      <div
        className={`w-full sm:w-1/2 h-[300px] sm:h-auto ${
          reversed ? "bg-[#8ca3a6]" : "bg-[#cbb8a9]"
        } relative overflow-hidden flex items-center justify-center p-4`}
      >
        {product.id === 1 ? (
          <>
            <div className="w-[180px] h-[180px] rounded-full border-[20px] border-[#2c2c2e] shadow-2xl" />
            <div className="absolute top-4 left-4 bg-[#f05c35] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
              Ready Stock
            </div>
          </>
        ) : (
          <div className="w-[100px] h-[220px] bg-[#a8683f] rounded-[40px] opacity-90 shadow-2xl border-2 border-[#824b29] flex flex-col items-center justify-between py-6">
            <div className="w-16 h-20 border-2 border-[#824b29]/50 rounded-xl" />
            <div className="w-16 h-12 border-2 border-[#824b29]/50 rounded-xl" />
          </div>
        )}
      </div>
      {/* Text */}
      <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold tracking-widest text-[#f05c35] uppercase">
            {product.category}
          </span>
          <h3 className="text-xl font-bold text-black leading-tight">{product.name}</h3>
          {product.id === 1 ? (
            <ul className="flex flex-col gap-2 mt-2">
              {["High-grip Polymer", "Universal 38cm fit", "Heat resistant"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-zinc-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                  {f}
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p className="text-sm text-zinc-600 leading-relaxed">{product.description}</p>
              <div className="flex gap-2 mt-2">
                <div className="bg-zinc-100 border border-zinc-200 rounded px-3 py-2 flex flex-col">
                  <span className="text-[10px] text-zinc-500">Durability</span>
                  <span className="text-sm font-semibold">Grade A+</span>
                </div>
                <div className="bg-zinc-100 border border-zinc-200 rounded px-3 py-2 flex flex-col">
                  <span className="text-[10px] text-zinc-500">Material</span>
                  <span className="text-sm font-semibold">Vulcanized</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-zinc-100">
          <span className="font-medium text-black">Rp {product.price.toLocaleString("id-ID")}</span>
          {product.id === 1 ? (
            <button className="w-10 h-10 bg-black text-white rounded-md flex items-center justify-center hover:bg-zinc-800 transition-colors">
              <ShoppingCart className="w-4 h-4" />
            </button>
          ) : (
            <button className="bg-[#b3401a] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#8f3113] transition-colors shadow-md">
              Bulk Quote
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StandardCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col h-full">
      {/* Image placeholder */}
      <div
        className={`w-full h-[200px] flex items-center justify-center p-4 ${
          product.id === 2 ? "bg-[#d1d5db]" : "bg-[#e5e7eb]"
        }`}
      >
        {product.id === 2 ? (
          <div className="w-full h-full bg-[#202124] rounded-md border border-zinc-600 shadow-xl relative">
            <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-600" />
            <div className="absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-zinc-600" />
          </div>
        ) : (
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-[12px] border-[#1a1a1c] shadow-lg translate-x-2 -translate-y-2" />
            <div className="absolute inset-0 rounded-full border-[12px] border-[#2c2c2e] shadow-lg -translate-x-2 translate-y-2" />
          </div>
        )}
      </div>
      {/* Text */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold tracking-widest text-[#f05c35] uppercase">
            {product.category}
          </span>
          <h3 className="text-lg font-bold text-black leading-tight">{product.name}</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-100">
          <span className="font-bold text-sm text-black">Rp {product.price.toLocaleString("id-ID")}</span>
          <button className="text-zinc-400 hover:text-black transition-colors">
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
