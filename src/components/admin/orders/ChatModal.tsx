"use client";

import { X, MessageSquare, Paperclip, Send, PenTool, PhoneCall } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  order: any; // Using any for simplicity in this mock
};

export function ChatModal({ isOpen, onClose, order }: Props) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-zinc-100 rounded-xl w-full max-w-[600px] shadow-2xl flex flex-col" style={{ maxHeight: 'min(90vh, 800px)' }}>
        
        {/* Header */}
        <div className="bg-black text-white p-4 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d94a26] rounded-md flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">{order.clientName}</h2>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-xs text-zinc-400">{order.id} • {order.material}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-zinc-50 relative">
          
          <div className="text-center">
            <span className="bg-zinc-200 text-zinc-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              October 14, 2024
            </span>
          </div>

          {/* DML Admin Message */}
          <div className="flex gap-3 max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-zinc-700 text-white shrink-0 flex items-center justify-center font-bold text-xs">
              DM
            </div>
            <div className="flex flex-col gap-1">
              <div className="bg-zinc-200/70 p-4 rounded-2xl rounded-tl-none border border-zinc-300/50">
                <p className="text-sm text-black leading-relaxed">
                  Regarding the technical drawings for the gasket seals—the Shore A 70 hardness specification seems a bit high for the compression requirements. Can we review the tolerance values?
                </p>
              </div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase">DML ADMIN • 09:12 AM</span>
            </div>
          </div>

          {/* Client Message */}
          <div className="flex gap-3 max-w-[85%] self-end flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-[#d94a26] shrink-0 flex items-center justify-center text-white font-bold text-xs">
              IM
            </div>
            <div className="flex flex-col gap-1 items-end">
              <div className="bg-black p-4 rounded-2xl rounded-tr-none shadow-md">
                <p className="text-sm text-white leading-relaxed">
                  Good point. We need the seal to remain flexible at -20°C. If we drop to Shore A 60, will it maintain integrity under 15 PSI?
                </p>
              </div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase">INDO-MACHINE LTD • 10:45 AM</span>
            </div>
          </div>
          
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 border-t border-zinc-200 shrink-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] relative z-10">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Type your message or drop files here..."
              className="w-full bg-white border-2 border-[#d94a26]/30 rounded-xl py-3 pl-4 pr-12 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:border-[#d94a26] transition-colors"
            />
            <button className="absolute right-12 p-2 text-zinc-400 hover:text-black transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <button className="absolute right-2 p-2 bg-[#d94a26] text-white rounded-lg hover:bg-[#c24222] transition-colors shadow-sm">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-4 mt-3 px-1">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-black transition-colors">
              <PenTool className="w-3.5 h-3.5" />
              Sign Technical Change
            </button>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-black transition-colors">
              <PhoneCall className="w-3.5 h-3.5" />
              Request Call
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
