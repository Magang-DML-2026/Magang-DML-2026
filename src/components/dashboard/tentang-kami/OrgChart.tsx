"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function OrgChart() {
  const depts = [
    { name: "Manajemen Inti", desc: "DIRECTOR & BOARD" },
    { name: "Operasional", desc: "PRODUKSI & DELIVERY" },
    { name: "Kualitas", desc: "QC CHECKING & TRIMMING" },
    { name: "Administrasi", desc: "HRD, FINANCE & EXIM" }
  ];

  return (
    <section className="w-full py-20 md:py-24 bg-white px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Struktur Organisasi</h2>
            <p className="text-zinc-500 text-sm mt-1">Sinergi antara PT Diva Kencana Mandiri & PT Duta Mitra Luhur</p>
          </div>
          <button className="flex items-center gap-2 text-[13px] font-medium text-zinc-600 hover:text-black transition-colors self-start md:self-auto">
            <Search className="w-4 h-4" />
            <span>Lihat Detail</span>
          </button>
        </div>

        {/* Chart Image Placeholder (Simulated visually for now) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden shadow-sm"
        >
          <div className="text-center mb-8">
            <h3 className="text-[10px] font-bold text-[#f05c35] tracking-widest uppercase mb-1">Organizational Chart</h3>
            <p className="text-sm font-bold text-zinc-800">PT DIVA &amp; MITRA LUHUR</p>
          </div>
          
          {/* Simulated Tree structure */}
          <div className="flex flex-col items-center">
            <div className="bg-[#172033] text-white text-[11px] font-bold px-6 py-2 rounded shadow-md border-b-2 border-[#f05c35]">DIRECTOR</div>
            <div className="w-px h-8 bg-zinc-300"></div>
            <div className="w-[280px] md:w-[600px] h-px bg-zinc-300"></div>
            <div className="flex justify-between w-[280px] md:w-[600px]">
              <div className="w-px h-6 bg-zinc-300"></div>
              <div className="w-px h-6 bg-zinc-300"></div>
              <div className="w-px h-6 bg-zinc-300 hidden md:block"></div>
              <div className="w-px h-6 bg-zinc-300 hidden md:block"></div>
            </div>
            
            <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between w-full max-w-[700px] gap-4 md:gap-0 mt-2">
              <div className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-bold px-4 py-2 rounded shadow-sm w-[130px] text-center">HRD &amp; GA</div>
              <div className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-bold px-4 py-2 rounded shadow-sm w-[130px] text-center">FINANCE</div>
              <div className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-bold px-4 py-2 rounded shadow-sm w-[130px] text-center">PRODUKSI</div>
              <div className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-bold px-4 py-2 rounded shadow-sm w-[130px] text-center">QC &amp; DELIVERY</div>
            </div>
          </div>
        </motion.div>

        {/* Departments Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {depts.map((dept, i) => (
            <div key={i} className="bg-zinc-100/80 border border-zinc-200 rounded-lg p-5 flex flex-col items-center justify-center text-center gap-1">
              <h4 className="text-[13px] font-bold text-zinc-900">{dept.name}</h4>
              <p className="text-[9px] font-bold text-zinc-500 tracking-wider">{dept.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
