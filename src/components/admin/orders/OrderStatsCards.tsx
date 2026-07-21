import { AlertTriangle, Clock, ShieldCheck, TrendingUp } from "lucide-react";

export function OrderStatsCards() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
          <div className="mt-1">
            <AlertTriangle className="w-5 h-5 text-amber-600" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-black mb-1">Price Volatility Alert</h3>
            <p className="text-[13px] text-zinc-500 leading-relaxed">
              Raw rubber prices surged by 3.2% today. Review RFQ margins.
            </p>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
          <div className="mt-1">
            <Clock className="w-5 h-5 text-[#f05c35]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-black mb-1">Production Load</h3>
            <p className="text-[13px] text-zinc-500 leading-relaxed">
              Extrusion lines are at 92% capacity. SPK lead times +2 days.
            </p>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
          <div className="mt-1">
            <ShieldCheck className="w-5 h-5 text-slate-700" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-black mb-1">System Integrity</h3>
            <p className="text-[13px] text-zinc-500 leading-relaxed">
              Automatic receipt scanning enabled. 98% accuracy rate.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] rounded-xl p-5 flex items-center justify-between text-white shadow-lg overflow-hidden relative">
        {/* Subtle background element */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <TrendingUp className="w-5 h-5 text-[#f05c35]" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white/90 mb-1">Negotiation Performance</h3>
            <p className="text-[13px] text-white/60">
              Average closing time for B2B RFQs has improved by 14% this month.
            </p>
          </div>
        </div>
        <button className="relative z-10 w-10 h-10 rounded-full bg-[#f05c35] hover:bg-[#d94a26] flex items-center justify-center transition-colors shadow-lg shadow-[#f05c35]/20 shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
