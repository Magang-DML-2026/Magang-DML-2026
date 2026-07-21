"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Mail, MessageSquare, Copy, Check, ArrowRight } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
};

type ModalState = "form" | "success";

export function ShareTrackingModal({ isOpen, onClose, orderId }: Props) {
  const router = useRouter();
  const [modalState, setModalState] = useState<ModalState>("form");
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "whatsapp" | "copy">("whatsapp");
  const [recipientName, setRecipientName] = useState("");
  const [recipientContact, setRecipientContact] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={modalState === "form" ? onClose : undefined} />
      
      {modalState === "form" ? (
        // ── Form State ──
        <div className="bg-white shadow-2xl w-full max-w-lg rounded-2xl overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-300">
          
          <div className="px-6 py-5 border-b border-zinc-200 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[#d94a26]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              </div>
              <h2 className="text-lg font-bold text-black">Share Tracking Link</h2>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-black" />
            </button>
          </div>

          <div className="p-6">
            <p className="text-sm text-zinc-500 mb-6">
              Provide the recipient's details to share the real-time manufacturing and logistics status of <span className="font-bold text-black">Order #{orderId}</span>.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-black mb-2">Recipient Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Robert Jensen"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-shadow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-2">Recipient Email or WhatsApp Number</label>
                <input 
                  type="text" 
                  placeholder="robert@globaltech.com"
                  value={recipientContact}
                  onChange={(e) => setRecipientContact(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-shadow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-2">Delivery Method</label>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setDeliveryMethod("email")}
                    className={`py-3 rounded-lg border flex flex-col items-center gap-2 transition-colors ${deliveryMethod === "email" ? "border-[#d94a26] bg-orange-50 text-[#d94a26]" : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50"}`}
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-[11px] font-bold">Email</span>
                  </button>
                  <button 
                    onClick={() => setDeliveryMethod("whatsapp")}
                    className={`py-3 rounded-lg border flex flex-col items-center gap-2 transition-colors ${deliveryMethod === "whatsapp" ? "border-[#d94a26] bg-orange-50 text-[#d94a26]" : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50"}`}
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-[11px] font-bold">WhatsApp</span>
                  </button>
                  <button 
                    onClick={() => setDeliveryMethod("copy")}
                    className={`py-3 rounded-lg border flex flex-col items-center gap-2 transition-colors ${deliveryMethod === "copy" ? "border-[#d94a26] bg-orange-50 text-[#d94a26]" : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50"}`}
                  >
                    <Copy className="w-5 h-5" />
                    <span className="text-[11px] font-bold">Copy Link</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-black font-bold text-sm rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setModalState("success")}
                className="px-6 py-2.5 bg-[#b2391b] hover:bg-[#912d14] text-white font-bold text-sm rounded-lg transition-colors shadow-sm flex items-center gap-2"
              >
                Send Tracking Link <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        // ── Success State (Based on latest mockup) ──
        <div className="bg-white shadow-2xl w-full max-w-[500px] rounded-xl overflow-hidden relative flex flex-col animate-in zoom-in duration-300">
          <div className="w-full h-1.5 bg-[#b2391b]"></div>
          
          <div className="p-10 w-full flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 relative">
              <div className="w-14 h-14 bg-[#b2391b] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 z-10">
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
            </div>

            <h2 className="text-3xl font-black text-black mb-3">
              Tracking Link Sent<br/>Successfully
            </h2>
            <p className="text-sm text-zinc-500 mb-8 max-w-[340px]">
              The real-time shipment monitoring credentials have been dispatched to the recipient.
            </p>

            <div className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-5 mb-8 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-zinc-200 border-dashed">
                <span className="text-zinc-500">Recipient Name</span>
                <span className="font-bold text-black">{recipientName || "Anand Tech Solutions Ltd."}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-200 border-dashed">
                <span className="text-zinc-500">Sent via {deliveryMethod === 'email' ? 'Email' : deliveryMethod === 'whatsapp' ? 'WhatsApp' : 'Link'}</span>
                <span className="font-bold text-black">{recipientContact || "+62 812-9902-XXX"}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-zinc-500">Reference ID</span>
                <span className="font-mono font-bold text-zinc-600">REQ-8902-ALPHA</span>
              </div>
            </div>

            <button 
              onClick={() => router.push("/admin/orders")}
              className="w-[200px] py-4 bg-black hover:bg-zinc-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Return to<br/>Dashboard <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          
          {/* Footer Bar */}
          <div className="w-full bg-white border-t border-zinc-200 py-4 px-6 text-center text-xs text-zinc-500 font-medium">
            Need help? Contact the <span className="text-[#d94a26] hover:underline cursor-pointer border-b border-[#d94a26]">Logistics Support Desk</span>
          </div>
        </div>
      )}
    </div>
  );
}
