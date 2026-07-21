"use client";

import { X, ClipboardCheck, Info } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  order: any;
};

export function SPKModal({ isOpen, onClose, order }: Props) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-[500px] shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d94a26]/10 text-[#d94a26] rounded-md flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-black text-base">Generate SPK</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Surat Perintah Kerja • Order ID {order.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-black transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="p-4 sm:p-6 flex flex-col gap-5 bg-zinc-50/50 overflow-y-auto flex-1">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5 flex items-center gap-1">
                Production Line Assignment
              </label>
              <select className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26] transition-shadow appearance-none">
                <option>Line A - Heavy Injection Molding</option>
                <option>Line B - Extrusion</option>
                <option>Line C - Custom Assembly</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5 flex items-center gap-1">
                Target Start Date
              </label>
              <input type="date" className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26] transition-shadow" defaultValue="2023-11-15" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5 flex items-center gap-1">
                Priority Level
              </label>
              <div className="flex bg-white border border-zinc-200 rounded-lg overflow-hidden">
                <button className="flex-1 py-2 text-xs font-bold text-white bg-[#d94a26]">Standard</button>
                <button className="flex-1 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-50">Urgent</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5 flex items-center gap-1">
                Work Shift
              </label>
              <select className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26] transition-shadow appearance-none">
                <option>Shift 1 (07:00 - 15:00)</option>
                <option>Shift 2 (15:00 - 23:00)</option>
                <option>Shift 3 (23:00 - 07:00)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5 flex items-center gap-1">
              Additional Technical Notes
            </label>
            <textarea 
              rows={3} 
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26] transition-shadow resize-none"
              placeholder="e.g., Specific heat tolerances or specialized mold maintenance required..."
            ></textarea>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 flex gap-3">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 leading-relaxed">
              By generating this SPK, the system will automatically allocate {order.items.toLocaleString("en-US")} {order.unitType.toLowerCase()} of raw {order.material} from inventory and sync this task with the selected production line tablet.
            </p>
          </div>

        </div>

        {/* Footer — sticky */}
        <div className="p-4 border-t border-zinc-200 flex items-center justify-between gap-3 bg-white shrink-0">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 bg-white border border-zinc-300 hover:bg-zinc-50 text-black font-semibold text-sm rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button className="flex-[2] py-2.5 bg-[#d94a26] hover:bg-[#c24222] text-white font-semibold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
            Generate & Sync
          </button>
        </div>

      </div>
    </div>
  );
}
