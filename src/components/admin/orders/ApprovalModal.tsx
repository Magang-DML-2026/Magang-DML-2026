"use client";

import { X, AlertTriangle } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onConfirmed?: (orderId: string) => void;
};

const steps = [
  { label: "Quoted", num: 1 },
  { label: "Approval", num: 2 },
  { label: "Production", num: 3 },
  { label: "Shipping", num: 4 },
];

export function ApprovalModal({ isOpen, onClose, order, onConfirmed }: Props) {
  if (!isOpen || !order) return null;

  function handleConfirm() {
    onConfirmed?.(order.id);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-[560px] shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 flex items-start justify-between border-b border-zinc-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-black leading-tight">Confirm Approval</h2>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Order Validation Required</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-black transition-colors p-1 mt-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="px-6 sm:px-8 py-6 flex flex-col gap-6 overflow-y-auto flex-1">
          {/* Description */}
          <p className="text-sm text-zinc-600 leading-relaxed">
            You are about to authorize the production lifecycle for Request for Quotation{" "}
            <span className="font-bold text-black">{order.id}</span> from{" "}
            <span className="font-bold text-black">{order.clientName}</span>. Please verify the
            financial and logistical summaries before final confirmation.
          </p>

          {/* Info Card */}
          <div className="border border-zinc-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-zinc-200">
              <div className="p-5 border-b border-zinc-200">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Client Name</p>
                <p className="text-base font-bold text-black">{order.clientName}</p>
              </div>
              <div className="p-5 border-b border-zinc-200">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Location</p>
                <p className="text-base font-bold text-black">Surabaya, IDN</p>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-zinc-200">
              <div className="p-5">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Order Quantity</p>
                <p className="text-3xl font-black text-black">
                  {order.items.toLocaleString("en-US")}{" "}
                  <span className="text-base font-bold text-zinc-500">{order.unitType}</span>
                </p>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Total Value</p>
                <p className="text-3xl font-black text-[#d94a26]">
                  <span className="text-base font-bold">IDR </span>
                  {order.estimatedValue}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="relative flex items-center justify-between">
            {/* Connector line */}
            <div className="absolute top-[18px] left-0 right-0 h-[2px] bg-zinc-200 z-0" />
            <div className="absolute top-[18px] left-0 w-[37%] h-[2px] bg-[#d94a26] z-0" />

            {steps.map((step) => {
              const isDone = step.num <= 2;
              const isCurrent = step.num === 2;
              return (
                <div key={step.num} className="flex flex-col items-center gap-2 relative z-10">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                    isDone
                      ? "bg-[#d94a26] border-[#d94a26] text-white"
                      : "bg-white border-zinc-300 text-zinc-400"
                  }`}>
                    {step.num}
                  </div>
                  <span className={`text-xs font-semibold ${isCurrent ? "text-black font-bold" : isDone ? "text-[#d94a26]" : "text-zinc-400"}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Warning */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 leading-relaxed">
              This action is permanent and will trigger materials procurement. Ensure all specifications
              match the technical design document{" "}
              <span className="font-bold underline cursor-pointer">#TDD-552</span>.
            </p>
          </div>
        </div>

        {/* Footer — sticky */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4 flex items-center gap-3 border-t border-zinc-100 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-white border border-zinc-200 hover:bg-zinc-50 text-black font-semibold text-sm rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-[2] py-3 bg-[#d94a26] hover:bg-[#c24222] active:bg-[#b33b1e] text-white font-bold text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            Confirm & Approve
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>

      </div>
    </div>
  );
}
