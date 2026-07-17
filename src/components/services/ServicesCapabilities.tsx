"use client";

import { Combine, Hexagon, Cog, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ServicesCapabilities() {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col items-center gap-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black relative inline-block">
            Core Capabilities
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#f05c35]"></span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          
          {/* Card 1: Custom Rubber Molding */}
          <motion.div variants={cardVariants} className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="w-full h-[240px] bg-[#d5d7db] relative flex items-center justify-center overflow-hidden">
               {/* Placeholder */}
               <div className="w-[80%] h-[120%] bg-[#b8bcc2] border border-[#a4a9b0] rounded-lg -rotate-12 transform scale-110 shadow-xl flex items-center justify-center p-8">
                 <div className="w-32 h-32 border-[16px] border-[#92979e] rounded-full"></div>
               </div>
            </div>
            <div className="p-8 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2 text-[#f05c35] text-[10px] font-bold tracking-widest uppercase">
                <Hexagon className="w-4 h-4" />
                0.01mm Precision
              </div>
              <h3 className="text-2xl font-bold text-black leading-tight">
                Custom Rubber Molding
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Utilizing high-precision compression and injection molding techniques. We produce complex geometries with consistent tolerances for critical industrial applications.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded text-[10px] font-semibold uppercase tracking-wider">Compression</span>
                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded text-[10px] font-semibold uppercase tracking-wider">Injection</span>
                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded text-[10px] font-semibold uppercase tracking-wider">Transfer</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Rubber-to-Metal Bonding */}
          <motion.div variants={cardVariants} className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="w-full h-[240px] bg-[#e2e3e5] relative flex items-center justify-center p-8 overflow-hidden">
               {/* Placeholder */}
               <div className="w-48 h-48 bg-zinc-300 rounded-full flex flex-col items-center justify-center shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full"></div>
                  <div className="w-32 h-32 bg-[#f05c35] rounded-full border-[8px] border-zinc-400 shadow-inner flex items-center justify-center">
                    <div className="w-16 h-16 bg-zinc-200 rounded-full border-4 border-zinc-400 shadow-inner"></div>
                  </div>
               </div>
            </div>
            <div className="p-8 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2 text-[#f05c35] text-[10px] font-bold tracking-widest uppercase">
                <Combine className="w-4 h-4" />
                Structural Integrity
              </div>
              <h3 className="text-2xl font-bold text-black leading-tight">
                Rubber-to-Metal Bonding
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Engineered for high-stress environments. Our bonding process ensures maximum adhesion between elastomers and various metal substrates for automotive bushings and mounts.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded text-[10px] font-semibold uppercase tracking-wider">Adhesion Systems</span>
                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded text-[10px] font-semibold uppercase tracking-wider">Vibration Control</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Extrusion Services */}
          <motion.div variants={cardVariants} className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="w-full h-[240px] bg-[#c3c6cb] relative flex items-center justify-center overflow-hidden">
               {/* Placeholder */}
               <div className="w-[120%] h-12 bg-[#2c2c2e] shadow-xl rotate-[-5deg] relative">
                 <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-4 bg-black/30"></div>
                 <div className="absolute -top-4 right-1/4 w-32 h-20 bg-zinc-400 border-2 border-zinc-500 rounded flex items-center justify-center">
                   <div className="w-4 h-full bg-[#f05c35]"></div>
                 </div>
               </div>
            </div>
            <div className="p-8 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2 text-[#f05c35] text-[10px] font-bold tracking-widest uppercase">
                <Cog className="w-4 h-4" />
                Continuous Profiles
              </div>
              <h3 className="text-2xl font-bold text-black leading-tight">
                Extrusion Services
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Custom profiles, tubing, and cords. Our extrusion lines handle both simple and complex cross-sections with high speed and exceptional repeatability.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded text-[10px] font-semibold uppercase tracking-wider">EPDM Seals</span>
                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded text-[10px] font-semibold uppercase tracking-wider">Gaskets</span>
                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded text-[10px] font-semibold uppercase tracking-wider">Weatherstripping</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: QA & Material Testing */}
          <motion.div variants={cardVariants} className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col relative">
            <div className="absolute top-4 right-4 bg-[#f05c35] text-white px-3 py-1.5 rounded-sm text-[10px] font-bold tracking-widest uppercase shadow-md z-10">
              0% Defect Goal
            </div>
            <div className="w-full h-[240px] bg-[#eef0f3] relative flex items-center justify-center p-6 overflow-hidden">
               {/* Placeholder */}
               <div className="w-full h-full bg-white rounded shadow-sm border border-zinc-200 flex p-4 gap-4">
                 <div className="w-1/3 h-full bg-[#f3f4f6] rounded border border-zinc-200 flex flex-col justify-end p-2 gap-1">
                   <div className="w-full bg-zinc-300 rounded-sm" style={{ height: "40%" }}></div>
                   <div className="w-full bg-[#f05c35] rounded-sm" style={{ height: "70%" }}></div>
                   <div className="w-full bg-zinc-300 rounded-sm" style={{ height: "50%" }}></div>
                 </div>
                 <div className="w-2/3 h-full flex flex-col gap-2">
                   <div className="w-full h-3 bg-zinc-200 rounded"></div>
                   <div className="w-3/4 h-3 bg-zinc-200 rounded"></div>
                   <div className="w-full flex-1 bg-[#1f2937] rounded mt-2 border-2 border-zinc-800 relative">
                     <div className="absolute bottom-2 left-2 w-3/4 h-1/2 border-l-2 border-b-2 border-zinc-600">
                       <svg className="w-full h-full text-[#f05c35]" viewBox="0 0 100 100" preserveAspectRatio="none">
                         <path d="M0,100 C20,90 40,30 100,10" fill="none" stroke="currentColor" strokeWidth="4" />
                       </svg>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
            <div className="p-8 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2 text-[#f05c35] text-[10px] font-bold tracking-widest uppercase">
                <ShieldCheck className="w-4 h-4" />
                Advanced Lab Testing
              </div>
              <h3 className="text-2xl font-bold text-black leading-tight">
                QA & Material Testing
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Rigorous testing for tensile strength, elongation, aging, and chemical resistance. Our in-house lab ensures every batch meets your exact specifications.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded text-[10px] font-semibold uppercase tracking-wider">ASTM Standards</span>
                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded text-[10px] font-semibold uppercase tracking-wider">Hardness Testing</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
