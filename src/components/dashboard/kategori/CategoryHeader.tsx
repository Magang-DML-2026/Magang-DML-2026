"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CategoryHeader() {
  return (
    <section className="w-full bg-[#0a192f] pt-12 pb-24 px-6 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6 relative z-10">
        
        {/* Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4 mt-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Kategori Produk
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed font-medium">
            Solusi manufaktur karet presisi tinggi untuk berbagai sektor industri. Dari komponen otomotif hingga perlengkapan konstruksi berat.
          </p>
        </motion.div>
        
      </div>
    </section>
  );
}
