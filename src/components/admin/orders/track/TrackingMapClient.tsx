"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, MapPin, Navigation, Info, Package, Mail, Share2, MessageSquare, Truck, ArrowLeft } from "lucide-react";
import { ContactCarrierModal } from "@/components/admin/orders/track/ContactCarrierModal";
import { ShareTrackingModal } from "@/components/admin/orders/track/ShareTrackingModal";

export function TrackingMapClient({ orderId, adminName }: { orderId: string, adminName: string }) {
  const router = useRouter();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white">
      
      {/* ── Page Header ─────────────── */}
      <header className="h-[72px] bg-white border-b border-zinc-200 flex items-center justify-between px-8 shrink-0 z-10 relative">
        <div className="flex items-center gap-6">
          <span className="text-black font-black text-xl tracking-tight">DML Portal</span>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-9 pr-4 py-2 w-[280px] bg-zinc-100 border-none rounded-full text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative text-zinc-500 hover:text-[#d94a26] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#d94a26] rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#001b3a] text-white flex items-center justify-center">
              <span className="text-sm font-bold">{adminName.charAt(0)}</span>
            </div>
            <span className="font-bold text-sm text-black">Admin Hub</span>
          </div>
        </div>
      </header>

      {/* ── Main Layout ────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Map Area */}
        <div className="flex-1 relative bg-[#e5f5e5] flex flex-col justify-between overflow-hidden">
          {/* Simulated Map Background - Using SVG patterns to look like a map */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 10 Q 30 40 50 20 T 90 50\' stroke=\'%23000\' stroke-width=\'1\' fill=\'none\'/%3E%3C/svg%3E")', backgroundSize: '150px' }}></div>
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 20%, #e5f5e5 100%)'
          }}></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
            <h2 className="text-4xl font-black tracking-widest text-zinc-800">Mantaak</h2>
          </div>

          <div className="absolute bottom-20 left-1/4 pointer-events-none opacity-40">
            <h2 className="text-2xl font-bold tracking-widest text-zinc-800">Lawangoewang</h2>
          </div>

          {/* Markers */}
          <div className="absolute top-[40%] left-[30%] flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20 border-2 border-white">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <span className="font-bold text-purple-700 bg-white/80 px-2 py-1 rounded text-sm shadow-sm">rifai jati keramat</span>
          </div>

          <div className="absolute bottom-[10%] left-[40%] flex items-center gap-2">
            <span className="font-bold text-zinc-600 bg-white/80 px-2 py-1 rounded text-sm shadow-sm">Masjid PT sp2</span>
            <div className="w-10 h-10 bg-zinc-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <MapPin className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Floating ETA Pill */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg border border-zinc-100 px-6 py-4 flex items-center gap-5 z-10">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#d94a26] animate-pulse"></div>
              <span className="font-bold text-black text-sm">On the<br/>Way</span>
            </div>
            <div className="w-px h-8 bg-zinc-200"></div>
            <div className="text-sm">
              <span className="text-zinc-500">ETA: </span>
              <span className="font-bold text-black">Dec 12,<br/>16:45</span>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-10 right-10 flex flex-col gap-2">
            <button className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center hover:bg-zinc-50 font-bold text-xl">+</button>
            <button className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center hover:bg-zinc-50 font-bold text-xl">-</button>
            <button className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center hover:bg-zinc-50 mt-2">
              <Navigation className="w-5 h-5 text-zinc-600" />
            </button>
          </div>

          {/* Map Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-zinc-200 p-3 flex justify-between items-center text-[11px] font-medium text-zinc-500 z-10">
            <div className="flex items-center gap-4 px-4">
              <span className="font-black text-black tracking-widest">PT DML</span>
              <span>© 2024 PT Duta Mitra Luhur. All rights reserved.</span>
            </div>
            <div className="flex gap-6 pr-4">
              <a href="#" className="hover:text-black">Privacy Policy</a>
              <a href="#" className="hover:text-black">Terms of Service</a>
              <a href="#" className="hover:text-black">Compliance</a>
            </div>
          </div>
        </div>

        {/* Right Side: Tracking Sidebar */}
        <div className="w-[420px] bg-white border-l border-zinc-200 flex flex-col shrink-0 z-20 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)]">
          
          <div className="flex-1 overflow-y-auto">
            {/* Header */}
            <div className="p-8 pb-6">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl font-black text-black">Order #{orderId}</h1>
                <span className="bg-orange-100 text-[#d94a26] px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase">ACTIVE</span>
              </div>
              <p className="text-sm text-zinc-500 font-medium">Industrial Rubber Sealant Batch A</p>
            </div>

            {/* Carrier Box */}
            <div className="mx-8 bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col gap-3 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 text-xs">Tracking ID</span>
                <span className="font-mono font-bold text-black">{orderId === "DML-9921" ? "JNT-9812234" : `TRK-${orderId}`}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 text-xs">Carrier</span>
                <span className="font-bold text-black flex items-center gap-2">
                  <div className="bg-[#e83e23] text-white text-[8px] font-black italic px-1 rounded-sm">J&T</div>
                  J&T Express
                </span>
              </div>
            </div>

            {/* Tracking Logs */}
            <div className="px-8 mb-8">
              <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Tracking Logs</h3>
              
              <div className="relative border-l-2 border-zinc-200 ml-3 space-y-8">
                
                {/* Step 1 */}
                <div className="relative pl-6">
                  <div className="absolute -left-[13px] top-0.5 w-6 h-6 rounded-full bg-white border-2 border-[#d94a26] flex items-center justify-center">
                    <Truck className="w-3 h-3 text-[#d94a26]" />
                  </div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-black text-sm">Out for Delivery</h4>
                    <span className="text-[10px] text-zinc-500 font-medium">Dec 11, 09:12</span>
                  </div>
                  <p className="text-xs text-zinc-500">Courier is heading to Surabaya Last Mile Hub.</p>
                </div>

                {/* Step 2 */}
                <div className="relative pl-6 opacity-60">
                  <div className="absolute -left-[13px] top-0.5 w-6 h-6 rounded-full bg-white border-2 border-zinc-300 flex items-center justify-center">
                    <Package className="w-3 h-3 text-zinc-500" />
                  </div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-black text-sm">Arrived at Sorting Hub</h4>
                    <span className="text-[10px] text-zinc-500 font-medium">Dec 10, 22:45</span>
                  </div>
                  <p className="text-xs text-zinc-500">Pekalongan Gateway, Central Java.</p>
                </div>

                {/* Step 3 */}
                <div className="relative pl-6 opacity-60">
                  <div className="absolute -left-[13px] top-0.5 w-6 h-6 rounded-full bg-white border-2 border-zinc-300 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-zinc-400"></div>
                  </div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-black text-sm">Departed from Origin</h4>
                    <span className="text-[10px] text-zinc-500 font-medium">Dec 10, 14:00</span>
                  </div>
                  <p className="text-xs text-zinc-500">Cikarang Warehouse Main Gate.</p>
                </div>

                {/* Step 4 */}
                <div className="relative pl-6 opacity-60">
                  <div className="absolute -left-[13px] top-0.5 w-6 h-6 rounded-full bg-white border-2 border-zinc-300 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-500"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-black text-sm">Quality Pass & Packaged</h4>
                    <span className="text-[10px] text-zinc-500 font-medium">Dec 10, 08:30</span>
                  </div>
                  <p className="text-xs text-zinc-500">Verified by QA Lead ID #4092.</p>
                </div>

              </div>
            </div>

            {/* Shipment Insights */}
            <div className="mx-8 mb-8 bg-[#0a192f] rounded-xl p-5 text-white/90 shadow-md">
              <div className="flex gap-3 mb-2">
                <Info className="w-5 h-5 text-blue-400 shrink-0" />
                <h4 className="font-bold text-white text-sm">Shipment Insights</h4>
              </div>
              <p className="text-[11px] text-blue-100/70 leading-relaxed ml-8">
                This shipment contains heavy-duty industrial polymers. Climate-controlled transport is maintained at 24°C to ensure material integrity during transit to Surabaya.
              </p>
            </div>

          </div>

          {/* Action Buttons Footer */}
          <div className="p-6 bg-zinc-50 border-t border-zinc-200 flex flex-col gap-3 shrink-0">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="w-full py-3.5 bg-black hover:bg-zinc-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Contact Carrier
            </button>
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="w-full py-3.5 bg-white border border-zinc-300 hover:bg-zinc-50 text-black font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Tracking
            </button>
          </div>
        </div>
      </div>

      <ContactCarrierModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} orderId={orderId} />
      <ShareTrackingModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} orderId={orderId} />
    </div>
  );
}
