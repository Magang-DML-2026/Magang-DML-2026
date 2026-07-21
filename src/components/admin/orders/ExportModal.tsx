"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ExportModal({ isOpen, onClose }: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"compiling" | "done">("compiling");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setPhase("compiling");
      return;
    }

    // Simulate progress: fast at first, slows near 100%
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current!);
          setPhase("done");
          return 100;
        }
        const increment = prev < 70 ? Math.random() * 4 + 2 : Math.random() * 1.5 + 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen]);

  function handleCancel() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(0);
    setPhase("compiling");
    onClose();
  }

  function handleDownload() {
    // Generate CSV blob from mock data
    const csvRows = [
      ["RFQ ID", "Client Name", "Project", "Items", "Unit Type", "Material", "Estimated Value (IDR)", "Status"],
      ["RFQ #2024-0089", "Indo-Machine Parts Ltd.", "Custom Seals", "5000", "Units", "EPDM Rubber Molding", "145,500,000", "Negotiation"],
      ["RFQ #2024-0102", "Surya Automotives", "Engine Mounts", "1200", "Units", "Natural Rubber Extrusion", "82,200,000", "Pending Admin"],
      ["RFQ #2024-0115", "Mega Build Solutions", "Bridge Bearings", "150", "Units", "Heavy Duty Neoprene", "210,000,000", "Awaiting Specs"],
    ];
    const csvContent = csvRows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `DML_B2B_Orders_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    onClose();
  }

  if (!isOpen) return null;

  const displayProgress = Math.round(progress);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-[440px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto p-6 sm:p-8 flex flex-col items-center text-center gap-6">

        {/* Icon */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
          phase === "done" ? "bg-green-100" : "bg-[#d94a26]/10"
        }`}>
          {phase === "done" ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d94a26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="2" x2="12" y2="6"/>
              <line x1="12" y1="18" x2="12" y2="22"/>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
              <line x1="2" y1="12" x2="6" y2="12"/>
              <line x1="18" y1="12" x2="22" y2="12"/>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
            </svg>
          )}
        </div>

        {/* Text */}
        {phase === "compiling" ? (
          <>
            <div>
              <h2 className="text-xl font-bold text-black mb-2">Preparing your export...</h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-[300px] mx-auto">
                Gathering manufacturing logs and B2B transaction history for the selected date range.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                <span>Compiling Data</span>
                <span>{displayProgress}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#d94a26] rounded-full transition-all duration-150 ease-linear"
                  style={{ width: `${displayProgress}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleCancel}
              className="text-sm font-semibold text-zinc-500 hover:text-black transition-colors"
            >
              Cancel Export
            </button>
          </>
        ) : (
          <>
            <div>
              <h2 className="text-xl font-bold text-black mb-2">Export Ready!</h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-[300px] mx-auto">
                Your CSV file has been compiled and is ready to download.
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-white border border-zinc-200 hover:bg-zinc-50 text-black font-semibold text-sm rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleDownload}
                className="flex-[2] py-2.5 bg-[#d94a26] hover:bg-[#c24222] text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download CSV
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
