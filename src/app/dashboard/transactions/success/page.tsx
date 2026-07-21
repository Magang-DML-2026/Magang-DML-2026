"use client";

import { useSearchParams } from "next/navigation";
import { Check, Image as ImageIcon, FileText, PenTool, Download, Radio, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PurchaseOrderSuccessPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "PO-4922";
  const totalParam = searchParams.get("total") || "6671100";
  const total = parseInt(totalParam, 10);

  const [date, setDate] = useState("");

  useEffect(() => {
    // Generate date like "October 24, 2024 + 14:32 GMT"
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });
    const time = now.toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit' });
    setDate(`${formatted} + ${time} GMT+7`);
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="p-8 font-sans bg-[#F9FAFB] min-h-screen flex flex-col items-center justify-center py-16">
      
      <div className="bg-white border border-zinc-200 rounded-3xl p-10 max-w-[800px] w-full shadow-sm">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-[#cc4224] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#cc4224]/30">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-[28px] font-bold text-zinc-900 mb-3 tracking-tight">Purchase Order Successful</h1>
          <p className="text-[15px] text-zinc-500 max-w-md leading-relaxed">
            Your order has been received and is currently being processed by our manufacturing logistics team.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-widest">Order ID</p>
            <p className="text-[24px] font-bold text-zinc-900 mb-1">{id}</p>
            <p className="text-[11px] text-zinc-400">Submitted on {date}</p>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-widest">Order Total</p>
            <p className="text-[24px] font-bold text-[#cc4224] mb-1">{formatCurrency(total)}</p>
            <p className="text-[11px] text-zinc-400">Currency: IDR • Payment Term: Net 30</p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border border-zinc-200 rounded-xl p-5">
            <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="w-4 h-4 text-zinc-600" />
            </div>
            <h3 className="text-[13px] font-bold text-zinc-900 mb-2">01. Sales Review</h3>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Our sales team will verify inventory availability and technical specifications within 4 hours.
            </p>
          </div>
          <div className="border border-zinc-200 rounded-xl p-5">
            <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-4 h-4 text-zinc-600" />
            </div>
            <h3 className="text-[13px] font-bold text-zinc-900 mb-2">02. Invoice Issuance</h3>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              A pro-forma invoice will be sent to your registered email for final confirmation and payment.
            </p>
          </div>
          <div className="border border-zinc-200 rounded-xl p-5">
            <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
              <PenTool className="w-4 h-4 text-zinc-600" />
            </div>
            <h3 className="text-[13px] font-bold text-zinc-900 mb-2">03. Production Start</h3>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Once payment is cleared, the job enters our manufacturing queue and tracking goes live.
            </p>
          </div>
        </div>

        {/* Account Manager Box */}
        <div className="bg-[#0a1526] rounded-xl p-4 flex items-center justify-between mb-8 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
              <img src="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random" alt="Sarah Jenkins" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-white">Sarah Jenkins — Senior Account Manager</p>
              <p className="text-[12px] text-zinc-400">Dedicated representative for this PO</p>
            </div>
          </div>
          <button className="bg-white text-zinc-900 px-5 py-2.5 rounded-lg text-[13px] font-bold hover:bg-zinc-100 transition-colors shadow-sm">
            Contact Support
          </button>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/dashboard/transactions" className="bg-[#cc4224] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-[#b0351b] transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Radio className="w-5 h-5" /> Track Production
          </Link>
          <button className="bg-white text-zinc-900 border border-zinc-300 py-4 rounded-xl font-bold text-[15px] hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Download className="w-5 h-5" /> Download PO Copy
          </button>
        </div>

        <div className="text-center">
          <Link href="/dashboard" className="text-[13px] font-bold text-zinc-500 hover:text-zinc-800 underline decoration-zinc-300 underline-offset-4">
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
