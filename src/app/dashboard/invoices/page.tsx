import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Download, CreditCard, Receipt, TrendingUp, AlertCircle, Search, Filter } from "lucide-react";

export default async function InvoicesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight mb-2">Riwayat Invoice</h1>
          <p className="text-[14px] text-zinc-500">Kelola dan pantau semua tagihan Anda di satu tempat.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Cari No. Invoice..." 
              className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all w-[250px]"
            />
          </div>
          <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 text-sm font-medium rounded-lg hover:bg-zinc-50 flex items-center gap-2 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-zinc-500 mb-1">Total Invoice</p>
            <p className="text-[24px] font-bold text-zinc-900">Rp 150.000.000</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-zinc-500 mb-1">Dibayar</p>
            <p className="text-[24px] font-bold text-zinc-900">Rp 100.000.000</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#fdf5f3] text-[#cc4224] flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-zinc-500 mb-1">Belum Dibayar</p>
            <p className="text-[24px] font-bold text-[#cc4224]">Rp 50.000.000</p>
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider w-[20%]">No. Invoice</th>
                <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider w-[20%]">Tanggal</th>
                <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider w-[20%]">Nominal</th>
                <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider w-[20%]">Status</th>
                <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider w-[20%] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {/* Row 1: Unpaid */}
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-5 text-[14px] font-semibold text-zinc-900">INV-2026-004</td>
                <td className="px-6 py-5 text-[14px] text-zinc-600">18 Okt 2026</td>
                <td className="px-6 py-5 text-[14px] font-medium text-zinc-900">Rp 50.000.000</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fdf5f3] text-[#cc4224] text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cc4224]"></span>
                    Menunggu Pembayaran
                  </span>
                </td>
                <td className="px-6 py-5 flex justify-end gap-3">
                  <button className="p-2 text-zinc-400 hover:text-zinc-700 bg-white border border-zinc-200 rounded-lg transition-colors tooltip-trigger" title="Download">
                    <Download className="w-4 h-4" />
                  </button>
                  <Link href="/dashboard/checkout" className="px-4 py-2 bg-[#cc4224] text-white text-[13px] font-bold rounded-lg hover:bg-[#b0351b] transition-colors flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Bayar
                  </Link>
                </td>
              </tr>
              
              {/* Row 2: Paid */}
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-5 text-[14px] font-semibold text-zinc-900">INV-2026-003</td>
                <td className="px-6 py-5 text-[14px] text-zinc-600">10 Okt 2026</td>
                <td className="px-6 py-5 text-[14px] font-medium text-zinc-900">Rp 45.000.000</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Lunas
                  </span>
                </td>
                <td className="px-6 py-5 flex justify-end gap-3">
                  <button className="px-4 py-2 text-zinc-600 bg-white border border-zinc-200 hover:bg-zinc-50 text-[13px] font-bold rounded-lg transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Invoice
                  </button>
                </td>
              </tr>
              
              {/* Row 3: Paid */}
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-5 text-[14px] font-semibold text-zinc-900">INV-2026-002</td>
                <td className="px-6 py-5 text-[14px] text-zinc-600">01 Sep 2026</td>
                <td className="px-6 py-5 text-[14px] font-medium text-zinc-900">Rp 55.000.000</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Lunas
                  </span>
                </td>
                <td className="px-6 py-5 flex justify-end gap-3">
                  <button className="px-4 py-2 text-zinc-600 bg-white border border-zinc-200 hover:bg-zinc-50 text-[13px] font-bold rounded-lg transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Invoice
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
