import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, UploadCloud, ShieldCheck, CheckCircle2, RotateCcw, Search, Headset, MessageSquare, Send } from "lucide-react";
import { db } from "@/db";
import { transactions, complaints } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { createComplaint } from "@/app/actions/complaints";
import FileUploader from "./FileUploader";

export default async function ComplaintsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userId = session.userId as number;

  const userTransactions = await db.select()
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.createdAt));

  const userComplaints = await db.select()
    .from(complaints)
    .where(eq(complaints.userId, userId))
    .orderBy(desc(complaints.createdAt));

  return (
    <div className="p-8 max-w-[1100px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-zinc-200 pb-8">
        <div className="max-w-2xl">
          <h1 className="text-[16px] font-bold text-zinc-900 tracking-tight mb-2">
            Pengajuan Komplain
          </h1>
          <p className="text-[13px] text-zinc-600 leading-relaxed">
            Layanan purna jual resmi untuk pelaporan cacat produksi. Kami berkomitmen untuk mendengarkan setiap keluhan demi menjaga standar kualitas tertinggi.
          </p>
        </div>
        
        <div className="bg-zinc-100 rounded-xl p-4 flex items-center gap-4 border border-zinc-200 shrink-0">
          <div className="w-10 h-10 bg-[#cc4224] rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-zinc-900">0% Customer Claims Policy</h3>
            <p className="text-[12px] text-zinc-500">Standard Industri Global</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        
        {/* Left Column: Form */}
        <div className="w-full lg:w-3/5">
          <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
            <form action={createComplaint} className="space-y-6">
              
              {/* Order Selection */}
              <div>
                <label className="block text-[13px] font-semibold text-zinc-900 mb-2">
                  Nomor Pesanan (Order ID)
                </label>
                <div className="relative">
                  <select 
                    name="transactionId"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Pilih Nomor Pesanan...</option>
                    {userTransactions.map(tx => (
                      <option key={tx.id} value={tx.id}>
                        {tx.id} - {tx.status} - Rp {tx.totalAmount.toLocaleString("id-ID")}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none rotate-90" />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[13px] font-semibold text-zinc-900 mb-2">
                  Kategori Masalah
                </label>
                <div className="relative">
                  <select name="category" required defaultValue="" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all appearance-none cursor-pointer">
                    <option value="" disabled>Dimensi Tidak Sesuai</option>
                    <option value="Barang Cacat/Rusak">Barang Cacat/Rusak</option>
                    <option value="Dimensi Tidak Sesuai">Dimensi Tidak Sesuai</option>
                    <option value="Keterlambatan Pengiriman">Keterlambatan Pengiriman</option>
                    <option value="Barang Kurang">Barang Kurang</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                  <ChevronRight className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none rotate-90"/>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[13px] font-semibold text-zinc-900 mb-2">
                  Deskripsi Masalah
                </label>
                <textarea 
                  name="description"
                  rows={4}
                  required
                  placeholder="Jelaskan secara detail mengenai cacat atau ketidaksesuaian yang ditemukan pada produk..."
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[13px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all resize-none"
                ></textarea>
              </div>

              {/* File Upload Component */}
              <FileUploader />
              
              {/* Checkbox Agreement */}
              <div className="flex items-start gap-3 mt-4">
                <input 
                  type="checkbox" 
                  required 
                  className="mt-1 flex-shrink-0 w-4 h-4 text-[#cc4224] bg-white border-zinc-300 rounded focus:ring-[#cc4224]/50 focus:ring-2 cursor-pointer"
                />
                <label className="text-[12px] text-zinc-600 leading-relaxed">
                  Saya menyatakan bahwa informasi yang diberikan adalah benar dan bersedia untuk mengirimkan sampel produk yang bermasalah jika diperlukan untuk inspeksi laboratorium PT Duta Mitra Luhur.
                </label>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#b0351b] text-white font-bold text-[13px] rounded-lg hover:bg-[#8b2915] transition-colors shadow-sm">
                  Kirim Laporan Komplain <Send className="w-4 h-4 ml-1" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="w-full lg:w-2/5 space-y-6">
          
          {/* Komitmen Panel */}
          <div className="bg-[#0f172a] rounded-xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
               <ShieldCheck className="w-48 h-48 -mr-10 -mb-10" />
            </div>
            
            <h3 className="text-[14px] font-bold text-white mb-4 relative z-10">Komitmen Kualitas Kami</h3>
            <p className="text-[12px] text-blue-100/70 mb-8 leading-relaxed relative z-10">
              Di PT Duta Mitra Luhur, kami bangga dengan filosofi "Quality at Scale". Setiap produk karet industri kami melewati 3 tahap kontrol kualitas yang ketat.
            </p>
            
            <ul className="space-y-6 relative z-10">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#cc4224]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-white mb-1">Respon Cepat 1x24 Jam</h4>
                  <p className="text-[11px] text-blue-100/60 leading-relaxed">Tim QA kami akan menghubungi Anda dalam waktu kurang dari 24 jam kerja.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#cc4224]">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-white mb-1">Penggantian Unit 100%</h4>
                  <p className="text-[11px] text-blue-100/60 leading-relaxed">Jika terbukti cacat produksi, kami akan mengganti unit baru tanpa biaya tambahan.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#cc4224]">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-white mb-1">Analisis Akar Masalah (RCA)</h4>
                  <p className="text-[11px] text-blue-100/60 leading-relaxed">Setiap klaim masuk ke dalam laporan evaluasi produksi untuk mencegah kejadian berulang.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Proses Penanganan */}
          <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
             <h3 className="text-[14px] font-bold text-zinc-900 mb-6">Proses Penanganan</h3>
             
             <div className="relative pl-6 space-y-8 before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-zinc-100">
               
               <div className="relative">
                 <div className="absolute -left-6 top-0 w-6 h-6 bg-orange-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10">
                   <span className="w-1.5 h-1.5 bg-[#cc4224] rounded-full"></span>
                 </div>
                 <h4 className="text-[13px] font-bold text-zinc-900 mb-1">Laporan Diterima</h4>
                 <p className="text-[11px] text-zinc-500 leading-relaxed">Tiket keluhan Anda otomatis terdaftar di sistem ERP kami.</p>
               </div>
               
               <div className="relative">
                 <div className="absolute -left-6 top-0 w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                 </div>
                 <h4 className="text-[13px] font-bold text-zinc-900 mb-1">Investigasi Teknis</h4>
                 <p className="text-[11px] text-zinc-500 leading-relaxed">Pengecekan batch produksi dan nomor lot material oleh QC Engineer.</p>
               </div>
               
               <div className="relative">
                 <div className="absolute -left-6 top-0 w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                 </div>
                 <h4 className="text-[13px] font-bold text-zinc-900 mb-1">Resolusi & Penggantian</h4>
                 <p className="text-[11px] text-zinc-500 leading-relaxed">Konfirmasi hasil investigasi dan pengiriman unit pengganti jika disetujui.</p>
               </div>

             </div>
          </div>
          
          {/* Fast Help */}
          <Link href="#" className="flex items-center justify-between p-4 bg-zinc-50 border border-zinc-200 rounded-xl hover:bg-zinc-100 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white border border-zinc-200 rounded-lg flex items-center justify-center shrink-0">
                <Headset className="w-5 h-5 text-zinc-700" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-zinc-900">Butuh bantuan cepat?</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">Chat via WhatsApp (08:00 - 17:00)</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-[#cc4224] transition-colors" />
          </Link>

        </div>

      </div>

      {/* Existing Complaints Table */}
      {userComplaints.length > 0 && (
        <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
          <h2 className="text-[16px] font-bold text-zinc-900 mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#cc4224]" />
            Riwayat Komplain Anda
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="px-6 py-4 text-[12px] font-bold text-zinc-900 uppercase tracking-wider">ID Tiket</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-zinc-900 uppercase tracking-wider">Transaksi</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-zinc-900 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-zinc-900 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-zinc-900 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {userComplaints.map(comp => (
                  <tr key={comp.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-5 text-[13px] font-semibold text-zinc-900">{comp.id}</td>
                    <td className="px-6 py-5 text-[13px] text-zinc-600">{comp.transactionId}</td>
                    <td className="px-6 py-5 text-[13px] text-zinc-600">{comp.category}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        comp.status === 'Open' ? 'bg-[#fdf5f3] text-[#cc4224]' :
                        comp.status === 'In Progress' ? 'bg-orange-50 text-orange-600' :
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          comp.status === 'Open' ? 'bg-[#cc4224]' :
                          comp.status === 'In Progress' ? 'bg-orange-500' :
                          'bg-emerald-500'
                        }`}></span>
                        {comp.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right flex items-center justify-end gap-3">
                      <Link href={`/dashboard/complaints/${comp.id}`} className="text-[12px] font-bold text-[#cc4224] hover:underline">
                        Lihat Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
