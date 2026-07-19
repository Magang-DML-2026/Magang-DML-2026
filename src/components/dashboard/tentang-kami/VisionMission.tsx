"use client";

import { Eye, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function VisionMission() {
  const missions = [
    "Secara berkesinambungan memproduksi dan menyediakan product-product berkualitas tinggi serta memenuhi kebutuhan pelanggan melalui program pemasaran yang terbaik.",
    "Menghasilkan keuntungan yang cukup memuaskan dan meningkatkan kesejahteraan bagi seluruh karyawan.",
    "Mengembangkan kemampuan karyawan yang berkompeten untuk tujuan kemajuan perusahaan.",
    "Menjadi perusahaan yang kuat dan terus berkembang serta siap menghadapi persaingan Regional.",
    "Maupun Global kedepannya."
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#0a0a0a]">
      <div className="px-6 md:px-16 max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 md:gap-20">
        
        {/* Vision */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Eye className="text-white w-6 h-6" />
            <h2 className="text-xl font-bold text-white tracking-widest uppercase">Visi</h2>
          </div>
          <p className="text-zinc-300 text-lg md:text-xl font-medium leading-relaxed">
            &quot;Menjadi Perusahaan Manufacturing product yang berkaitan dengan Rubber dengan kualitas terbaik dan ramah lingkungan.&quot;
          </p>
        </div>

        {/* Mission */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Rocket className="text-white w-6 h-6" />
            <h2 className="text-xl font-bold text-white tracking-widest uppercase">Misi</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            {missions.map((misi, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#172033] border border-white/5 p-5 rounded-lg flex items-start gap-5 hover:bg-[#1f2b45] transition-colors"
              >
                <span className="text-zinc-500 font-bold text-sm mt-0.5 w-6 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {misi}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
