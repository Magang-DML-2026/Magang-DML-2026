"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ExternalLink, Filter } from "lucide-react";

export default function TransactionsClient({ userTransactions, itemsByTxId }: { userTransactions: any[], itemsByTxId: Record<string, any> }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  const filteredTransactions = useMemo(() => {
    return userTransactions.filter(tx => {
      // Filter by Search (Transaction ID)
      const searchMatch = tx.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by Status
      const statusMatch = statusFilter === "Semua Status" || tx.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [userTransactions, searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Menunggu Pembayaran":
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-semibold">Menunggu Pembayaran</span>;
      case "Diproses":
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#fdf5f3] text-[#cc4224] text-[11px] font-semibold">Diproses</span>;
      case "Dikirim":
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-semibold">Dikirim</span>;
      case "Selesai":
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-semibold">Selesai</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500 text-[11px] font-semibold">{status}</span>;
    }
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight mb-2">Riwayat Pesanan</h1>
          <p className="text-[14px] text-zinc-500">Lacak status pesanan dan lihat riwayat pembelian Anda.</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Cari ID Pesanan..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all w-[250px]"
            />
          </div>
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-4 pr-8 py-2 bg-white border border-zinc-200 text-zinc-700 text-sm font-medium rounded-lg hover:bg-zinc-50 appearance-none focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-colors cursor-pointer"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
              <option value="Diproses">Diproses</option>
              <option value="Dikirim">Dikirim</option>
              <option value="Selesai">Selesai</option>
            </select>
            <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider">ID Pesanan</th>
                <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider">Produk Utama</th>
                <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider">Total Harga</th>
                <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[13px] font-bold text-zinc-900 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[14px] text-zinc-500">
                    Tidak ada pesanan yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const txDate = new Date(tx.createdAt);
                  return (
                    <tr key={tx.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-5 text-[14px] font-semibold text-zinc-900">{tx.id}</td>
                      <td className="px-6 py-5 text-[14px] text-zinc-600">{txDate.toLocaleDateString("id-ID")}</td>
                      <td className="px-6 py-5 text-[14px] text-zinc-900 font-medium">
                        {itemsByTxId[tx.id]?.productName || "-"}
                        <div className="text-xs text-zinc-500 font-normal mt-0.5">Total: {itemsByTxId[tx.id]?.totalQuantity.toLocaleString("id-ID")} items</div>
                      </td>
                      <td className="px-6 py-5 text-[14px] font-medium text-zinc-900">Rp {tx.totalAmount.toLocaleString("id-ID")}</td>
                      <td className="px-6 py-5">
                        {getStatusBadge(tx.status)}
                      </td>
                      <td className="px-6 py-5 flex justify-end">
                        <Link href={`/dashboard/transactions/${tx.id}/tracking`} className="px-4 py-2 text-[#cc4224] bg-[#fdf5f3] hover:bg-[#fce9e5] text-[13px] font-bold rounded-lg transition-colors flex items-center gap-2">
                          Lacak Pesanan
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
