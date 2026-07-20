"use client";

import { motion } from "framer-motion";

export default function ProjectStats() {
  const stats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "12", label: "Core Industries" },
    { value: "99.8%", label: "Precision Accuracy" },
    { value: "24/7", label: "Production Support" }
  ];

  return (
    <section className="w-full bg-white border-b border-zinc-200 relative z-20 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-zinc-200">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#c0391d] tracking-tight">{stat.value}</h2>
              <p className="text-[10px] md:text-[11px] font-bold text-zinc-600 mt-2 tracking-widest uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
