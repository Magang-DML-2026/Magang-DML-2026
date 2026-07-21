"use client";

import { X, CheckCircle2, User, Truck, Printer, ShieldCheck } from "lucide-react";

type Receipt = {
  id: string;
  customerInitials: string;
  customerName: string;
  orderId: string;
  amount: string;
  imageUrl: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  receipt: Receipt | null;
};

const orderItems = [
  { description: "Custom Rubber Gasket (Extrusion Model A)", qty: 250, unit: "Units", unitPrice: 12.0, total: 3000.0 },
  { description: "Precision Molding - Industrial Seal D4", qty: 100, unit: "Units", unitPrice: 45.5, total: 4550.0 },
];

const subtotal = orderItems.reduce((sum, i) => sum + i.total, 0);

function fmt(n: number) {
  return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function VerifyPaymentModal({ isOpen, onClose, receipt }: Props) {
  if (!isOpen || !receipt) return null;

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
      {/* Container: full-height flex column, capped at 95vh */}
      <div className="bg-[#f8f9fa] rounded-2xl w-full max-w-[960px] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">

        {/* Sticky Header */}
        <div className="bg-white px-4 sm:px-6 py-3 border-b border-zinc-200 flex items-center justify-between shrink-0 min-w-0">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500 min-w-0 flex-wrap">
            <span className="hidden sm:inline">Admin Portal /</span>
            <span>Orders /</span>
            <span className="font-semibold text-black truncate">{receipt.orderId}</span>
            <span>/ B2C Validation</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-black transition-colors rounded-md shrink-0 ml-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body — flex row on md+, stacked on mobile */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col lg:flex-row min-h-full">

            {/* Left — Receipt + Table */}
            <div className="flex-1 p-4 sm:p-6 flex flex-col gap-5 min-w-0">

              {/* Receipt Image Card */}
              <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
                <div className="px-4 py-2.5 border-b border-zinc-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-600 shrink-0"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 10h6M9 14h4"/></svg>
                    <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider truncate">
                      PAYMENT_RECEIPT_{receipt.customerInitials}_88.JPG
                    </span>
                  </div>
                  <div className="flex gap-1 text-zinc-400 shrink-0">
                    <button className="hover:text-black transition-colors p-1 rounded">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>
                    </button>
                    <button className="hover:text-black transition-colors p-1 rounded">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    </button>
                  </div>
                </div>

                {/* Receipt image — responsive height */}
                <div className="relative bg-zinc-300 overflow-hidden h-[180px] sm:h-[230px]">
                  <img src={receipt.imageUrl} alt="Payment Receipt" className="w-full h-full object-cover" />
                  {/* VERIFIED stamp */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="border-[3px] border-green-500 rounded-lg px-6 py-3 text-center bg-white/10 backdrop-blur-[1px]">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-green-500">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" opacity="0.15"/>
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/>
                          <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-green-500 font-black text-xl sm:text-2xl tracking-[0.3em] uppercase">Verified</p>
                      <p className="text-green-400 text-[11px] font-semibold mt-1 tracking-wider">01 OCT 2023 - 14:22</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details Table — horizontally scrollable on mobile */}
              <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
                <div className="px-4 sm:px-5 py-3.5 border-b border-zinc-200">
                  <h3 className="font-bold text-sm sm:text-base text-black">B2C Order Details</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[400px]">
                    <thead>
                      <tr className="bg-black text-white text-xs">
                        <th className="px-4 sm:px-5 py-3 text-left font-bold">Item Description</th>
                        <th className="px-4 sm:px-5 py-3 text-right font-bold">Quantity</th>
                        <th className="px-4 sm:px-5 py-3 text-right font-bold">Unit Price</th>
                        <th className="px-4 sm:px-5 py-3 text-right font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {orderItems.map((item, i) => (
                        <tr key={i}>
                          <td className="px-4 sm:px-5 py-3 text-xs sm:text-sm text-black">{item.description}</td>
                          <td className="px-4 sm:px-5 py-3 text-xs sm:text-sm text-right text-black whitespace-nowrap">{item.qty.toLocaleString("en-US")} {item.unit}</td>
                          <td className="px-4 sm:px-5 py-3 text-xs sm:text-sm text-right text-black">${item.unitPrice.toFixed(2)}</td>
                          <td className="px-4 sm:px-5 py-3 text-xs sm:text-sm text-right font-semibold text-black">${fmt(item.total)}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={3} className="px-4 sm:px-5 py-3 text-right text-xs sm:text-sm font-semibold text-zinc-500">Subtotal</td>
                        <td className="px-4 sm:px-5 py-3 text-right text-xs sm:text-sm font-bold text-black">${fmt(subtotal)}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#d94a26] text-white">
                        <td colSpan={3} className="px-4 sm:px-5 py-3 font-bold text-xs sm:text-sm">Total Paid</td>
                        <td className="px-4 sm:px-5 py-3 font-black text-xs sm:text-sm text-right">${fmt(subtotal)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Sidebar — full width on mobile, fixed on lg */}
            <div className="lg:w-[270px] lg:shrink-0 p-4 sm:p-6 flex flex-col gap-4 lg:border-l border-t lg:border-t-0 border-zinc-200 bg-white">

              {/* Customer Info */}
              <div className="border border-zinc-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-zinc-500" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-black truncate">{receipt.customerName}</h4>
                    <p className="text-xs text-zinc-500">Premium B2C Partner</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-3">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Verified Identity
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between gap-2">
                    <span className="text-zinc-500 shrink-0">Email:</span>
                    <span className="font-semibold text-black text-right truncate">{receipt.customerName.toLowerCase().replace(" ", ".")}@example.com</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-zinc-500 shrink-0">Location:</span>
                    <span className="font-semibold text-black">Surabaya, ID</span>
                  </div>
                </div>
              </div>

              {/* Verification Complete */}
              <div className="border border-zinc-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <h4 className="font-bold text-sm text-green-700">Verification Complete</h4>
                </div>
                <p className="text-xs text-green-800 bg-green-50 border border-green-200 rounded-lg p-3 leading-relaxed mb-3">
                  Payment Confirmed for {receipt.customerName}. Transaction matches invoice precisely. Logged to ledger.
                </p>
                <button className="w-full py-2.5 bg-[#d94a26] hover:bg-[#c24222] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 mb-2">
                  <Truck className="w-3.5 h-3.5" />
                  Move to Shipping
                </button>
                <button className="w-full py-2.5 bg-white border border-zinc-200 hover:bg-zinc-50 text-black font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Printer className="w-3.5 h-3.5" />
                  Print Order Manifest
                </button>
                <p className="text-[10px] text-zinc-400 mt-3 flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Processed by System Admin at {timeStr}
                </p>
              </div>

              {/* Quality Certified */}
              <div className="bg-[#0f172a] rounded-xl p-4 flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#d94a26] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#d94a26] text-xs font-bold mb-1">Quality Certified</p>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    This order complies with DML Industrial Standard ISO-9001 for rubber extrusion manufacturing.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
