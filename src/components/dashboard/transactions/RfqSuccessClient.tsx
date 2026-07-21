"use client";

import { Check, Download, ArrowRight, FileText, Settings, FileBox } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RfqSuccessClient() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });
    setDate(formatted);
  }, []);

  return (
    <div className="p-8 font-sans bg-[#F9FAFB] min-h-screen flex flex-col items-center justify-center py-16">
      
      <div className="w-16 h-16 bg-[#cc4224] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#cc4224]/30">
        <Check className="w-8 h-8 text-white" strokeWidth={3} />
      </div>
      
      <h1 className="text-[28px] font-bold text-zinc-900 mb-3 tracking-tight text-center">RFQ Berhasil Dikirim</h1>
      <p className="text-[14px] text-zinc-500 max-w-lg text-center leading-relaxed mb-12">
        Terima kasih telah mengajukan penawaran. Tim engineering kami akan melakukan review teknis terhadap spesifikasi dan dokumen Anda.
      </p>

      <div className="flex flex-col lg:flex-row items-stretch gap-6 max-w-4xl w-full">
        
        {/* Ringkasan Pengajuan (Left) */}
        <div className="bg-white border border-zinc-200 rounded-2xl flex-1 overflow-hidden shadow-sm flex flex-col">
          <div className="bg-[#0a1526] text-white px-6 py-4">
            <h2 className="text-[11px] font-bold tracking-widest uppercase">Ringkasan Pengajuan</h2>
          </div>
          
          <div className="p-8 flex-1 flex flex-col">
            <div className="mb-6">
              <p className="text-[11px] font-bold text-zinc-400 tracking-widest uppercase mb-1">ID Referensi RFQ</p>
              <p className="text-[24px] font-bold text-zinc-900">RFQ-2024-008</p>
            </div>
            
            <div className="mb-6">
              <p className="text-[11px] font-bold text-zinc-400 tracking-widest uppercase mb-1">Project Name</p>
              <p className="text-[16px] font-bold text-zinc-900">Rubber Seal Komponen Otomotif X-24</p>
            </div>
            
            <div className="mb-8">
              <p className="text-[11px] font-bold text-zinc-400 tracking-widest uppercase mb-1">Submission Date</p>
              <p className="text-[14px] font-medium text-zinc-700">{date || "24 October 2024"}</p>
            </div>
            
            <div className="mt-auto space-y-3">
              <button className="w-full bg-white border border-zinc-300 text-zinc-700 font-bold text-[14px] py-4 rounded-xl hover:bg-zinc-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Download Ringkasan RFQ (PDF)
              </button>
              
              <Link href="/dashboard/transactions" className="w-full bg-[#cc4224] text-white font-bold text-[14px] py-4 rounded-xl hover:bg-[#b0351b] transition-colors shadow-sm flex items-center justify-center gap-2">
                Lihat Dashboard RFQ <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Next Steps (Right) */}
        <div className="bg-white border border-zinc-200 rounded-2xl flex-1 p-8 shadow-sm">
          <h2 className="text-[16px] font-bold text-zinc-900 mb-8">Next Steps</h2>
          
          <div className="space-y-8 relative">
            <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-zinc-100 z-0"></div>
            
            {/* Step 1 */}
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 shrink-0 bg-[#cc4224] text-white rounded-full flex items-center justify-center shadow-md shadow-[#cc4224]/20 ring-4 ring-white mt-1">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-zinc-900 mb-1">1. Technical Review (24-48 hours)</h3>
                <p className="text-[12px] text-zinc-500 leading-relaxed">
                  Engineers verify blueprint and material compatibility against industrial standards.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 shrink-0 bg-white border-2 border-zinc-200 text-zinc-400 rounded-full flex items-center justify-center ring-4 ring-white mt-1">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-zinc-400 mb-1">2. Quotation Issuance</h3>
                <p className="text-[12px] text-zinc-400 leading-relaxed">
                  A formal commercial quote will be sent to your registered email and available in the portal.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 shrink-0 bg-white border-2 border-zinc-200 text-zinc-400 rounded-full flex items-center justify-center ring-4 ring-white mt-1">
                <FileBox className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-zinc-400 mb-1">3. Sample Production</h3>
                <p className="text-[12px] text-zinc-400 leading-relaxed">
                  Upon approval of the quotation, we'll proceed to rapid prototyping and mass-production testing.
                </p>
              </div>
            </div>
            
          </div>
        </div>

      </div>

      <div className="mt-16 text-center text-zinc-400">
        <p className="text-[13px] font-medium tracking-widest uppercase flex items-center justify-center gap-2">
          <Settings className="w-4 h-4" /> PRECISION RUBBER ENGINEERING
        </p>
      </div>

    </div>
  );
}
