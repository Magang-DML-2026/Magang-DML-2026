"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] flex items-center overflow-hidden bg-zinc-900">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center justify-between h-full py-16">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-[60%] flex flex-col items-start gap-6 pt-12 md:pt-0"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f05c35]/20 border border-[#f05c35]/30 backdrop-blur-sm">
             <Settings className="w-3.5 h-3.5 text-[#f05c35]" />
             <span className="text-[11px] font-semibold tracking-wider text-[#f05c35] uppercase">
               Industrial Excellence
             </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-md">
            Precision in <span className="text-[#f05c35]">Rubber</span><br />
            Engineering &<br />
            Manufacturing
          </h1>

          <p className="text-zinc-200 text-base md:text-lg max-w-lg leading-relaxed drop-shadow">
            Delivering high-performance industrial rubber solutions for global infrastructure and manufacturing sectors since 1994. Quality at scale, engineered for durability.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Button className="bg-[#f05c35] hover:bg-[#d94a28] text-white px-6 py-6 text-base rounded-md font-medium border-0 shadow-lg shadow-[#f05c35]/20">
              Explore Catalog
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 px-6 py-6 text-base rounded-md font-medium">
              Technical Data
            </Button>
          </div>
        </motion.div>

        {/* Stats Badges positioned at bottom right */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="absolute bottom-12 right-6 md:right-12 flex flex-col sm:flex-row gap-4"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-md p-4 shadow-xl flex flex-col min-w-[140px] border border-white/20">
            <span className="text-2xl font-bold text-black">300+</span>
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Custom Molds</span>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-md p-4 shadow-xl flex flex-col min-w-[140px] border border-white/20">
            <span className="text-2xl font-bold text-[#f05c35]">ISO</span>
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Certified Quality</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
