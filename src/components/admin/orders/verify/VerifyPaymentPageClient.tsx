"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, User, Truck, Printer, ShieldCheck, ArrowLeft, Search, Bell } from "lucide-react";
import { ImageLightbox } from "@/components/admin/orders/ImageLightbox";
import { MoveToShippingModal } from "@/components/admin/orders/verify/MoveToShippingModal";
import { ShipmentSuccessModal } from "@/components/admin/orders/verify/ShipmentSuccessModal";
import { useState } from "react";

import { Receipt } from "@/components/admin/orders/receiptData";

type Props = {
  receipt: Receipt;
  adminName: string;
};

const orderItems = [
  { description: "Custom Rubber Gasket (Extrusion Model A)", qty: 250, unit: "Units", unitPrice: 12.0, total: 3000.0 },
  { description: "Precision Molding - Industrial Seal D4", qty: 100, unit: "Units", unitPrice: 45.5, total: 4550.0 },
];
const subtotal = orderItems.reduce((s, i) => s + i.total, 0);
function fmt(n: number) { return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

export function VerifyPaymentPageClient({ receipt, adminName }: Props) {
  const router = useRouter();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [successCarrier, setSuccessCarrier] = useState<string | null>(null);
  const timeStr = new Date().toLocaleTimeString("en-US", { hour12: false });

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-[#fafafa]">

      {/* ── Page Header (breadcrumb + search bar) ─────────────── */}
      <header className="h-[72px] bg-white border-b border-zinc-200 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-2 text-sm font-medium">
          <button
            onClick={() => router.push("/admin/orders")}
            className="text-zinc-400 hover:text-black transition-colors"
            title="Back to Orders"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-zinc-800 font-bold">Admin Portal</span>
          <span className="text-zinc-300">/</span>
          <button
            onClick={() => router.push("/admin/orders")}
            className="text-zinc-500 hover:text-black transition-colors"
          >
            Orders
          </button>
          <span className="text-zinc-300">/</span>
          <span className="text-zinc-600">{receipt.orderId}</span>
          <span className="text-zinc-300">/</span>
          <span className="text-black font-semibold">B2C Validation</span>
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
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#f05c35] rounded-full border border-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center">
              <span className="text-xs font-bold text-zinc-500">{adminName.charAt(0)}</span>
            </div>
            <span className="text-sm font-medium text-zinc-700">{adminName}</span>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden">

        {/* ── Left Column ─────────────────────────────────────── */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto">

          {/* Receipt Image Card */}
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            {/* Card toolbar */}
            <div className="px-5 py-3 border-b border-zinc-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500">
                  <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 10h6M9 14h4"/>
                </svg>
                <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  PAYMENT_RECEIPT_{receipt.customerInitials}_88.JPG
                </span>
              </div>
              <div className="flex gap-1 text-zinc-400">
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="hover:text-black transition-colors p-1.5 rounded hover:bg-zinc-100"
                  title="Zoom"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                  </svg>
                </button>
                <a
                  href={receipt.imageUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black transition-colors p-1.5 rounded hover:bg-zinc-100"
                  title="Download"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Receipt image — click to zoom */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="w-full block relative overflow-hidden bg-zinc-300 group focus:outline-none"
              style={{ height: "320px" }}
              title="Click to zoom"
            >
              <img
                src={receipt.imageUrl}
                alt={`Receipt ${receipt.orderId}`}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              {/* VERIFIED stamp */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="border-[3px] border-green-500 rounded-xl px-10 py-5 text-center bg-white/10 backdrop-blur-[2px]">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-green-500">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" opacity="0.15"/>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/>
                      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-green-500 font-black text-3xl tracking-[0.4em] uppercase drop-shadow">Verified</p>
                  <p className="text-green-400 text-xs font-semibold mt-1.5 tracking-widest">01 OCT 2023 - 14:22</p>
                </div>
              </div>
              {/* Hover hint */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                <span className="text-white text-xs font-medium bg-black/50 rounded-full px-3 py-1">
                  Click to zoom
                </span>
              </div>
            </button>
          </div>

          {/* B2C Order Details Table */}
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-200">
              <h3 className="font-bold text-lg text-black">B2C Order Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[440px]">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="px-6 py-3.5 text-left text-sm font-bold">Item Description</th>
                    <th className="px-6 py-3.5 text-right text-sm font-bold">Quantity</th>
                    <th className="px-6 py-3.5 text-right text-sm font-bold">Unit Price</th>
                    <th className="px-6 py-3.5 text-right text-sm font-bold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {orderItems.map((item, i) => (
                    <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-black">{item.description}</td>
                      <td className="px-6 py-4 text-sm text-right text-black whitespace-nowrap">{item.qty.toLocaleString("en-US")} {item.unit}</td>
                      <td className="px-6 py-4 text-sm text-right text-black">${item.unitPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-right font-semibold text-black">${fmt(item.total)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-right text-sm font-semibold text-zinc-500">Subtotal</td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-black">${fmt(subtotal)}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-[#d94a26] text-white">
                    <td colSpan={3} className="px-6 py-4 font-bold text-sm">Total Paid</td>
                    <td className="px-6 py-4 font-black text-sm text-right">${fmt(subtotal)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ─────────────────────────────────────── */}
        <div className="lg:w-[300px] shrink-0 flex flex-col gap-5 p-6 bg-white border-l border-zinc-200 overflow-y-auto">

          {/* Customer Info */}
          <div className="border border-zinc-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-zinc-500" />
              </div>
              <div>
                <h4 className="font-bold text-base text-black leading-tight">{receipt.customerName}</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Premium B2C Partner</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1.5 rounded-md uppercase tracking-wider mb-4">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Verified Identity
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Email:</span>
                <span className="font-semibold text-black">{receipt.customerName.toLowerCase().replace(" ", ".")}@example.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Location:</span>
                <span className="font-semibold text-black">Surabaya, ID</span>
              </div>
            </div>
          </div>

          {/* Verification Complete */}
          <div className="border border-zinc-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2.5 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <h4 className="font-bold text-base text-green-700">Verification Complete</h4>
            </div>
            <p className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-xl p-3.5 leading-relaxed mb-5">
              Payment Confirmed for {receipt.customerName}. The transaction amount matches the invoice total precisely.
              Receipt metadata has been logged to the ledger.
            </p>
            <div className="flex flex-col gap-2.5">
              <button 
                onClick={() => setIsShippingModalOpen(true)}
                className="w-full py-3 bg-[#d94a26] hover:bg-[#c24222] text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Truck className="w-4 h-4" />
                Move to Shipping
              </button>
              <button 
                onClick={() => router.push(`/admin/orders/verify/${receipt.id}/manifest`)}
                className="w-full py-3 bg-white border border-zinc-200 hover:bg-zinc-50 text-black font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print Order Manifest
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 mt-4 flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Processed by {adminName} at {timeStr}
            </p>
          </div>

          {/* Quality Certified */}
          <div className="bg-[#0f172a] rounded-xl p-5 flex gap-3">
            <ShieldCheck className="w-6 h-6 text-[#d94a26] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#d94a26] text-sm font-bold mb-1">Quality Certified</p>
              <p className="text-zinc-400 text-xs leading-relaxed">
                This order complies with DML Industrial Standard ISO-9001 for rubber extrusion manufacturing.
              </p>
            </div>
          </div>

        </div>
      </div>

      <ImageLightbox
        src={receipt.imageUrl}
        alt={`Receipt ${receipt.orderId}`}
        label={`PAYMENT_RECEIPT_${receipt.customerInitials}_88.JPG  •  ${receipt.customerName}  •  IDR ${receipt.amount}`}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />

      {/* Shipping Modal */}
      <MoveToShippingModal 
        isOpen={isShippingModalOpen}
        onClose={() => setIsShippingModalOpen(false)}
        onSuccess={(carrier) => {
          setIsShippingModalOpen(false);
          setSuccessCarrier(carrier);
        }}
        receipt={receipt}
      />

      {/* Success Modal */}
      <ShipmentSuccessModal
        isOpen={!!successCarrier}
        orderId={receipt.orderId}
        carrier={successCarrier || ""}
      />
    </div>
  );
}
