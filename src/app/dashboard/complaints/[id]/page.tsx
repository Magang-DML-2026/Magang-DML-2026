import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, Search, CheckCircle, MessageSquare, PhoneCall, Paperclip, AlertTriangle } from "lucide-react";

export default async function ComplaintDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  
  const resolvedParams = await params;
  const complaintId = resolvedParams.id;

  return (
    <div className="p-8 max-w-[1100px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-6">
        <Link href="/dashboard" className="hover:text-zinc-800 transition-colors">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <Link href="/dashboard/complaints" className="hover:text-zinc-800 transition-colors">Pengajuan Komplain</Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-[#cc4224]">Detail #{complaintId}</span>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight mb-2 flex items-center gap-3">
            Detail Laporan #{complaintId}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[12px] font-semibold border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Sedang Diproses
            </span>
          </h1>
          <p className="text-[14px] text-zinc-500">
            Kategori: <span className="font-medium text-zinc-700">Barang Cacat/Rusak</span> • Terkait Pesanan: <Link href="/dashboard/transactions/98332" className="text-[#cc4224] hover:underline font-medium">#98332</Link>
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Details */}
        <div className="w-full lg:w-2/3 space-y-6">
          
          {/* Timeline Panel */}
          <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
            <h2 className="text-[16px] font-bold text-zinc-900 mb-8 pb-4 border-b border-zinc-100">
              Timeline Penanganan
            </h2>
            
            <div className="relative pl-4 space-y-8">
              {/* Vertical line connecting timeline */}
              <div className="absolute left-8 top-4 bottom-4 w-[2px] bg-zinc-100"></div>
              
              {/* Step 1: Terkirim */}
              <div className="relative z-10 flex gap-5">
                <div className="w-9 h-9 rounded-full bg-[#cc4224] flex items-center justify-center text-white ring-4 ring-white shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-zinc-900">Laporan Diterima</h3>
                  <p className="text-[13px] text-zinc-500 mt-1">Laporan Anda telah berhasil masuk ke sistem kami.</p>
                  <p className="text-[11px] text-zinc-400 mt-2 font-medium">19 Okt 2026, 14:30 WIB</p>
                </div>
              </div>

              {/* Step 2: Review (Active) */}
              <div className="relative z-10 flex gap-5">
                <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white ring-4 ring-white shrink-0 mt-0.5">
                  <Search className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-blue-600">Dalam Peninjauan (Review)</h3>
                  <p className="text-[13px] text-zinc-500 mt-1">Tim investigasi sedang memeriksa bukti-bukti yang Anda lampirkan.</p>
                  <p className="text-[11px] text-zinc-400 mt-2 font-medium">19 Okt 2026, 15:45 WIB</p>
                </div>
              </div>

              {/* Step 3: Solusi (Pending) */}
              <div className="relative z-10 flex gap-5 opacity-40">
                <div className="w-9 h-9 rounded-full bg-zinc-100 border-2 border-zinc-300 flex items-center justify-center text-zinc-400 ring-4 ring-white shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-zinc-900">Solusi Diberikan</h3>
                  <p className="text-[13px] text-zinc-500 mt-1">Menunggu hasil peninjauan selesai.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rincian Keluhan Panel */}
          <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
            <h2 className="text-[16px] font-bold text-zinc-900 mb-6 pb-4 border-b border-zinc-100">
              Rincian Keluhan
            </h2>
            
            <p className="text-[14px] text-zinc-700 leading-relaxed bg-zinc-50 p-5 rounded-lg border border-zinc-100 italic">
              "Karet seal yang diterima pada batch #DM-9022 ada beberapa yang sobek pada bagian sisinya. Kami membutuhkan penggantian secepatnya karena ini menunda lini produksi kami. Tolong segera ditangani."
            </p>
            
            <h3 className="text-[14px] font-bold text-zinc-900 mt-8 mb-4 flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-zinc-400" />
              Bukti Foto/Video Terlampir
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="aspect-square bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 relative group cursor-pointer">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590483736622-398541ce1711?q=80&w=300&auto=format&fit=crop')] bg-cover bg-center"></div>
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
              </div>
              <div className="aspect-square bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 relative group cursor-pointer">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587302484050-7173b2203673?q=80&w=300&auto=format&fit=crop')] bg-cover bg-center"></div>
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Actions */}
        <div className="w-full lg:w-1/3 space-y-6">
          
          <div className="bg-[#0f172a] rounded-xl p-8 text-white shadow-xl relative overflow-hidden">
             {/* Decor */}
             <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
             
             <h3 className="text-[18px] font-bold text-white mb-2 relative z-10">
               Butuh bantuan lebih lanjut?
             </h3>
             <p className="text-[13px] text-zinc-400 leading-relaxed mb-8 relative z-10">
               Anda dapat menghubungi layanan pelanggan kami secara langsung untuk menanyakan status spesifik dari tiket ini.
             </p>
             
             <div className="space-y-3 relative z-10">
               <Link href={`/dashboard/complaints/${complaintId}/chat`} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-zinc-900 font-bold text-[14px] rounded-lg hover:bg-zinc-100 transition-colors shadow-sm">
                 <MessageSquare className="w-4 h-4" />
                 Live Chat CS
               </Link>
               
               <Link href={`/dashboard/complaints/${complaintId}/escalate`} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#cc4224] text-white font-bold text-[14px] rounded-lg hover:bg-[#b0351b] transition-colors shadow-sm">
                 <PhoneCall className="w-4 h-4" />
                 Hubungi Manager
               </Link>
             </div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-orange-800 text-[12px] leading-relaxed flex gap-3">
             <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0" />
             <p>
               Gunakan fitur <strong>Hubungi Manager</strong> hanya jika keluhan Anda bersifat mendesak (Urgent) dan belum mendapatkan respon lebih dari 1x24 jam melalui Live Chat.
             </p>
          </div>

        </div>

      </div>
    </div>
  );
}
