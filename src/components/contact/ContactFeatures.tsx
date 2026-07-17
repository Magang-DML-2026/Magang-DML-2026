"use client";

import { BadgeCheck, Crosshair, Headset } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: BadgeCheck, title: "Kualitas Terjamin", desc: "Standardisasi material karet sesuai kebutuhan industri berat dan otomotif." },
  { icon: Crosshair, title: "Presisi Tinggi", desc: "Proses manufaktur dengan akurasi tinggi menggunakan teknologi moulding terkini." },
  { icon: Headset, title: "Respon Cepat", desc: "Tim dukungan pelanggan kami siap membantu teknis dan logistik pesanan Anda." },
];

export default function ContactFeatures() {
  return (
    <section className="w-full bg-[#f3f4f6] py-24">
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
      >
        {features.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center">
               <Icon className="w-8 h-8 text-[#b3401a]" />
            </div>
            <h3 className="text-xl font-bold text-black">{title}</h3>
            <p className="text-zinc-600 text-sm leading-relaxed max-w-xs">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
