"use client";

import { PenTool, Wrench, Factory, Truck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: PenTool, label: "Design", desc: "CAD modeling and material selection consultation.", accent: false },
  { icon: Wrench, label: "Prototype", desc: "Rapid tooling for functional sample approval.", accent: false },
  { icon: Factory, label: "Production", desc: "High-volume mass manufacturing and finishing.", accent: true },
  { icon: Truck, label: "Logistics", desc: "Global supply chain and distribution management.", accent: false },
];

export default function ServicesLifecycle() {
  return (
    <section className="w-full bg-[#f3f4f6] py-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col items-center gap-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col gap-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
            Our Manufacturing Lifecycle
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="w-full relative mt-8">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-zinc-300 -z-0"></div>

          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6"
          >
            {steps.map(({ icon: Icon, label, desc, accent }) => (
              <motion.div
                key={label}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="flex flex-col items-center text-center gap-6 relative z-10"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                    accent
                      ? "bg-[#f05c35] shadow-[#f05c35]/30 scale-110"
                      : "bg-black"
                  }`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex flex-col gap-2 ${accent ? "mt-1" : ""}`}>
                  <h3 className="text-lg font-bold text-black">{label}</h3>
                  <p className="text-zinc-500 text-sm max-w-[200px] mx-auto leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
