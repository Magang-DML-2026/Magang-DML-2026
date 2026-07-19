"use client";

import { motion } from "framer-motion";

export default function B2CCatalogHeader() {
  return (
    <section className="w-full bg-[#0f172a] pt-16 pb-16 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col gap-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-block px-3 py-1 bg-[#cc4224] text-white text-[11px] font-bold tracking-wider rounded-full uppercase mb-2">
            Presisi & Daya Tahan
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl"
        >
          Katalog Produk Industri Terbaik
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed"
        >
          Menyediakan komponen karet presisi untuk kebutuhan manufaktur Anda dengan standar kualitas internasional.
        </motion.p>
      </div>
    </section>
  );
}
