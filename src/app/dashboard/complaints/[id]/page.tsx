import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, CheckCircle2, Clock, Search, MessageSquare, PhoneCall, Paperclip, AlertTriangle, Box, FileText, Check } from "lucide-react";
import { db } from "@/db";
import { complaints, transactions, transactionItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function ComplaintDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  
  const resolvedParams = await params;
  const complaintId = resolvedParams.id;

  const complaintList = await db.select().from(complaints).where(eq(complaints.id, complaintId)).limit(1);
  if (complaintList.length === 0) redirect("/dashboard/complaints");
  const complaint = complaintList[0];

  // Fetch related transaction and items
  const txList = await db.select().from(transactions).where(eq(transactions.id, complaint.transactionId)).limit(1);
  const tx = txList[0];

  const items = await db.select().from(transactionItems).where(eq(transactionItems.transactionId, complaint.transactionId));
  const mainItem = items.length > 0 ? items[0] : null;

  return (
    <div className="p-8 max-w-[1100px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-zinc-900 tracking-tight mb-1">
            Detail Laporan Komplain
          </h1>
          <p className="text-[13px] text-zinc-500">
            Nomor Tiket: <span className="font-semibold text-zinc-800">#{complaint.id}</span>
          </p>
        </div>
        <div className="flex-shrink-0">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold ${
            complaint.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' :
            complaint.status === 'Diproses' ? 'bg-[#ffccbc] text-[#d84315]' :
            'bg-orange-100 text-orange-700'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              complaint.status === 'Selesai' ? 'bg-emerald-500' :
              complaint.status === 'Diproses' ? 'bg-[#d84315] animate-pulse' :
              'bg-orange-500 animate-pulse'
            }`}></span>
            {complaint.status === 'Diproses' ? 'Sedang Diproses' : complaint.status}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Details */}
        <div className="w-full lg:w-2/3 space-y-6">
          
          {/* Timeline Panel */}
          <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
            <h2 className="text-[16px] font-bold text-zinc-900 mb-8">
              Timeline Penanganan
            </h2>
            
            <div className="relative pl-4 space-y-8">
              {/* Vertical line connecting timeline */}
              <div className="absolute left-7 top-2 bottom-4 w-[2px] bg-zinc-200"></div>
              
              {/* Step 1: Laporan Diterima */}
              <div className="relative z-10 flex gap-4">
                <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center text-white ring-4 ring-white shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-zinc-900 flex items-center gap-2">
                    Laporan Diterima
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{complaint.createdAt.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                  <p className="text-[13px] text-zinc-600 mt-2 leading-relaxed">
                    Laporan telah diverifikasi oleh sistem dan diteruskan ke Departemen QA.
                  </p>
                </div>
              </div>

              {/* Step 2: Investigasi Teknis (Active) */}
              <div className="relative z-10 flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#ffccbc] border-2 border-[#d84315] flex items-center justify-center text-[#d84315] ring-4 ring-white shrink-0 mt-0.5">
                  <Search className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#d84315]">
                    Investigasi Teknis
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{complaint.updatedAt.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })} (Update Terakhir)</p>
                  <p className="text-[13px] text-zinc-600 mt-2 leading-relaxed">
                    Tim teknis sedang melakukan pengecekan pada mold seri B-42 untuk verifikasi dimensi.
                  </p>
                </div>
              </div>

              {/* Step 3: Resolusi (Pending) */}
              <div className="relative z-10 flex gap-4 opacity-50">
                <div className="w-6 h-6 rounded-full bg-zinc-100 border-2 border-zinc-300 flex items-center justify-center text-zinc-400 ring-4 ring-white shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-zinc-900">
                    Resolusi
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Estimasi: Menunggu Investigasi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rincian Masalah Panel */}
          <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
            <h2 className="text-[16px] font-bold text-zinc-900 mb-6">
              Rincian Masalah
            </h2>
            
            <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-5 flex flex-col sm:flex-row gap-6 mb-6">
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Kategori Masalah</p>
                <p className="text-[14px] font-bold text-zinc-900">{complaint.category}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Prioritas</p>
                <span className="inline-flex px-2 py-0.5 bg-[#fdf2f2] text-[#ef4444] text-[10px] font-bold rounded uppercase tracking-wider border border-[#fee2e2]">
                  High Impact
                </span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Deskripsi Keluhan</p>
              <p className="text-[14px] text-zinc-700 leading-relaxed bg-white border border-zinc-100 p-5 rounded-lg shadow-sm">
                {complaint.description}
              </p>
            </div>
          </div>

          {/* Bukti Foto & Dokumen */}
          <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
            <h2 className="text-[16px] font-bold text-zinc-900 mb-6">
              Bukti Foto & Dokumen
            </h2>
            
            <div className="flex flex-wrap gap-4">
              <div className="w-24 h-24 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200">
                 <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1590483736622-398541ce1711?q=80&w=300&auto=format&fit=crop')] bg-cover bg-center"></div>
              </div>
              <div className="w-24 h-24 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200">
                 <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1587302484050-7173b2203673?q=80&w=300&auto=format&fit=crop')] bg-cover bg-center"></div>
              </div>
              <div className="w-24 h-24 bg-zinc-50 border-2 border-dashed border-zinc-300 rounded-lg flex flex-col items-center justify-center text-zinc-500 hover:bg-zinc-100 transition-colors cursor-pointer">
                 <FileText className="w-5 h-5 mb-1" />
                 <span className="text-[9px] font-bold truncate px-2 w-full text-center">QC_Report.pdf</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Sidebar */}
        <div className="w-full lg:w-1/3 space-y-6">
          
          {/* Ringkasan Pesanan */}
          <div className="bg-[#1a2737] rounded-xl p-6 text-white shadow-xl">
             <h3 className="text-[16px] font-bold text-white mb-6">
               Ringkasan Pesanan
             </h3>
             
             {mainItem && (
               <div className="flex items-start gap-4 mb-6">
                 <div className="w-10 h-10 bg-[#25364a] rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                   <Box className="w-5 h-5 text-[#ffccbc]" />
                 </div>
                 <div>
                   <h4 className="text-[13px] font-bold text-white leading-tight mb-1">{mainItem.productName}</h4>
                   <p className="text-[11px] text-[#859fbc]">Produk Karet Industri</p>
                 </div>
               </div>
             )}

             <div className="flex gap-4 mb-6">
               <div className="flex-1 bg-[#25364a] p-3 rounded-lg border border-white/5 text-center">
                 <p className="text-[10px] text-[#859fbc] mb-1">Kuantitas</p>
                 <p className="text-[13px] font-bold text-white">{mainItem ? mainItem.quantity : 0} Units</p>
               </div>
               <div className="flex-1 bg-[#25364a] p-3 rounded-lg border border-white/5 text-center">
                 <p className="text-[10px] text-[#859fbc] mb-1">Batch No.</p>
                 <p className="text-[13px] font-bold text-white">#BT-{Math.floor(100 + Math.random() * 900)}</p>
               </div>
             </div>
             
             <div className="space-y-3 pt-6 border-t border-white/10">
               <div className="flex justify-between text-[11px]">
                 <span className="text-[#859fbc]">Tanggal Pesanan:</span>
                 <span className="text-white font-medium">{tx ? tx.createdAt.toLocaleDateString('id-ID', { dateStyle: 'medium' }) : '-'}</span>
               </div>
               <div className="flex justify-between text-[11px]">
                 <span className="text-[#859fbc]">Tanggal Pengiriman:</span>
                 <span className="text-white font-medium">{tx ? new Date(tx.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', { dateStyle: 'medium' }) : '-'}</span>
               </div>
             </div>
          </div>
          
          {/* Butuh Bantuan Lebih Lanjut? */}
          <div className="bg-zinc-100 rounded-xl p-6 border border-zinc-200 text-center md:text-left">
             <h3 className="text-[14px] font-bold text-zinc-900 mb-2">
               Butuh Bantuan Lebih Lanjut?
             </h3>
             <p className="text-[12px] text-zinc-600 leading-relaxed mb-6">
               Hubungi Account Manager Anda untuk percepatan penanganan atau informasi teknis tambahan.
             </p>
             
             <div className="space-y-3">
               <Link href={`/dashboard/complaints/${complaintId}/chat`} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white font-bold text-[13px] rounded-lg hover:bg-black transition-colors shadow-sm">
                 <MessageSquare className="w-4 h-4" />
                 Live Chat CS
               </Link>
               
               <Link href={`/dashboard/complaints/${complaintId}/escalate`} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-zinc-300 text-zinc-700 font-bold text-[13px] rounded-lg hover:bg-zinc-200 transition-colors">
                 <PhoneCall className="w-4 h-4" />
                 Hubungi Manager
               </Link>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
