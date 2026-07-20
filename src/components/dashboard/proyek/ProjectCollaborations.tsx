"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Cpu, Wrench } from "lucide-react";

export default function ProjectCollaborations() {
  return (
    <section className="w-full bg-[#F9FAFB] py-20 px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">Featured Collaborations</h2>
            <p className="text-zinc-500 text-sm md:text-base">Precision-engineered solutions for diverse industrial challenges.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-zinc-200 text-zinc-700 hover:bg-zinc-300 text-xs font-bold px-5 py-2.5 rounded-sm transition-colors">
              Filter: All
            </button>
            <button className="bg-[#c0391d] text-white hover:bg-[#a63018] text-xs font-bold px-5 py-2.5 rounded-sm transition-colors shadow-sm">
              Request Case Study
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Large Card (Left, spans 2 cols on md) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm group flex flex-col"
          >
            <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1565515266730-8d54238711e6?q=80&w=2070&auto=format&fit=crop" 
                alt="Automotive Supply"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-2 pr-6">
                <span className="bg-[#c0391d] text-white text-[9px] font-bold px-2.5 py-1 rounded-sm tracking-wider uppercase w-max">
                  FLAGSHIP PROJECT
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Automotive Supply Partnership</h3>
                <p className="text-zinc-200 text-sm font-medium">Precision suspension bushings for national assembly lines.</p>
              </div>
            </div>
            <div className="p-5 flex items-center justify-between border-t border-zinc-100 bg-white">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-600">
                <Building2 className="w-4 h-4 text-[#c0391d]" />
                <span>Client: PT Astra International</span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
            </div>
          </motion.div>

          {/* Top Right Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm group flex flex-col h-full"
          >
            <div className="w-full flex-1 min-h-[180px] relative overflow-hidden bg-zinc-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop" 
                alt="Infrastructure Seals"
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col gap-2 shrink-0">
              <h3 className="text-base font-bold text-zinc-900 tracking-tight">Custom Infrastructure Seals</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Specialized bridge bearing pads for Trans-Jawa highway expansion.</p>
              <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-700 mt-2">
                <Wrench className="w-3.5 h-3.5 text-[#c0391d]" />
                <span>Solution: High-Load Bearing</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Second Row of Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bottom Left Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm group flex flex-col"
          >
            <div className="w-full h-[200px] relative overflow-hidden bg-zinc-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop" 
                alt="Extrusion Efficiency"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col gap-2 bg-white flex-1">
              <h3 className="text-base font-bold text-zinc-900 tracking-tight">Extrusion Efficiency</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mb-4">Standardizing gasket production for white goods manufacturers.</p>
              <div className="mt-auto flex items-center gap-2 text-[11px] font-bold text-zinc-700 pt-3 border-t border-zinc-100">
                <Building2 className="w-3.5 h-3.5 text-[#c0391d]" />
                <span>Client: Multi-National OEM</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom Right Card (Spans 2 cols, split half image half dark blue) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 rounded-xl overflow-hidden shadow-sm group flex flex-col md:flex-row bg-[#0c182b]"
          >
            <div className="w-full md:w-1/2 h-[200px] md:h-full relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                alt="R&D Lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">R&amp;D Lab Development</h3>
              <p className="text-[#8892b0] text-xs md:text-sm leading-relaxed mb-6">
                Developing proprietary heat-resistant compounds for mining machinery components.
              </p>
              <button className="flex items-center gap-2 text-[#c0391d] text-[11px] font-bold tracking-wider uppercase hover:text-white transition-colors w-max">
                <Cpu className="w-4 h-4" />
                <span>View Technical Specs</span>
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
