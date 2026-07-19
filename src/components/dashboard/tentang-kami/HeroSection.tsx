"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] bg-zinc-900 overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-center bg-cover opacity-40 mix-blend-overlay"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-16 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-[#f05c35] text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full mb-4">
            Sejak 2010
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Tentang Kami
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
