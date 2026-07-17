"use client";

import { motion } from "framer-motion";

export default function ProductHeader() {
  return (
    <section className="w-full bg-[#f9fafb] py-16 border-b border-zinc-200 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-black tracking-tight"
        >
          Product Catalog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
          className="text-zinc-600 text-base max-w-2xl leading-relaxed"
        >
          Precision-engineered rubber components for industrial excellence. Explore our ready-stock inventory with guaranteed durability and quality at scale.
        </motion.p>
      </div>
    </section>
  );
}
