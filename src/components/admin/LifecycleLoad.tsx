"use client";

import { Compass, FlaskConical, Factory, Truck } from "lucide-react";

export default function LifecycleLoad() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6 flex flex-col gap-8 shadow-sm w-full">
      <h3 className="text-sm font-bold text-black">Manufacturing Lifecycle Load</h3>
      
      <div className="flex justify-between items-center w-full px-4 md:px-12 relative">
        {/* Connecting line */}
        <div className="absolute left-[10%] right-[10%] top-6 h-[1px] bg-zinc-200 -z-0"></div>

        {/* Design */}
        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-full bg-[#1a2332] text-white flex items-center justify-center border-4 border-white shadow-sm">
            <Compass className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-black">Design</span>
            <span className="text-[11px] font-bold text-[#f05c35]">12 Projects</span>
          </div>
        </div>

        {/* Prototyping */}
        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-full bg-[#1a2332] text-white flex items-center justify-center border-4 border-white shadow-sm">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-black">Prototyping</span>
            <span className="text-[11px] font-bold text-[#f05c35]">5 Active</span>
          </div>
        </div>

        {/* Production */}
        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-full bg-[#f05c35] text-white flex items-center justify-center border-4 border-white shadow-sm ring-4 ring-[#f05c35]/20">
            <Factory className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-black">Production</span>
            <span className="text-[11px] font-bold text-[#f05c35]">28 Batches</span>
          </div>
        </div>

        {/* Delivery */}
        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center border-4 border-white shadow-sm">
            <Truck className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-black">Delivery</span>
            <span className="text-[11px] font-medium text-zinc-500">Scheduled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
