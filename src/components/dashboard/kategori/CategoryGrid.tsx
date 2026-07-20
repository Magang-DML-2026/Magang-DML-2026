"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CategoryGrid() {
  const categories = [
    {
      title: "Rubber Seals",
      desc: "O-rings, gaskets, dan oil seals presisi untuk mencegah kebocoran pada sistem hidrolik",
      app: "Mesin, Otomotif",
      img: "https://images.unsplash.com/photo-1590496155985-23c4eb8964e7?q=80&w=2070&auto=format&fit=crop",
      badge: "TOP SELLER"
    },
    {
      title: "Rubber Soles",
      desc: "Sol sepatu tahan lama dengan daya cengkeram tinggi untuk sepatu keselamatan",
      app: "Alas Kaki, Safety",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Mudguards",
      desc: "Penahan lumpur tahan cuaca ekstrem untuk truk, bus, dan kendaraan komersial berat.",
      app: "Transportasi, Logistik",
      img: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Custom Parts",
      desc: "Komponen karet kustom berdasarkan gambar teknis atau sampel untuk kebutuhan",
      app: "OEM, Prototyping",
      img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop",
      badge: "LAYANAN UNGGULAN"
    },
    {
      title: "Vibration Mounts",
      desc: "Peredam getaran berkualitas tinggi untuk mesin pabrik, generator, dan sistem HVAC.",
      app: "Infrastruktur, Pabrik",
      img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Industrial Belting",
      desc: "Sabuk konveyor dan transmisi daya yang dirancang untuk efisiensi tinggi dan tahan",
      app: "Pertambangan, Manufaktur",
      img: "https://images.unsplash.com/photo-1617711200171-47703310037a?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section className="w-full bg-[#F9FAFB] px-6 -mt-12 relative z-20 pb-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col"
            >
              <div className="w-full aspect-[4/3] bg-zinc-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/5 z-10 transition-opacity group-hover:bg-black/0"></div>
                {cat.badge && (
                  <div className="absolute top-4 left-4 z-20 bg-[#f05c35]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm tracking-wider uppercase">
                    {cat.badge}
                  </div>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={cat.img} 
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1 relative">
                <h3 className="text-xl font-bold text-zinc-900">{cat.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed flex-1">{cat.desc}</p>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100">
                  <span className="text-[11px] font-medium text-zinc-400">Aplikasi: {cat.app}</span>
                  <Link 
                    href="/dashboard/katalog" 
                    className="w-8 h-8 rounded-full border border-[#f05c35] text-[#f05c35] flex items-center justify-center group-hover:bg-[#f05c35] group-hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
