"use client";

import { Award } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section className="w-full bg-[#0b1120] text-white pt-12 pb-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 bg-[#f05c35] text-white px-3 py-1.5 rounded-sm text-[10px] font-bold tracking-widest uppercase w-max shadow-sm">
            <Award className="w-3.5 h-3.5" />
            ISO 9001:2015 CERTIFIED
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Advanced Rubber<br />Engineering Services
          </h1>
          
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
            Providing comprehensive industrial solutions from design to mass production. Our facilities specialize in EPDM, NBR, and Silicone rubber processing for global industry standards.
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3 mt-2"
          >
            {["EPDM", "NBR", "Silicone"].map((mat, i) => (
              <motion.span
                key={mat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.1 }}
                className="px-4 py-1.5 border border-[#f05c35]/30 text-[#f05c35] rounded-sm text-xs font-semibold tracking-wide bg-[#f05c35]/5"
              >
                {mat}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Image/Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
          className="w-full md:w-1/2 h-[400px] bg-[#1a2333] rounded-lg border border-zinc-800 shadow-2xl relative overflow-hidden flex items-center justify-center p-6"
        >
          {/* Simulating an industrial machine */}
          <div className="w-[80%] h-full bg-[#111827] rounded-md border-t-4 border-[#f05c35] shadow-inner flex flex-col items-center justify-center relative">
            <div className="w-full h-1/2 bg-[#1f2937] border-b border-zinc-700 flex items-center justify-center">
              <div className="w-32 h-16 bg-[#374151] rounded shadow-md border border-zinc-600 flex items-center justify-center">
                <span className="text-zinc-500 font-mono text-xs">DML-HV-2000</span>
              </div>
            </div>
            <div className="w-1/2 h-1/2 border-x-4 border-[#f05c35]/20 bg-[#111827] flex items-end pb-4 justify-center">
              <div className="w-24 h-8 bg-zinc-800 rounded-full border-t-2 border-zinc-600"></div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
