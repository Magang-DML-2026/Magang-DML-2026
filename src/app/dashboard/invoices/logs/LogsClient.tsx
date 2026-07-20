"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Search, ChevronDown, MoreVertical, ChevronLeft, ChevronRight, CloudDownload, CheckCircle2, FileText, X } from "lucide-react";

export default function LogsClient({ initialLogs, userName }: { initialLogs: any[], userName: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [downloadState, setDownloadState] = useState<"idle" | "preparing" | "ready" | "success">("idle");
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    if (downloadState === "preparing") {
      setDownloadProgress(0);
      const interval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setDownloadState("ready");
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [downloadState]);

  const filteredLogs = useMemo(() => {
    return initialLogs.filter(log => {
      // Search
      const searchMatch = log.documentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          userName.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status
      const statusMatch = statusFilter === "Semua Status" || log.status === statusFilter;
      
      // Date
      let dateMatch = true;
      if (dateFilter) {
        const logDate = new Date(log.createdAt).toISOString().split('T')[0];
        dateMatch = logDate === dateFilter;
      }

      return searchMatch && statusMatch && dateMatch;
    });
  }, [initialLogs, searchTerm, statusFilter, dateFilter, userName]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const currentLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalLogs = initialLogs.length;
  const successfulLogs = initialLogs.filter(log => log.status === 'Completed').length;
  const failedLogs = initialLogs.filter(log => log.status === 'Failed').length;
  const successRate = totalLogs > 0 ? ((successfulLogs / totalLogs) * 100).toFixed(1) : "0.0";

  const resetFilters = () => {
    setSearchTerm("");
    setDateFilter("");
    setStatusFilter("Semua Status");
    setCurrentPage(1);
  };

  const handleStartDownload = () => {
    if (filteredLogs.length === 0) return;
    setDownloadState("preparing");
  };

  const handleExecuteDownload = () => {
    const headers = ["Timestamp", "Document Name", "Document Type", "Destination", "User", "Status"];
    
    const csvData = filteredLogs.map(log => {
      const date = new Date(log.createdAt).toLocaleString('id-ID');
      return [
        `"${date}"`,
        `"${log.documentName}"`,
        `"${log.documentType}"`,
        `"${log.destination}"`,
        `"${userName}"`,
        `"${log.status}"`
      ].join(",");
    });

    const csvContent = [headers.join(","), ...csvData].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    link.setAttribute("download", `LOG_CETAK_DML_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadState("success");
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <Link href="/dashboard/invoices" className="inline-flex items-center gap-2 text-[13px] font-bold text-zinc-500 hover:text-zinc-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Order Status
          </Link>
          <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight mb-2">Riwayat Log Cetak</h1>
          <p className="text-[14px] text-zinc-500 max-w-[600px] leading-relaxed">
            Pantau seluruh aktivitas pencetakan dokumen operasional. Sistem mencatat setiap permintaan dari invoice, label pengiriman, hingga manifest produksi untuk keperluan audit dan verifikasi.
          </p>
        </div>
        <div className="shrink-0 mt-4 md:mt-0 self-end md:self-center">
          <button 
            onClick={handleStartDownload}
            className="px-5 py-2.5 bg-[#cc4224] text-white text-[14px] font-bold rounded-lg hover:bg-[#b0351b] transition-colors flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" /> Download Log as CSV
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 mb-6 flex flex-col lg:flex-row gap-4 items-end shadow-sm">
        <div className="flex-1 w-full">
          <label className="block text-[12px] font-bold text-zinc-700 mb-2">Cari Dokumen / User</label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Contoh: Invoice #DML-2024..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all" 
            />
          </div>
        </div>
        <div className="flex-1 w-full">
          <label className="block text-[12px] font-bold text-zinc-700 mb-2">Pilih Tanggal</label>
          <div className="relative">
            <input 
              type="date" 
              value={dateFilter}
              onChange={(e) => { setDateFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all" 
            />
          </div>
        </div>
        <div className="flex-1 w-full">
          <label className="block text-[12px] font-bold text-zinc-700 mb-2">Status Cetak</label>
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-zinc-200 rounded-lg text-[13px] text-zinc-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all cursor-pointer"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
              <option value="In Progress">In Progress</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>
        </div>
        <div className="shrink-0 w-full lg:w-auto mt-2 lg:mt-0">
          <button 
            onClick={resetFilters}
            className="w-full lg:w-auto px-6 py-2.5 bg-white border border-zinc-300 text-zinc-700 text-[13px] font-bold rounded-lg hover:bg-zinc-50 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#0f172a] text-white">
                <th className="px-6 py-4 text-[13px] font-bold tracking-wide">Timestamp</th>
                <th className="px-6 py-4 text-[13px] font-bold tracking-wide">Document Name</th>
                <th className="px-6 py-4 text-[13px] font-bold tracking-wide">Type</th>
                <th className="px-6 py-4 text-[13px] font-bold tracking-wide">Destination</th>
                <th className="px-6 py-4 text-[13px] font-bold tracking-wide">User</th>
                <th className="px-6 py-4 text-[13px] font-bold tracking-wide">Status</th>
                <th className="px-6 py-4 text-[13px] font-bold tracking-wide text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              
              {currentLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-500 text-[13px]">
                    {initialLogs.length === 0 ? "Belum ada riwayat cetak dokumen." : "Tidak ada log yang sesuai dengan filter Anda."}
                  </td>
                </tr>
              ) : (
                currentLogs.map((log) => {
                  const logDate = new Date(log.createdAt);
                  return (
                    <tr key={log.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-[13px] font-medium text-zinc-600">
                          {logDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })},
                        </p>
                        <p className="text-[13px] font-medium text-zinc-600">
                          {logDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[13px] font-bold text-zinc-900">{log.documentName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          log.documentType === 'Invoice' ? 'bg-zinc-100 text-zinc-600 border-zinc-200' : 
                          log.documentType === 'Label' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {log.documentType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[13px] text-zinc-700">{log.destination}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[13px] text-zinc-700">{userName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold ${
                          log.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                          log.status === 'Failed' ? 'bg-red-50 text-[#cc4224]' :
                          'bg-orange-100 text-[#d4582b]'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            log.status === 'Completed' ? 'bg-emerald-500' :
                            log.status === 'Failed' ? 'bg-[#cc4224]' :
                            'bg-[#d4582b]'
                          }`}></span> {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-zinc-400 hover:text-zinc-700 p-1 rounded transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}

            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-zinc-200 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-zinc-500 font-medium">
            Menampilkan {currentLogs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredLogs.length)} dari {filteredLogs.length} entri
          </p>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 text-zinc-400 hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded text-[13px] font-bold transition-colors ${
                  currentPage === i + 1 ? 'bg-[#0f172a] text-white' : 'hover:bg-zinc-100 text-zinc-600'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <p className="text-[13px] font-bold text-zinc-500 mb-2">Total Cetak</p>
          <p className="text-[28px] font-light text-zinc-900 tracking-tight">{totalLogs}</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <p className="text-[13px] font-bold text-zinc-500 mb-2">Tingkat Keberhasilan</p>
          <p className="text-[28px] font-light text-emerald-500 tracking-tight">{successRate}%</p>
        </div>
        <div className="bg-white border-y border-r border-l-4 border-l-[#cc4224] border-y-zinc-200 border-r-zinc-200 rounded-xl p-6 shadow-sm">
          <p className="text-[13px] font-bold text-zinc-500 mb-2">Gagal Cetak</p>
          <p className="text-[28px] font-light text-[#cc4224] tracking-tight">{failedLogs}</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <p className="text-[13px] font-bold text-zinc-500 mb-2">Puncak Aktivitas</p>
          <p className="text-[28px] font-light text-zinc-900 tracking-tight">09:00 - 11:00</p>
        </div>
      </div>

      {/* Download Flow Modal */}
      {downloadState !== "idle" && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col items-center p-8 relative animate-in fade-in zoom-in duration-300">
            
            {/* Close Button for preparing/ready states */}
            {downloadState !== "success" && (
              <button 
                onClick={() => setDownloadState("idle")}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {downloadState === "preparing" && (
              <>
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                  <CloudDownload className="w-10 h-10 text-[#cc4224]" />
                </div>
                <h3 className="text-[20px] font-bold text-zinc-900 mb-2">Menyiapkan Data CSV...</h3>
                <p className="text-[13px] text-zinc-500 text-center mb-8">
                  Mohon tunggu sebentar, sistem sedang mengumpulkan riwayat log untuk diunduh.
                </p>
                
                <div className="w-full">
                  <div className="flex justify-between text-[12px] font-bold mb-2">
                    <span className="text-zinc-700">Memproses Data</span>
                    <span className="text-[#cc4224]">{Math.min(downloadProgress, 100)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden mb-3">
                    <div 
                      className="h-full bg-[#cc4224] rounded-full transition-all duration-300 ease-out" 
                      style={{ width: `${Math.min(downloadProgress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-zinc-400 text-center">
                    Mengekstraksi {filteredLogs.length.toLocaleString('id-ID')} baris data CSV...
                  </p>
                </div>
                
                <button 
                  onClick={() => setDownloadState("idle")}
                  className="mt-8 text-[13px] font-bold text-zinc-500 hover:text-zinc-800 transition-colors"
                >
                  Batal
                </button>
              </>
            )}

            {downloadState === "ready" && (
              <>
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-[20px] font-bold text-zinc-900 mb-2">File CSV Siap Diunduh</h3>
                <p className="text-[13px] text-zinc-500 text-center mb-6 px-4">
                  Data log cetak dari periode {dateFilter ? new Date(dateFilter).toLocaleDateString('id-ID') : 'Semua Waktu'} telah berhasil dikonfigurasi.
                </p>
                
                <div className="w-full border border-zinc-200 rounded-xl p-4 bg-zinc-50 flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-white border border-zinc-200 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-zinc-900 truncate">
                      LOG_CETAK_DML_{new Date().toISOString().split('T')[0].replace(/-/g, '')}.csv
                    </p>
                    <p className="text-[12px] text-zinc-500 mt-0.5">
                      Ukuran File: {(filteredLogs.length * 0.12).toFixed(1)} KB • {filteredLogs.length.toLocaleString('id-ID')} Baris Data
                    </p>
                  </div>
                  <div className="text-[13px] font-bold text-[#cc4224]">100%</div>
                </div>
                
                <button 
                  onClick={handleExecuteDownload}
                  className="w-full py-3.5 bg-[#cc4224] text-white text-[14px] font-bold rounded-xl hover:bg-[#b0351b] transition-colors shadow-lg shadow-orange-500/20 mb-4"
                >
                  Unduh Sekarang
                </button>
                <button 
                  onClick={() => setDownloadState("idle")}
                  className="text-[13px] font-bold text-zinc-500 hover:text-zinc-800 transition-colors"
                >
                  Kembali ke Riwayat
                </button>
              </>
            )}

            {downloadState === "success" && (
              <>
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-[20px] font-bold text-zinc-900 mb-2">Unduh CSV Berhasil</h3>
                <p className="text-[13px] text-zinc-500 text-center mb-8 px-4">
                  File <strong>LOG_CETAK_DML_{new Date().toISOString().split('T')[0].replace(/-/g, '')}.csv</strong> telah berhasil disimpan ke perangkat Anda.
                </p>
                
                <button 
                  onClick={() => setDownloadState("idle")}
                  className="w-full py-3.5 bg-[#8b3a24] text-white text-[14px] font-bold rounded-xl hover:bg-[#6c2c1a] transition-colors shadow-lg shadow-orange-900/20"
                >
                  ← Kembali ke Riwayat
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
