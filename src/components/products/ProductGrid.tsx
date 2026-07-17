import { ShoppingCart, PlusCircle, CheckCircle2, Factory } from "lucide-react";

export default function ProductGrid() {
  return (
    <section className="w-full bg-[#f9fafb] pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col gap-6">
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Card 1: Steering Wheel Cover (col-span-2) */}
          <div className="md:col-span-2 bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm flex flex-col sm:flex-row hover:shadow-md transition-shadow">
            {/* Image Side */}
            <div className="w-full sm:w-1/2 h-[300px] sm:h-auto bg-[#cbb8a9] relative overflow-hidden flex items-center justify-center p-4">
               {/* Simulating the steering wheel image */}
               <div className="w-[180px] h-[180px] rounded-full border-[20px] border-[#2c2c2e] shadow-2xl"></div>
               <div className="absolute top-4 left-4 bg-[#f05c35] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                 Ready Stock
               </div>
            </div>
            {/* Text Side */}
            <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-widest text-[#f05c35] uppercase">
                  Automotive
                </span>
                <h3 className="text-xl font-bold text-black leading-tight">
                  Steering Wheel<br/>Cover
                </h3>
                <ul className="flex flex-col gap-2 mt-2">
                  <li className="flex items-center gap-2 text-sm text-zinc-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" /> High-grip Polymer
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" /> Universal 38cm fit
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" /> Heat resistant
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-zinc-100">
                <span className="font-medium text-black">Rp 185.000</span>
                <button className="w-10 h-10 bg-black text-white rounded-md flex items-center justify-center hover:bg-zinc-800 transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Mudguards (col-span-1) */}
          <div className="md:col-span-1 bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="w-full h-[200px] bg-[#d1d5db] flex items-center justify-center p-4">
              <div className="w-full h-full bg-[#202124] rounded-md border border-zinc-600 shadow-xl relative">
                {/* Simulated mudguard holes */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                <div className="absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold tracking-widest text-[#f05c35] uppercase">
                  Automotive
                </span>
                <h3 className="text-lg font-bold text-black leading-tight">
                  Heavy-Duty Mudguards
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Reinforced rubber mudguards for SUVs and trucks.
                </p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-100">
                <span className="font-bold text-sm text-black">Rp 320.000 / Set</span>
                <button className="text-zinc-400 hover:text-black transition-colors">
                  <PlusCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Precision Seals (col-span-1) */}
          <div className="md:col-span-1 bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="w-full h-[200px] bg-[#e5e7eb] flex items-center justify-center">
              {/* Simulating O-rings */}
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full border-[12px] border-[#1a1a1c] shadow-lg translate-x-2 -translate-y-2"></div>
                <div className="absolute inset-0 rounded-full border-[12px] border-[#2c2c2e] shadow-lg -translate-x-2 translate-y-2"></div>
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold tracking-widest text-[#f05c35] uppercase">
                  Industrial
                </span>
                <h3 className="text-lg font-bold text-black leading-tight">
                  Precision Seals
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Nitrile O-rings and gaskets for pressure containment.
                </p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-100">
                <span className="font-bold text-sm text-black">Rp 12.500 / Unit</span>
                <button className="text-zinc-400 hover:text-black transition-colors">
                  <PlusCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Anti-Slip Safety Soles (col-span-2) */}
          <div className="md:col-span-2 bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm flex flex-col sm:flex-row hover:shadow-md transition-shadow">
            {/* Text Side */}
            <div className="w-full sm:w-[55%] p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-widest text-[#f05c35] uppercase">
                  Custom Molding
                </span>
                <h3 className="text-xl font-bold text-black leading-tight">
                  Anti-Slip Safety<br/>Soles
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Engineered for industrial safety footwear. Provides superior traction on oil and moisture-heavy surfaces.
                </p>
                <div className="flex gap-2 mt-2">
                  <div className="bg-zinc-100 border border-zinc-200 rounded px-3 py-2 flex flex-col">
                    <span className="text-[10px] text-zinc-500">Durability</span>
                    <span className="text-sm font-semibold">Grade A+</span>
                  </div>
                  <div className="bg-zinc-100 border border-zinc-200 rounded px-3 py-2 flex flex-col">
                    <span className="text-[10px] text-zinc-500">Material</span>
                    <span className="text-sm font-semibold">Vulcanized</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="font-medium text-black">Rp 45.000 / Pair</span>
                <button className="bg-[#b3401a] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#8f3113] transition-colors shadow-md">
                  Bulk Quote
                </button>
              </div>
            </div>
            {/* Image Side */}
            <div className="w-full sm:w-[45%] h-[300px] sm:h-auto bg-[#8ca3a6] relative flex items-center justify-center p-4">
              {/* Simulating shoe sole */}
               <div className="w-[100px] h-[220px] bg-[#a8683f] rounded-[40px] opacity-90 shadow-2xl border-2 border-[#824b29] flex flex-col items-center justify-between py-6">
                 <div className="w-16 h-20 border-2 border-[#824b29]/50 rounded-xl"></div>
                 <div className="w-16 h-12 border-2 border-[#824b29]/50 rounded-xl"></div>
               </div>
            </div>
          </div>

          {/* Card 5: Custom Project CTA (col-span-2) */}
          <div className="md:col-span-2 bg-[#0b1121] rounded-xl overflow-hidden shadow-lg flex flex-col items-center justify-center p-12 text-center gap-6">
            <div className="w-14 h-14 bg-[#f05c35] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(240,92,53,0.4)]">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg text-zinc-300">Need Custom Specifications?</h3>
              <p className="text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">
                Our engineering team can manufacture rubber components to your exact blueprint requirements and shore hardness needs.
              </p>
            </div>
            <button className="mt-2 bg-white text-black px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-zinc-200 transition-colors">
              Start Custom Project
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
