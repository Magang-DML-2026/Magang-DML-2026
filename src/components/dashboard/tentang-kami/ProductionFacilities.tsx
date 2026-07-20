"use client";

import { motion } from "framer-motion";

export default function ProductionFacilities() {
  const facilities = [
    {
      title: "Kneader & Open Mill",
      desc: "Tahap awal pencampuran material untuk menciptakan formula karet yang optimal.",
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Cutting Kukdong",
      desc: "Teknologi pemotongan presisi tinggi untuk memastikan dimensi produk yang akurat.",
      img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Press & Trimming",
      desc: "Pencetakan akhir dan penyempurnaan detail dengan kontrol kualitas Metal Detector.",
      img: "https://images.unsplash.com/photo-1565515266730-8d54238711e6?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section className="w-full py-20 md:py-32 bg-[#F9FAFB] px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center gap-4 mb-16">
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Fasilitas Produksi</h2>
        <p className="text-zinc-500 text-sm md:text-base max-w-xl">
          Mesin dan infrastruktur modern untuk menjamin presisi di setiap tahap manufaktur.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {facilities.map((fac, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
          >
            <div className="w-full aspect-[4/3] bg-zinc-100 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/5 z-10 transition-opacity group-hover:bg-black/0"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={fac.img} 
                alt={fac.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col gap-2 flex-1">
              <h3 className="text-base font-bold text-zinc-900">{fac.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{fac.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
