"use client";

import { Mail } from "lucide-react";

export default function ProjectCTA() {
  return (
    <section className="w-full bg-[#0a0a0a] py-24 px-6 relative z-10">
      <div className="max-w-[800px] mx-auto flex flex-col items-center text-center gap-6">
        
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Ready to Build Together?
        </h2>
        
        <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
          Discuss your custom rubber manufacturing needs with our specialist engineers today.
        </p>

        <div className="flex items-center justify-center gap-4 mt-8 w-full flex-col sm:flex-row">
          <button className="w-full sm:w-auto bg-[#c0391d] text-white px-8 py-3.5 rounded-sm text-sm font-bold tracking-wide hover:bg-[#a63018] transition-colors shadow-lg flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            <span>Consult with Specialists</span>
          </button>
          <button className="w-full sm:w-auto bg-transparent text-white border-2 border-zinc-700 px-8 py-3.5 rounded-sm text-sm font-bold tracking-wide hover:border-zinc-500 transition-colors">
            Download Catalog
          </button>
        </div>

      </div>
    </section>
  );
}
