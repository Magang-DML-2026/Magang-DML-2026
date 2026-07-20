"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/db/schema";

type Props = {
  featuredProducts?: Product[];
};

export default function ProductCatalog({ featuredProducts = [] }: Props) {
  return (
    <section className="w-full py-24 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col gap-12 overflow-hidden">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold tracking-widest text-[#f05c35] uppercase">
              Product Catalog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
              Featured Solutions
            </h2>
          </div>
          <Link href="/products" className="text-[#f05c35] font-semibold text-sm flex items-center hover:underline hover:underline-offset-4">
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {featuredProducts.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm flex flex-col group transition-all hover:shadow-md"
            >
              <div className="w-full h-[320px] bg-zinc-100 relative">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-[#e0e2e7] flex items-center justify-center">
                    {/* Fallback abstract representation depending on index */}
                    {i % 2 === 0 ? (
                      <div className="w-[120px] h-[240px] bg-white rounded-full opacity-80 shadow-inner flex flex-col items-center justify-evenly py-4">
                        <div className="w-16 h-16 rounded-full border-4 border-zinc-200"></div>
                        <div className="w-8 h-32 bg-zinc-200 rounded-sm"></div>
                      </div>
                    ) : (
                      <div className="w-[80%] h-full bg-[#202124] rounded border border-zinc-700/50 shadow-2xl flex flex-col gap-2 p-2 relative overflow-hidden">
                        <div className="absolute left-2 top-10 w-2 h-4 bg-zinc-600/50 rounded-sm"></div>
                        <div className="absolute left-2 bottom-10 w-4 h-4 bg-zinc-600/50 rounded-sm"></div>
                        <div className="w-full h-full bg-gradient-to-br from-zinc-600/10 to-transparent"></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="w-full p-8 flex flex-col justify-start items-start gap-4">
                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-[11px] font-semibold tracking-wider uppercase rounded">
                  {product.category || "General"}
                </span>
                <h3 className="text-2xl font-bold text-black leading-tight">
                  {product.name}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  {product.description}
                </p>
                <Link href={`/products?q=${encodeURIComponent(product.name)}`} className="text-black font-semibold text-sm flex items-center gap-1 mt-2 hover:text-[#f05c35] transition-colors">
                  View Details
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
