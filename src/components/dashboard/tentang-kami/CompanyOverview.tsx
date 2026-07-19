"use client";

import { motion } from "framer-motion";

export default function CompanyOverview() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-16 max-w-[1400px] mx-auto bg-white">
      <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-zinc-900 tracking-tight"
          >
            Sekilas Perusahaan
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-600 text-sm md:text-base leading-relaxed"
          >
            PT Duta Mitra Luhur berdiri sejak 03 Agustus 2010 berdasarkan akta pendirian no 01 tgl 03 Agustus 2010. Sebagai entitas yang fokus pada manufaktur produk berbasis karet, kami telah mendedikasikan lebih dari satu dekade untuk mencapai standar kualitas internasional dan kepuasan pelanggan global.
          </motion.p>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-50 border border-zinc-100 p-6 rounded-xl flex-1 min-w-[150px]"
            >
              <p className="text-3xl font-bold text-zinc-900 mb-1">14+</p>
              <p className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase">Tahun Pengalaman</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-zinc-50 border border-zinc-100 p-6 rounded-xl flex-1 min-w-[150px]"
            >
              <p className="text-3xl font-bold text-zinc-900 mb-1">B2B</p>
              <p className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase">Fokus Sektor</p>
            </motion.div>
          </div>
        </div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-black/10 z-10"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1565515266730-8d54238711e6?q=80&w=2070&auto=format&fit=crop" 
            alt="Mesin Produksi Karet"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
      </div>
    </section>
  );
}
