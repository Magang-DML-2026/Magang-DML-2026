"use client";

import { useState } from "react";
import { X, AlertOctagon, ChevronRight } from "lucide-react";

import { Receipt } from "@/components/admin/orders/receiptData";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  receipt: Receipt | null;
  onConfirmed?: (receiptId: string, reason: string, notes: string) => void;
};

const REJECTION_REASONS = [
  {
    id: "unclear",
    label: "Receipt is unclear / unreadable",
    description: "Image quality too low to confirm payment details.",
  },
  {
    id: "mismatch",
    label: "Amount doesn't match invoice",
    description: "Stated payment differs from the order total.",
  },
  {
    id: "duplicate",
    label: "Duplicate submission",
    description: "This receipt has already been processed.",
  },
  {
    id: "fraud",
    label: "Suspected fraud or tampering",
    description: "Receipt appears to have been digitally altered.",
  },
  {
    id: "missing_info",
    label: "Missing required information",
    description: "Bank name, account, or transfer reference is absent.",
  },
];

export function RejectModal({ isOpen, onClose, receipt, onConfirmed }: Props) {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<"reason" | "confirm" | "done">("reason");

  if (!isOpen || !receipt) return null;

  function handleClose() {
    // Reset state on close
    setSelectedReason("");
    setNotes("");
    setStep("reason");
    onClose();
  }

  function handleContinue() {
    if (!selectedReason) return;
    setStep("confirm");
  }

  function handleConfirm() {
    onConfirmed?.(receipt!.id, selectedReason, notes);
    setStep("done");
  }

  const selectedReasonLabel = REJECTION_REASONS.find((r) => r.id === selectedReason)?.label ?? "";

  // ── Step: Done (success feedback) ──────────────────────
  if (step === "done") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-[440px] shadow-2xl p-8 flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-black mb-1">Rejection Recorded</h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Order <span className="font-semibold text-black">{receipt.orderId}</span> has been rejected and{" "}
              <span className="font-semibold text-black">{receipt.customerName}</span> will be notified via email with the rejection reason.
            </p>
          </div>
          <div className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-left">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Rejection Reason</p>
            <p className="text-sm font-semibold text-black">{selectedReasonLabel}</p>
            {notes && (
              <>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-3 mb-1">Admin Notes</p>
                <p className="text-sm text-zinc-600">{notes}</p>
              </>
            )}
          </div>
          <button
            onClick={handleClose}
            className="w-full py-3 bg-black hover:bg-zinc-800 text-white font-bold text-sm rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-[520px] shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-6 pt-6 pb-5 flex items-start justify-between border-b border-zinc-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
              <AlertOctagon className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-black leading-tight">Reject Payment Receipt</h2>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mt-0.5">
                {step === "reason" ? "Select Rejection Reason" : "Review & Confirm"}
              </p>
            </div>
          </div>
          <button onClick={handleClose} className="text-zinc-400 hover:text-black transition-colors p-1 mt-0.5 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Info Bar */}
        <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center font-bold text-[11px] shrink-0">
              {receipt.customerInitials}
            </div>
            <div>
              <p className="text-xs font-bold text-black leading-tight">{receipt.customerName}</p>
              <p className="text-[11px] text-zinc-500">{receipt.orderId}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] font-bold text-zinc-400">AMOUNT</p>
            <p className="text-sm font-bold text-black">IDR {receipt.amount}</p>
          </div>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {step === "reason" && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-zinc-600 leading-relaxed">
                Select a reason for rejecting this payment. The customer will be notified automatically with the selected reason.
              </p>

              {/* Reason Radio Group */}
              <div className="flex flex-col gap-2">
                {REJECTION_REASONS.map((reason) => {
                  const isSelected = selectedReason === reason.id;
                  return (
                    <button
                      key={reason.id}
                      onClick={() => setSelectedReason(reason.id)}
                      className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all flex items-start gap-3 ${
                        isSelected
                          ? "border-red-400 bg-red-50"
                          : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50"
                      }`}
                    >
                      {/* Custom radio dot */}
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected ? "border-red-500 bg-red-500" : "border-zinc-300"
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold leading-tight ${isSelected ? "text-red-700" : "text-black"}`}>
                          {reason.label}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{reason.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1.5 uppercase tracking-wider">
                  Additional Notes <span className="font-normal text-zinc-400 normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., The receipt timestamp is from 3 days ago but was submitted today…"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-black placeholder:text-zinc-400 outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-zinc-600 leading-relaxed">
                Please review the details below before confirming. This action will be logged to the audit trail.
              </p>

              {/* Summary Card */}
              <div className="border border-zinc-200 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-zinc-100">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Rejection Reason</p>
                  <p className="text-sm font-bold text-black">{selectedReasonLabel}</p>
                </div>
                {notes ? (
                  <div className="p-4 border-b border-zinc-100">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Admin Notes</p>
                    <p className="text-sm text-zinc-700 leading-relaxed">{notes}</p>
                  </div>
                ) : null}
                <div className="p-4 bg-zinc-50 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Customer</p>
                    <p className="text-sm font-semibold text-black">{receipt.customerName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Order ID</p>
                    <p className="text-sm font-semibold text-black">{receipt.orderId}</p>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                  <path d="M12 9v4"/><path d="M12 17h.01"/>
                </svg>
                <p className="text-xs text-amber-800 leading-relaxed">
                  <span className="font-bold">This action is permanent.</span> The rejection will be logged to the audit trail and an automated email will be sent to{" "}
                  <span className="font-semibold">{receipt.customerName}</span> asking them to resubmit a valid receipt.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer — sticky */}
        <div className="px-6 pb-6 pt-4 border-t border-zinc-100 shrink-0">
          {step === "reason" ? (
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 bg-white border border-zinc-200 hover:bg-zinc-50 text-black font-semibold text-sm rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={!selectedReason}
                className="flex-[2] py-2.5 bg-zinc-900 hover:bg-black disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setStep("reason")}
                className="flex-1 py-2.5 bg-white border border-zinc-200 hover:bg-zinc-50 text-black font-semibold text-sm rounded-xl transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-[2] py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <AlertOctagon className="w-4 h-4" />
                Confirm Rejection
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
