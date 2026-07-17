"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="w-full bg-[#0b1120] text-white pt-24 pb-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Hubungi Kami
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-[#8c9fbe] text-sm md:text-base max-w-2xl leading-relaxed"
        >
          Kami berdedikasi untuk memberikan solusi karet industri presisi tinggi.<br className="hidden md:block" />
          Hubungi tim ahli kami untuk konsultasi teknis atau permintaan penawaran.
        </motion.p>
      </div>
    </section>
  );
}
