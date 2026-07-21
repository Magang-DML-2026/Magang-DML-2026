"use client";

import { useState } from "react";
import { 
  Download, Search, Filter, ChevronDown, MoreVertical, 
  ArrowUpRight, CalendarClock, Receipt, CloudDownload, 
  CheckCircle2, ArrowLeft, Archive
} from "lucide-react";

export default function B2BInvoicesClient({
  b2bMetrics,
  tableDataProp
}: {
  b2bMetrics?: {
    outstandingBalance: number;
    upcomingDue: number;
  };
  tableDataProp?: any[];
} = {}) {
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const [tableData] = useState(tableDataProp || [
    { po: "PO-2024-0812", cat: "Custom Molding", amount: "Rp 420.500.000", date: "Aug 28, 2024", status: "Paid" }
  ]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight mb-1">Contracts & Invoices</h1>
          <p className="text-[14px] text-zinc-500">
            Manage your high-volume manufacturing purchase orders and financial statements.
          </p>
        </div>
        <button 
          onClick={() => setShowDownloadModal(true)}
          className="bg-[#cc4224] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#b0351b] transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
        >
          <Download className="w-4 h-4" /> Download All Statements
        </button>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Outstanding Balance */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Outstanding Balance</p>
            <Receipt className="w-5 h-5 text-zinc-400" />
          </div>
          <div>
            <p className="text-[32px] font-black text-zinc-900 leading-none mb-2">
              Rp {b2bMetrics ? (b2bMetrics.outstandingBalance / 1000000).toLocaleString('id-ID') : "1.450,5"} M
            </p>
            <p className="text-[12px] font-bold text-[#cc4224] flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> 8.2% from last month
            </p>
          </div>
        </div>

        {/* Upcoming Due */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Upcoming Due (7 Days)</p>
            <CalendarClock className="w-5 h-5 text-[#cc4224]" />
          </div>
          <div>
            <p className="text-[32px] font-black text-zinc-900 leading-none mb-2">
              Rp {b2bMetrics ? (b2bMetrics.upcomingDue / 1000000).toLocaleString('id-ID') : "342,0"} M
            </p>
            <p className="text-[12px] text-zinc-500">Due for 12 line items</p>
          </div>
        </div>

        {/* Banner Card */}
        <div className="bg-zinc-900 rounded-2xl overflow-hidden relative shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
            alt="Factory" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
            <h3 className="text-[18px] font-bold mb-1">Industrial Integrity</h3>
            <p className="text-[12px] text-zinc-300">Precision in every batch</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Filters Row */}
        <div className="p-6 border-b border-zinc-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-[320px]">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search PO Number or category..."
                className="w-full border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-[13px] outline-none focus:border-[#cc4224] focus:ring-1 focus:ring-[#cc4224] transition-colors"
              />
            </div>
            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="flex items-center gap-2 px-4 py-2.5 border border-zinc-300 rounded-xl text-[13px] font-bold text-zinc-700 hover:bg-zinc-50 transition-colors shrink-0">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-[13px] text-zinc-500 w-full md:w-auto">
            Sort by:
            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="flex items-center gap-1.5 font-bold text-zinc-900 px-3 py-1.5 hover:bg-zinc-50 rounded-lg transition-colors">
              Newest First <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100 text-[12px] font-bold text-zinc-900">
                <th className="py-4 px-6">PO Number</th>
                <th className="py-4 px-6">Product Category</th>
                <th className="py-4 px-6">Total Amount</th>
                <th className="py-4 px-6">Due Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {tableData.map((row, idx) => (
                <tr key={idx} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors group">
                  <td className="py-4 px-6 font-bold text-zinc-900">{row.po}</td>
                  <td className="py-4 px-6">
                    <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-[11px] font-medium border border-zinc-200">
                      {row.cat}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium text-zinc-900">{row.amount}</td>
                  <td className={`py-4 px-6 font-medium ${row.status === "Overdue" ? "text-[#cc4224]" : "text-zinc-600"}`}>
                    {row.date}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        row.status === 'Paid' ? 'bg-green-500' :
                        row.status === 'Unpaid' ? 'bg-[#cc4224]' : 'bg-[#cc4224]'
                      }`}></div>
                      <span className={`font-medium ${
                        row.status === 'Paid' ? 'text-green-700' :
                        row.status === 'Unpaid' ? 'text-[#cc4224]' : 'text-[#cc4224]'
                      }`}>
                        {row.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="text-zinc-400 hover:text-zinc-900 transition-colors p-1">
                      <MoreVertical className="w-5 h-5 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-zinc-500">
          <p>Showing 1-5 of 120 invoices</p>
          <div className="flex items-center gap-1">
            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-200">&lt;</button>
            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 text-white font-bold">1</button>
            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-200">2</button>
            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-200">3</button>
            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-200">&gt;</button>
          </div>
        </div>

      </div>

      {/* Download Modal Overlay */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] p-10 max-w-[480px] w-full shadow-2xl relative text-center animate-in zoom-in-95 duration-200">
            
            <div className="mx-auto w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
              <CloudDownload className="w-7 h-7 text-zinc-700" />
            </div>
            
            <h3 className="text-[22px] font-bold text-zinc-900 mb-3 tracking-tight">Download Seluruh Laporan<br/>Dimulai</h3>
            <p className="text-[13.5px] text-zinc-500 leading-relaxed mb-8 max-w-sm mx-auto">
              Sistem sedang menyiapkan dan mengunduh semua laporan keuangan (PDF) Anda. Mohon tunggu sebentar.
            </p>
            
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex items-center justify-between mb-10 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50/50 rounded-lg flex items-center justify-center shrink-0">
                  <Archive className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-zinc-900">Statements_Batch_2024.zip</p>
                  <p className="text-[12px] text-zinc-500 mt-0.5">12.4 MB</p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#cc4224]" />
            </div>
            
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button 
                onClick={() => setShowDownloadModal(false)}
                className="flex-1 bg-white border border-zinc-300 text-zinc-700 font-bold text-[13px] py-4 rounded-xl hover:bg-zinc-50 transition-colors shadow-sm"
              >
                Buka Folder Unduhan
              </button>
              <button 
                onClick={() => setShowDownloadModal(false)}
                className="flex-1 bg-[#cc4224] text-white font-bold text-[13px] py-4 px-4 rounded-xl hover:bg-[#b0351b] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" /> 
                <span className="leading-tight">Kembali ke Kontrak & Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
