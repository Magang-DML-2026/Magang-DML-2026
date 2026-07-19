import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Search, UploadCloud, Info, AlertTriangle, FileText, CheckCircle, MessageSquare } from "lucide-react";
import { db } from "@/db";
import { transactions, complaints } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { createComplaint } from "@/app/actions/complaints";

export default async function ComplaintsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userId = session.userId as number;

  // Get user's transactions for the dropdown
  const userTransactions = await db.select()
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.createdAt));

  // Get user's existing complaints
  const userComplaints = await db.select()
    .from(complaints)
    .where(eq(complaints.userId, userId))
    .orderBy(desc(complaints.createdAt));

  return (
    <div className="p-8 max-w-[1100px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-6">
        <Link href="/dashboard" className="hover:text-zinc-800 transition-colors">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-[#cc4224]">Pengajuan Komplain</span>
      </div>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight mb-2">
            Pengajuan Komplain
          </h1>
          <p className="text-[14px] text-zinc-500 max-w-2xl">
            Lengkapi form di bawah ini untuk mengajukan keluhan terkait pesanan, produk, atau pengiriman. Tim kami akan segera menindaklanjuti laporan Anda.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        
        {/* Left Column: Form */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
            <h2 className="text-[16px] font-bold text-zinc-900 mb-6 pb-4 border-b border-zinc-100">
              Form Data Pengaduan
            </h2>
            
            <form action={createComplaint} className="space-y-6">
              
              {/* Order Selection */}
              <div>
                <label className="block text-[13px] font-semibold text-zinc-900 mb-2">
                  Pilih Nomor Pesanan <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    name="transactionId"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[14px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>-- Pilih Transaksi --</option>
                    {userTransactions.map(tx => (
                      <option key={tx.id} value={tx.id}>
                        {tx.id} - {tx.status} - Rp {tx.totalAmount.toLocaleString("id-ID")}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none rotate-90" />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1.5">Pilih pesanan yang ingin Anda laporkan.</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[13px] font-semibold text-zinc-900 mb-2">
                  Kategori Masalah <span className="text-red-500">*</span>
                </label>
                <select name="category" required defaultValue="" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[14px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all appearance-none cursor-pointer">
                  <option value="" disabled>Pilih kategori...</option>
                  <option value="Barang Cacat/Rusak">Barang Cacat/Rusak</option>
                  <option value="Keterlambatan Pengiriman">Keterlambatan Pengiriman</option>
                  <option value="Barang Kurang">Barang Kurang</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                <ChevronRight className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none rotate-90" style={{ marginTop: '13px' }}/>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[13px] font-semibold text-zinc-900 mb-2">
                  Detail Keluhan <span className="text-red-500">*</span>
                </label>
                <textarea 
                  name="description"
                  rows={4}
                  required
                  placeholder="Tuliskan masalah Anda sedetail mungkin..."
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[14px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all resize-none"
                ></textarea>
              </div>

              {/* File Upload (Mock UI) */}
              <div>
                <label className="block text-[13px] font-semibold text-zinc-900 mb-2">
                  Unggah Bukti (Foto/Video)
                </label>
                <div className="w-full border-2 border-dashed border-zinc-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-50 hover:border-[#cc4224]/50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-[#fdf5f3] flex items-center justify-center text-[#cc4224] mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-[14px] font-semibold text-zinc-900 mb-1">Tarik & Lepas file di sini</p>
                  <p className="text-[12px] text-zinc-500 mb-4">atau klik untuk menelusuri file Anda</p>
                  <p className="text-[11px] text-zinc-400">Format: JPG, PNG, MP4. Maks 10MB.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex justify-end">
                <button type="submit" className="px-8 py-3.5 bg-[#cc4224] text-white font-bold text-[14px] rounded-lg hover:bg-[#b0351b] transition-colors shadow-sm">
                  Kirim Pengajuan
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Info & Tips */}
        <div className="w-full lg:w-1/3 space-y-6">
          {/* Panduan Panel */}
          <div className="bg-[#111827] rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <Info className="w-5 h-5 text-blue-400" />
              <h3 className="text-[15px] font-bold text-white tracking-wide">Panduan Komplain</h3>
            </div>
            
            <ul className="space-y-4 text-[13px] text-zinc-300">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-white">1</div>
                <p className="leading-relaxed">Pastikan Anda memilih <strong>Nomor Pesanan</strong> yang benar sesuai dengan barang yang bermasalah.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-white">2</div>
                <p className="leading-relaxed">Sertakan <strong>Bukti Foto/Video</strong> yang jelas memperlihatkan kerusakan atau masalah pada produk.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-white">3</div>
                <p className="leading-relaxed">Tim investigasi kami akan merespon laporan Anda dalam waktu maksimal <strong>1x24 jam kerja</strong>.</p>
              </li>
            </ul>
          </div>

          {/* SLA Panel */}
          <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0 text-orange-500">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-zinc-900 mb-1.5">Batas Waktu Pengajuan</h3>
                <p className="text-[12px] text-zinc-600 leading-relaxed">
                  Komplain kerusakan fisik hanya diterima maksimal <strong>3 hari</strong> setelah status barang "Diterima".
                </p>
              </div>
            </div>
          </div>
          
        </div>

      </div>

      {/* Existing Complaints Table */}
      {userComplaints.length > 0 && (
        <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
          <h2 className="text-[18px] font-bold text-zinc-900 mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#cc4224]" />
            Riwayat Komplain Anda
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider">ID Tiket</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider">Transaksi</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {userComplaints.map(comp => (
                  <tr key={comp.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-5 text-[14px] font-semibold text-zinc-900">{comp.id}</td>
                    <td className="px-6 py-5 text-[14px] text-zinc-600">{comp.transactionId}</td>
                    <td className="px-6 py-5 text-[14px] text-zinc-600">{comp.category}</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fdf5f3] text-[#cc4224] text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#cc4224]"></span>
                        {comp.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link href={`/dashboard/complaints/${comp.id}/chat`} className="text-[13px] font-bold text-[#cc4224] hover:underline">
                        Lihat Chat
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
