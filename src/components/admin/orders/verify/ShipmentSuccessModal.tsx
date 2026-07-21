"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

type Props = {
  isOpen: boolean;
  orderId: string;
  carrier: string;
};

export function ShipmentSuccessModal({ isOpen, orderId, carrier }: Props) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative flex flex-col p-8 items-center text-center animate-in fade-in zoom-in duration-300">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 relative">
          <div className="w-14 h-14 bg-[#d94a26] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
          {/* Decorative rings */}
          <div className="absolute inset-0 rounded-full border-4 border-orange-50 animate-ping opacity-50" style={{ animationDuration: '2s' }}></div>
        </div>

        <h2 className="text-2xl font-black text-black mb-2 leading-tight">
          Shipment Dispatched<br/>Successfully
        </h2>
        <p className="text-sm text-zinc-500 mb-8">
          Order {orderId} has been handed over to {carrier}.
        </p>

        {/* Tracking Details Box */}
        <div className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-5 mb-8 text-left">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Tracking Number</span>
            <span className="font-bold text-black text-sm">JNT-9812234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Est. Arrival</span>
            <span className="font-bold text-black text-sm">Oct 24 - Oct 25, 2023</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button 
            onClick={() => router.push("/admin/orders")}
            className="w-full py-3.5 bg-[#b2391b] hover:bg-[#912d14] text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
          >
            Return to Dashboard
          </button>
          <button 
            onClick={() => router.push(`/admin/orders/${orderId}`)}
            className="w-full py-3.5 bg-white text-[#d94a26] font-bold text-sm rounded-xl transition-colors hover:bg-orange-50"
          >
            View Order Details
          </button>
        </div>
      </div>
    </div>
  );
}
