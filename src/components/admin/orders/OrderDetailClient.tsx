"use client";

import { useRouter } from "next/navigation";
import { Search, Bell, ArrowLeft, Printer, Truck, CheckCircle2, ShieldCheck, User, Calendar, ExternalLink } from "lucide-react";
import { useState } from "react";
import { mockReceipts } from "@/components/admin/orders/receiptData";
import { PrintManifestModal } from "@/components/admin/orders/PrintManifestModal";

export function OrderDetailClient({ orderId, adminName }: { orderId: string, adminName: string }) {
  const router = useRouter();
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  
  // Find matching receipt if it exists for some basic data, otherwise mock it
  const receipt = mockReceipts.find(r => r.orderId === orderId) || {
    customerName: "John Doe",
    amount: "18,309,900"
  };

  const orderItems = [
    { 
      name: "Custom Rubber Gasket", 
      desc: "Grade-A Neoprene, Heat Resistant",
      sku: "RB-GSK-0012-C", 
      qty: 500, 
      unit: "PCS", 
      price: 12500, 
      total: 6250000,
      image: "https://images.unsplash.com/photo-1631557993077-4e5c54c30c30?q=80&w=150&auto=format&fit=crop"
    },
    { 
      name: "Precision Molding Seal", 
      desc: "Viton Elastomer, High Pressure",
      sku: "ML-SEL-9941-P", 
      qty: 1200, 
      unit: "PCS", 
      price: 8200, 
      total: 9840000,
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=150&auto=format&fit=crop"
    },
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + item.total, 0);
  const shipping = 450000;
  const tax = subtotal * 0.11;
  const total = subtotal + shipping + tax;

  const fmt = (num: number) => `Rp ${num.toLocaleString("id-ID")},00`;

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-[#fafafa]">
      
      {/* ── Page Header ─────────────── */}
      <header className="h-[72px] bg-white border-b border-zinc-200 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-zinc-800 font-bold">Admin Portal</span>
          <span className="text-zinc-300">/</span>
          <span className="text-black font-semibold">Order Detail</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-9 pr-4 py-2 w-[240px] bg-zinc-100 border-none rounded-full text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 transition-shadow"
            />
          </div>
          <button className="relative text-zinc-500 hover:text-black transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center">
              <span className="text-xs font-bold text-zinc-500">{adminName.charAt(0)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        
        {/* Title Bar */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-black tracking-tight">Order #{orderId}</h1>
              <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                Status: Dispatched
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <div className="flex items-center gap-1.5"><User className="w-4 h-4" /> {receipt.customerName}</div>
              <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Oct 24, 2023</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setIsPrintModalOpen(true)}
              className="px-5 py-2.5 rounded-lg border border-zinc-200 bg-white text-black font-semibold text-sm hover:bg-zinc-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Print Manifest
            </button>
            <button 
              onClick={() => router.push("/admin/orders")}
              className="px-5 py-2.5 rounded-lg bg-black text-white font-semibold text-sm hover:bg-zinc-800 transition-colors flex items-center gap-2 shadow-sm"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          
          {/* ── Left Column ── */}
          <div className="flex flex-col gap-6">
            
            {/* Order Timeline */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 lg:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-black flex items-center gap-2 mb-8">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Order Timeline
              </h3>
              
              <div className="relative">
                {/* Horizontal line */}
                <div className="absolute top-5 left-8 right-8 h-[2px] bg-zinc-200"></div>
                {/* Progress line */}
                <div className="absolute top-5 left-8 w-[60%] h-[2px] bg-[#d94a26]"></div>

                <div className="grid grid-cols-4 relative z-10 text-center">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center border-[3px] border-white ring-1 ring-zinc-200">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-black mb-0.5">Order Placed</p>
                      <p className="text-[10px] text-zinc-500">Oct 24, 09:12 AM</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center border-[3px] border-white ring-1 ring-zinc-200">
                      <CheckCircle2 className="w-[18px] h-[18px]" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-black mb-0.5">Payment Verified</p>
                      <p className="text-[10px] text-zinc-500">Oct 24, 10:45 AM</p>
                    </div>
                  </div>

                  {/* Step 3 (Active) */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#d94a26] text-white flex items-center justify-center border-[3px] border-white ring-1 ring-orange-200 shadow-md shadow-orange-500/20">
                      <Truck className="w-[18px] h-[18px]" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#d94a26] mb-0.5">Dispatched</p>
                      <p className="text-[10px] text-[#d94a26]/70 font-medium">Oct 24, 03:30 PM</p>
                    </div>
                  </div>

                  {/* Step 4 (Pending) */}
                  <div className="flex flex-col items-center gap-3 opacity-40 grayscale">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center border-[3px] border-white ring-1 ring-zinc-200">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-zinc-600 mb-0.5">Delivered</p>
                      <p className="text-[10px] text-zinc-400">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Manifest Items Table */}
            <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
                <h3 className="text-lg font-bold text-black">Manifest Items</h3>
                <span className="text-sm font-medium text-zinc-500 bg-white px-3 py-1 rounded-full border border-zinc-200">{orderItems.length} Distinct Items</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#0f172a] text-white">
                      <th className="py-4 px-6 text-left font-bold text-xs tracking-wider">PRODUCT SPECIFICATION</th>
                      <th className="py-4 px-6 text-left font-bold text-xs tracking-wider">SKU ID</th>
                      <th className="py-4 px-6 text-center font-bold text-xs tracking-wider">QUANTITY</th>
                      <th className="py-4 px-6 text-right font-bold text-xs tracking-wider">UNIT PRICE</th>
                      <th className="py-4 px-6 text-right font-bold text-xs tracking-wider">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {orderItems.map((item, i) => (
                      <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-lg bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-black text-[15px] mb-0.5">{item.name}</p>
                              <p className="text-[11px] text-zinc-500">{item.desc}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-mono text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded border border-zinc-200">
                            {item.sku}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center font-bold text-black">
                          {item.qty.toLocaleString()} {item.unit}
                        </td>
                        <td className="py-4 px-6 text-right text-zinc-600">
                          {fmt(item.price)}
                        </td>
                        <td className="py-4 px-6 text-right font-black text-black">
                          {fmt(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* ── Right Column ── */}
          <div className="flex flex-col gap-6">
            
            {/* Logistics Card (Dark) */}
            <div className="bg-[#0f172a] rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
              {/* Decorative faint icon */}
              <Truck className="w-32 h-32 absolute -right-6 -bottom-6 opacity-[0.03] rotate-[-15deg]" />

              <h3 className="text-lg font-bold flex items-center gap-2 mb-6 text-white/90">
                <Truck className="w-5 h-5" /> Logistics Detail
              </h3>

              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-white/50 uppercase tracking-wider text-[11px] font-bold">Carrier</span>
                  <span className="font-bold text-white">J&T Express</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-white/50 uppercase tracking-wider text-[11px] font-bold">Tracking</span>
                  <span className="font-mono font-bold text-white text-[15px]">JNT-9812234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50 uppercase tracking-wider text-[11px] font-bold">Estimated<br/>Arrival</span>
                  <div className="text-right">
                    <span className="font-bold text-[#f05c35] text-[15px] block mb-0.5">Oct 25, 2023</span>
                    <span className="text-white/50 text-xs">Before 18:00 WIB</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => router.push(`/admin/orders/${orderId}/track`)}
                className="w-full py-3.5 bg-[#d94a26] hover:bg-[#c24222] text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Track Real-time <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Payment Summary */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-black mb-5">Payment Summary</h3>
              
              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-medium text-black">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Shipping (Standard)</span>
                  <span className="font-medium text-black">{fmt(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Tax (PPN 11%)</span>
                  <span className="font-medium text-black">{fmt(tax)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-4 border-t border-zinc-200 mb-5">
                <span className="font-bold text-black">Total Paid</span>
                <span className="font-black text-[#d94a26] text-lg">{fmt(total)}</span>
              </div>

              <div className="bg-green-50/50 border border-green-200 rounded-lg p-3 flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-green-800">Transaction Secured</p>
                  <p className="text-xs text-green-700/70">Paid via Bank Transfer (BCA Online)</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <PrintManifestModal 
        isOpen={isPrintModalOpen} 
        onClose={() => setIsPrintModalOpen(false)} 
        orderId={orderId} 
      />
    </div>
  );
}
