"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown, Users, Circle } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function FilterModal({ isOpen, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [statuses, setStatuses] = useState({
    negotiation: true,
    pending: false,
    awaitingSpecs: true,
  });
  const [clientType, setClientType] = useState<"B2B" | "B2C">("B2B");

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleClearAll() {
    setStatuses({ negotiation: false, pending: false, awaitingSpecs: false });
    setClientType("B2B");
  }

  return (
    /* Positioned overlay — no dark backdrop, matches Figma */
    <div className="fixed inset-0 z-40 pointer-events-none">
      <div
        ref={ref}
        className="pointer-events-auto absolute bg-white rounded-xl shadow-2xl border border-zinc-200/80 w-[320px] overflow-hidden"
        style={{ top: "196px", left: "432px" }}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-zinc-100">
          <h3 className="font-semibold text-[15px] text-black">Advanced Filters</h3>
          <button
            onClick={handleClearAll}
            className="text-xs font-semibold text-[#d94a26] hover:text-[#c24222] transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-5">
          {/* Date Range */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              Date Range
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-zinc-200 rounded-lg pl-3 pr-8 py-2.5 text-sm text-black font-medium outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26]/30 cursor-pointer transition-all">
                <option>Fiscal Year 2024</option>
                <option>Fiscal Year 2023</option>
                <option>Last 30 Days</option>
                <option>This Quarter</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          {/* Order Status */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              <Circle className="w-3.5 h-3.5" />
              Order Status
            </label>
            <div className="flex flex-col gap-3">
              {[
                { key: "negotiation", label: "Negotiation" },
                { key: "pending", label: "Pending" },
                { key: "awaitingSpecs", label: "Awaiting Specs" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() =>
                      setStatuses((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
                    }
                    className={`w-4 h-4 rounded flex items-center justify-center border-2 shrink-0 transition-all ${
                      statuses[key as keyof typeof statuses]
                        ? "bg-[#d94a26] border-[#d94a26]"
                        : "bg-white border-zinc-300 group-hover:border-zinc-400"
                    }`}
                  >
                    {statuses[key as keyof typeof statuses] && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-black font-medium select-none">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Client Type */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              Client Type
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setClientType("B2B")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${
                  clientType === "B2B"
                    ? "bg-[#fef1ec] border-[#d94a26] text-[#d94a26]"
                    : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300"
                }`}
              >
                B2B
              </button>
              <button
                onClick={() => setClientType("B2C")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${
                  clientType === "B2C"
                    ? "bg-[#fef1ec] border-[#d94a26] text-[#d94a26]"
                    : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300"
                }`}
              >
                B2C
              </button>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#d94a26] hover:bg-[#c24222] active:bg-[#b33b1e] text-white font-bold text-sm rounded-lg shadow-sm transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
