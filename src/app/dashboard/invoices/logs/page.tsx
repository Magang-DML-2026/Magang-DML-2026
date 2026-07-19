import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Search, Calendar, CheckCircle2, ChevronRight, Filter } from "lucide-react";

export default async function InvoiceLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ modal?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  
  const resolvedParams = await searchParams;
  const showModal = resolvedParams.modal;

  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans bg-[#F9FAFB] min-h-screen relative">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/invoices" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-[24px] font-bold text-zinc-900 tracking-tight">Riwayat Log Cetak</h1>
          <p className="text-[13px] text-zinc-500">Pantau aktivitas unduh dan cetak dokumen invoice.</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Cari user atau invoice..." 
              className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all w-[250px]"
            />
          </div>
          <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 text-sm font-medium rounded-lg hover:bg-zinc-50 flex items-center gap-2 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        
        <Link href="?modal=date" scroll={false} className="px-4 py-2 bg-[#cc4224] text-white text-[13px] font-bold rounded-lg hover:bg-[#b0351b] transition-colors flex items-center gap-2 shadow-sm">
          <Download className="w-4 h-4" />
          Unduh Log CSV
        </Link>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-4 text-[12px] font-bold text-zinc-500 uppercase tracking-wider">Waktu Aktivitas</th>
                <th className="px-6 py-4 text-[12px] font-bold text-zinc-500 uppercase tracking-wider">Pengguna</th>
                <th className="px-6 py-4 text-[12px] font-bold text-zinc-500 uppercase tracking-wider">No. Invoice</th>
                <th className="px-6 py-4 text-[12px] font-bold text-zinc-500 uppercase tracking-wider">Aksi</th>
                <th className="px-6 py-4 text-[12px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-[13px] font-semibold text-zinc-900">Hari ini, 10:30 WIB</p>
                  <p className="text-[11px] text-zinc-500">19 Okt 2026</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 shrink-0"></div>
                    <div>
                      <p className="text-[13px] font-bold text-zinc-900">{session.userName}</p>
                      <p className="text-[11px] text-zinc-500">{session.userEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link href="/dashboard/invoices/preview" className="text-[13px] font-bold text-[#cc4224] hover:underline flex items-center gap-1">
                    INV-2026-004
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[13px] font-medium text-zinc-700 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-500" /> Print Preview
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Berhasil
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-[13px] font-semibold text-zinc-900">Kemarin, 14:15 WIB</p>
                  <p className="text-[11px] text-zinc-500">18 Okt 2026</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 shrink-0"></div>
                    <div>
                      <p className="text-[13px] font-bold text-zinc-900">Admin Keuangan</p>
                      <p className="text-[11px] text-zinc-500">finance@dutamitraluhur.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[13px] font-bold text-zinc-900">INV-2026-003</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[13px] font-medium text-zinc-700 flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-emerald-500" /> Unduh PDF
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Berhasil
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      {showModal === 'date' && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[400px] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-100">
              <h2 className="text-[18px] font-bold text-zinc-900">Pilih Rentang Tanggal</h2>
              <p className="text-[13px] text-zinc-500 mt-1">Tentukan periode log yang ingin diunduh.</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-zinc-900 mb-2 uppercase tracking-wider">Tanggal Mulai</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input type="date" className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-[13px] text-zinc-900 focus:outline-none focus:border-[#cc4224]" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-zinc-900 mb-2 uppercase tracking-wider">Tanggal Akhir</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input type="date" className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-[13px] text-zinc-900 focus:outline-none focus:border-[#cc4224]" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-zinc-100 flex gap-3 bg-zinc-50">
              <Link href="/dashboard/invoices/logs" scroll={false} className="flex-1 py-2.5 bg-white border border-zinc-300 text-zinc-700 font-bold text-[13px] rounded-lg hover:bg-zinc-100 transition-colors text-center">
                Batal
              </Link>
              <Link href="?modal=success" scroll={false} className="flex-1 py-2.5 bg-[#cc4224] text-white font-bold text-[13px] rounded-lg hover:bg-[#b0351b] transition-colors shadow-sm flex items-center justify-center gap-2">
                Unduh CSV
              </Link>
            </div>
          </div>
        </div>
      )}

      {showModal === 'success' && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[400px] p-8 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-[18px] font-bold text-zinc-900 mb-2">Unduhan Berhasil</h2>
            <p className="text-[13px] text-zinc-500 mb-8">File CSV log cetak invoice Anda telah berhasil diunduh ke perangkat Anda.</p>
            <Link href="/dashboard/invoices/logs" scroll={false} className="w-full inline-block py-3 bg-white border-2 border-zinc-200 text-zinc-700 font-bold text-[13px] rounded-lg hover:bg-zinc-50 transition-colors">
              Tutup
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
