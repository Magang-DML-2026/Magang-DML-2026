import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Copy, ChevronRight, FileText, Search, CheckCircle } from "lucide-react";

export default async function ComplaintSuccessPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="p-8 max-w-[1100px] mx-auto font-sans bg-[#F9FAFB] min-h-screen flex flex-col justify-center items-center py-20">
      
      <div className="bg-white rounded-2xl border border-zinc-200 p-12 shadow-sm max-w-[600px] w-full text-center relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#cc4224]"></div>
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#fdf5f3] rounded-full blur-2xl"></div>
        <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-zinc-50 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          {/* Icon */}
          <div className="mx-auto w-24 h-24 bg-[#fdf5f3] rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-[#cc4224]" />
          </div>
          
          <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight mb-3">
            Laporan Berhasil Dikirim!
          </h1>
          
          <p className="text-[14px] text-zinc-500 mb-8 leading-relaxed px-4">
            Terima kasih telah menghubungi kami. Laporan pengaduan Anda telah kami terima dan akan segera diproses oleh tim investigasi kami.
          </p>

          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 mb-10 inline-block w-full max-w-[400px]">
            <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">Nomor Tiket Anda</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-[28px] font-bold text-zinc-900 tracking-wider">#CMP-99201</span>
              <button className="p-2 bg-white border border-zinc-200 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 transition-colors tooltip-trigger" title="Salin Nomor Tiket">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[12px] text-zinc-500 mt-3">Gunakan nomor ini untuk melacak status komplain Anda.</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/dashboard/complaints/CMP-99201" 
              className="px-8 py-3.5 bg-[#cc4224] text-white font-bold text-[14px] rounded-lg hover:bg-[#b0351b] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Lihat Detail Laporan
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/dashboard" 
              className="px-8 py-3.5 bg-white border-2 border-zinc-200 text-zinc-700 font-bold text-[14px] rounded-lg hover:bg-zinc-50 hover:text-zinc-900 transition-colors flex items-center justify-center"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>

      {/* Tracking Flow */}
      <div className="mt-12 w-full max-w-[400px]">
        <div className="flex justify-between items-center relative px-2">
           <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-zinc-200 -translate-y-1/2 z-0"></div>
           
           <div className="relative z-10 flex flex-col items-center gap-2">
             <div className="w-10 h-10 bg-[#cc4224] rounded-full flex items-center justify-center text-white ring-4 ring-[#F9FAFB]">
               <FileText className="w-4 h-4" />
             </div>
             <span className="text-[11px] font-bold text-[#cc4224]">Terkirim</span>
           </div>
           
           <div className="relative z-10 flex flex-col items-center gap-2">
             <div className="w-10 h-10 bg-white border-2 border-zinc-200 rounded-full flex items-center justify-center text-zinc-400 ring-4 ring-[#F9FAFB]">
               <Search className="w-4 h-4" />
             </div>
             <span className="text-[11px] font-bold text-zinc-400">Review</span>
           </div>
           
           <div className="relative z-10 flex flex-col items-center gap-2">
             <div className="w-10 h-10 bg-white border-2 border-zinc-200 rounded-full flex items-center justify-center text-zinc-400 ring-4 ring-[#F9FAFB]">
               <CheckCircle className="w-4 h-4" />
             </div>
             <span className="text-[11px] font-bold text-zinc-400">Selesai</span>
           </div>
        </div>
      </div>

    </div>
  );
}
