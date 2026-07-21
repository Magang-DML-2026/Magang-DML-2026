"use client";

import { useState } from "react";
import { X, MapPin, Truck, Factory, ArrowDownRight } from "lucide-react";
import { Receipt } from "@/components/admin/orders/receiptData";

type LogisticsPartner = "jnt" | "jne" | "internal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (carrier: string) => void;
  receipt: Receipt;
};

export function MoveToShippingModal({ isOpen, onClose, onSuccess, receipt }: Props) {
  const [selectedPartner, setSelectedPartner] = useState<LogisticsPartner>("jnt");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-200 flex items-start justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-black mb-1">Move to Shipping</h2>
            <p className="text-sm text-zinc-500">
              Order {receipt.orderId} • Payment confirmed by Finance
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
          
          {/* Customer & Destination Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Customer Details</p>
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 h-full">
                <p className="font-bold text-black mb-1">{receipt.customerName}</p>
                <p className="text-sm text-zinc-600 mb-1">{receipt.customerName.toLowerCase().replace(" ", ".")}@example.com</p>
                <p className="text-sm text-zinc-600">+62 812 3456 7890</p>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Destination</p>
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 h-full">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#d94a26] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-black mb-1">Surabaya, ID</p>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      Jl. Mayjen Sungkono No. 178,<br />
                      Dukuh Pakis, Surabaya, Jawa<br />
                      Timur 60225
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logistics Partner */}
          <div>
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Logistics Partner</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Option 1 */}
              <label className={`
                relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                ${selectedPartner === "jnt" ? "border-[#d94a26] bg-[#d94a26]/5" : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"}
              `}>
                <input 
                  type="radio" 
                  name="logistics" 
                  value="jnt" 
                  className="sr-only"
                  checked={selectedPartner === "jnt"}
                  onChange={() => setSelectedPartner("jnt")}
                />
                <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center mb-3">
                  <Truck className="w-5 h-5 text-black" />
                </div>
                <p className="font-bold text-black text-sm mb-1">J&T Express</p>
                <p className="text-xs text-zinc-500">Standard 2-3 Days</p>
              </label>

              {/* Option 2 */}
              <label className={`
                relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                ${selectedPartner === "jne" ? "border-[#d94a26] bg-[#d94a26]/5" : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"}
              `}>
                <input 
                  type="radio" 
                  name="logistics" 
                  value="jne" 
                  className="sr-only"
                  checked={selectedPartner === "jne"}
                  onChange={() => setSelectedPartner("jne")}
                />
                <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center mb-3">
                  <ArrowDownRight className="w-5 h-5 text-black" />
                </div>
                <p className="font-bold text-black text-sm mb-1">JNE Regular</p>
                <p className="text-xs text-zinc-500">Standard 1-2 Days</p>
              </label>

              {/* Option 3 */}
              <label className={`
                relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                ${selectedPartner === "internal" ? "border-[#d94a26] bg-[#d94a26]/5" : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"}
              `}>
                <input 
                  type="radio" 
                  name="logistics" 
                  value="internal" 
                  className="sr-only"
                  checked={selectedPartner === "internal"}
                  onChange={() => setSelectedPartner("internal")}
                />
                <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center mb-3">
                  <Factory className="w-5 h-5 text-black" />
                </div>
                <p className="font-bold text-black text-sm mb-1">Internal Fleet</p>
                <p className="text-xs text-zinc-500">Scheduled Dispatch</p>
              </label>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-zinc-100 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
              </svg>
              <span className="text-sm">Estimated pickup within 24 hours of confirmation.</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">Estimated Cost</p>
              <p className="font-black text-black text-sm">Rp 450.000,00</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-200 bg-white flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-zinc-200 text-black font-semibold text-sm hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              const carrierMap = { jnt: "J&T Express", jne: "JNE Regular", internal: "Internal Fleet" };
              onSuccess(carrierMap[selectedPartner]);
            }}
            className="px-5 py-2.5 rounded-lg bg-[#d94a26] hover:bg-[#c24222] text-white font-semibold text-sm transition-colors flex items-center gap-2"
          >
            <Truck className="w-4 h-4" />
            Confirm & Ship
          </button>
        </div>
      </div>
    </div>
  );
}
