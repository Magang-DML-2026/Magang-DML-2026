"use client";

import { Compass, FlaskConical, Factory, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductionLifecycle() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="w-full py-24 bg-[#111827] relative text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col items-center gap-16">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col gap-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Our Production Lifecycle
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">
            From initial design to mass production, we ensure rigorous quality control at every stage.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="w-full relative mt-8">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-zinc-700/50 -z-0"></div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6"
          >
            
            {/* Step 1: Design */}
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#1f2937] border-2 border-[#f05c35] flex items-center justify-center relative shadow-[0_0_15px_rgba(240,92,53,0.3)]">
                 <Compass className="w-6 h-6 text-white" />
                 {/* Connection dot */}
                 <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-[1px] h-[1px] bg-transparent"></div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">1. Design</h3>
                <p className="text-zinc-400 text-sm max-w-[200px] mx-auto leading-relaxed">
                  CAD-led engineering and material selection.
                </p>
              </div>
            </motion.div>

            {/* Step 2: Prototype */}
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#1f2937] border-2 border-zinc-700 flex items-center justify-center">
                 <FlaskConical className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">2. Prototype</h3>
                <p className="text-zinc-400 text-sm max-w-[200px] mx-auto leading-relaxed">
                  Rapid sampling and durability testing.
                </p>
              </div>
            </motion.div>

            {/* Step 3: Production */}
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#1f2937] border-2 border-zinc-700 flex items-center justify-center">
                 <Factory className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">3. Production</h3>
                <p className="text-zinc-400 text-sm max-w-[200px] mx-auto leading-relaxed">
                  Scale manufacturing with real-time monitoring.
                </p>
              </div>
            </motion.div>

            {/* Step 4: QC & Logistics */}
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#f05c35] border-2 border-[#f05c35] flex items-center justify-center shadow-[0_0_15px_rgba(240,92,53,0.5)]">
                 <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#f05c35]">4. QC & Logistics</h3>
                <p className="text-zinc-400 text-sm max-w-[200px] mx-auto leading-relaxed">
                  Final inspection and global dispatch.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
