"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectHero() {
  return (
    <section className="w-full bg-[#0a192f] pt-12 pb-24 px-6 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6 relative z-10">
        
        {/* Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-5 mt-4"
        >
          <div className="flex items-start">
            <span className="bg-[#c0391d] text-white text-[9px] font-bold px-3 py-1.5 rounded-sm tracking-wider uppercase">
              Manufacturing Excellence
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.1] max-w-3xl">
            Industrial Integrity &amp; High-Precision Solutions
          </h1>
          <p className="text-[#8892b0] text-sm md:text-base max-w-xl leading-relaxed font-medium mt-2">
            Showcasing our journey in engineering durable rubber components for Indonesia&apos;s leading industrial sectors.
          </p>
        </motion.div>
        
      </div>
    </section>
  );
}
