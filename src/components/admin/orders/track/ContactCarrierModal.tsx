"use client";

import { X, Star, Package, PhoneCall, ShieldAlert, MessageCircle, Send, CheckCircle2, ShieldCheck } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
};

export function ContactCarrierModal({ isOpen, onClose, orderId }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-end p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Panel */}
      <div className="bg-[#f9fafb] shadow-2xl w-full max-w-[400px] h-full max-h-[90vh] rounded-2xl overflow-hidden relative flex flex-col animate-in slide-in-from-right-10 duration-300">
        
        {/* Header */}
        <div className="bg-white border-b border-zinc-200 px-6 py-5 flex justify-between items-start shrink-0">
          <div>
            <h2 className="text-lg font-black text-black">Contact Carrier</h2>
            <p className="text-[11px] text-zinc-500 mt-1">Inquiry for Shipment #{orderId}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-zinc-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          
          {/* Carrier Info */}
          <div className="bg-white border border-zinc-200 rounded-xl p-4 flex gap-4 items-center">
            <div className="w-14 h-14 border border-zinc-200 rounded flex items-center justify-center bg-white shrink-0 p-2">
              <span className="font-black text-[#e83e23] italic tracking-tighter text-lg leading-none">J&T</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-bold text-black text-sm">J&T Express</h3>
                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase">VERIFIED</span>
              </div>
              <p className="text-[10px] text-zinc-500 mb-2">Priority Logistics Partner</p>
              <div className="flex gap-3 text-[10px] font-bold text-black">
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> 4.9</span>
                <span className="flex items-center gap-1"><Package className="w-3 h-3 text-zinc-400" /> 152 deliveries</span>
              </div>
            </div>
          </div>

          {/* Assigned Driver */}
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">ASSIGNED DRIVER</p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" alt="Driver" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-black text-sm">Budi Santoso</p>
                  <p className="text-[11px] text-zinc-500 font-mono">ID: JT-88290-BS</p>
                </div>
              </div>
              <button className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-colors">
                <PhoneCall className="w-4 h-4 text-black" />
              </button>
            </div>
            
            <button className="w-full py-3 bg-white border border-zinc-200 hover:bg-zinc-50 text-black font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
              <span className="font-black">SOS</span> EMERGENCY CALL
            </button>
            <p className="text-[10px] text-zinc-500 text-center mt-2 leading-relaxed px-2">
              Direct line to Logistics Dispatcher. Use only for critical delays or safety incidents.
            </p>
          </div>

          {/* Chat Interface */}
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden flex-1 flex flex-col shadow-sm mt-2">
            <div className="bg-zinc-50 border-b border-zinc-200 p-3 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-black">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Quick Chat
              </div>
              <span className="text-[10px] text-zinc-500">Driver is active</span>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              <div className="bg-zinc-100 rounded-xl rounded-tl-sm p-3 max-w-[85%] self-start border border-zinc-200">
                <p className="text-xs text-black leading-relaxed">Hello, I'm currently at the toll gate. Expected arrival in 45 minutes.</p>
                <p className="text-[9px] text-zinc-500 mt-2 font-medium">11:46 AM</p>
              </div>
            </div>

            <div className="p-3 border-t border-zinc-200">
              <div className="relative">
                <input type="text" placeholder="Type a message..." className="w-full pl-3 pr-10 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs outline-none focus:border-zinc-400" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
                <span className="shrink-0 text-[10px] bg-zinc-100 hover:bg-zinc-200 cursor-pointer px-2.5 py-1 rounded-full text-zinc-600 font-medium">Status update?</span>
                <span className="shrink-0 text-[10px] bg-zinc-100 hover:bg-zinc-200 cursor-pointer px-2.5 py-1 rounded-full text-zinc-600 font-medium">Dock is ready.</span>
                <span className="shrink-0 text-[10px] bg-zinc-100 hover:bg-zinc-200 cursor-pointer px-2.5 py-1 rounded-full text-zinc-600 font-medium">Contact manager.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-white border-t border-zinc-200 p-4 shrink-0">
          <div className="flex gap-3 mb-4 items-start bg-zinc-50 p-2.5 rounded-lg border border-zinc-200">
            <ShieldCheck className="w-4 h-4 text-black shrink-0" />
            <p className="text-[10px] text-black leading-relaxed font-medium">
              This communication is logged for quality assurance and compliance.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-white border border-zinc-200 text-black font-bold text-xs rounded-xl hover:bg-zinc-50 transition-colors shadow-sm"
          >
            Dismiss Panel
          </button>
        </div>

      </div>
    </div>
  );
}
