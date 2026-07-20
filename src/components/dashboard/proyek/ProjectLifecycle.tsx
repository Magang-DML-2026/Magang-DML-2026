"use client";

import { motion } from "framer-motion";
import { PenTool, Beaker, Factory, ShieldCheck } from "lucide-react";

export default function ProjectLifecycle() {
  const steps = [
    { icon: PenTool, title: "Design", desc: "Custom engineering for unique industrial specs.", active: false },
    { icon: Beaker, title: "Prototype", desc: "Rigorous testing in our proprietary materials lab.", active: false },
    { icon: Factory, title: "Mass Production", desc: "High-volume manufacturing with ISO standards.", active: true },
    { icon: ShieldCheck, title: "Quality QC", desc: "100% inspection before final client delivery.", active: false }
  ];

  return (
    <section className="w-full bg-[#F9FAFB] py-20 px-6 pb-32">
      <div className="max-w-[1000px] mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">Industrial Lifecycle</h2>
          <p className="text-zinc-500 text-sm mt-2">From initial blueprint to global distribution.</p>
        </div>

        {/* Timeline Stepper */}
        <div className="w-full relative flex justify-between items-start">
          
          {/* Connecting Line */}
          <div className="absolute top-[24px] left-0 w-full h-[1px] bg-zinc-300 -z-10 hidden md:block"></div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center max-w-[200px] w-full relative"
              >
                {/* Connecting Line (Mobile) */}
                {i !== steps.length - 1 && (
                  <div className="absolute top-[24px] left-[50%] w-full h-[1px] bg-zinc-300 -z-10 md:hidden"></div>
                )}
                
                {/* Icon Circle */}
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-[3px] mb-4 transition-all duration-300 ${
                    step.active 
                      ? "bg-white border-[#c0391d] shadow-[0_0_15px_rgba(192,57,29,0.3)]" 
                      : "bg-white border-black"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.active ? "bg-[#c0391d] text-white" : "bg-black text-white"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-zinc-900 mb-2">{step.title}</h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed px-2">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
