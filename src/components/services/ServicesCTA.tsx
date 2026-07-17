"use client";

import { motion } from "framer-motion";

export default function ServicesCTA() {
  return (
    <section className="w-full bg-white pb-24 px-6 md:px-12 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-[1400px] mx-auto w-full bg-[#1c1c1e] rounded-xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-12 md:p-20 text-center gap-8 relative"
      >
        {/* Background Graphic */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-gradient-to-r from-white to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="flex flex-col gap-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Ready to start your project?
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Our engineering team is ready to assist with technical specifications and material recommendations for your custom rubber components.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 relative z-10"
        >
          <button className="w-full sm:w-auto bg-[#c24118] hover:bg-[#a63613] text-white px-8 py-3 rounded-md text-sm font-semibold transition-colors shadow-lg">
            Request a Quote
          </button>
          <button className="w-full sm:w-auto bg-transparent border border-zinc-500 text-zinc-300 hover:text-white hover:border-white px-8 py-3 rounded-md text-sm font-semibold transition-colors">
            Download Capabilities
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
