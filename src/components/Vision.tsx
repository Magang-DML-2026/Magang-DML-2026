"use client";

import { Target, Leaf } from "lucide-react";
import { motion } from "framer-motion";

export default function Vision() {
  return (
    <section className="w-full py-24 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row gap-12 overflow-hidden">
        
        {/* Left Side: Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-[45%] flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-[4px] h-8 bg-[#f05c35] rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
              Our Vision & Core Values
            </h2>
          </div>
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-lg">
            At PT Duta Mitra Luhur, we don&apos;t just manufacture rubber components; we engineer the foundations of reliability. Our vision is to lead the Southeast Asian market through sustainable innovation and unwavering precision.
          </p>
        </motion.div>

        {/* Right Side: Cards */}
        <div className="w-full md:w-[55%] flex flex-col sm:flex-row gap-6">
          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 bg-gradient-to-br from-white to-[#fff0ec] p-8 rounded-2xl border border-[#ffede8] shadow-sm flex flex-col gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-black">Mission</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              To provide world-class rubber parts that exceed international safety and performance standards.
            </p>
          </motion.div>

          {/* Sustainability Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 bg-gradient-to-br from-white to-[#fff0ec] p-8 rounded-2xl border border-[#ffede8] shadow-sm flex flex-col gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-[#f05c35] flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-black">Sustainability</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Integrating eco-friendly practices in extrusion and molding to reduce industrial footprint.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
