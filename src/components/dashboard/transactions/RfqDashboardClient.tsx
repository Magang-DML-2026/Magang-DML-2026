"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FileText, Search, Download, ChevronDown, Check, 
  FileSearch, FileCheck, FileX, Plus, File as FileIcon, X, 
  Settings, FolderKanban, LayoutDashboard 
} from "lucide-react";

export default function RfqDashboardClient({
  rfqMetrics,
  rfqHistoryProp,
  recentDocsProp,
  allDocsProp
}: {
  rfqMetrics?: {
    total: number;
    active: number;
    approved: number;
    rejected: number;
  };
  rfqHistoryProp?: any[];
  recentDocsProp?: any[];
  allDocsProp?: any[];
} = {}) {
  const [activeTab, setActiveTab] = useState<"overview" | "documents">("overview");

  // Dropdown states for Documents Tab
  const [isDocTypeOpen, setIsDocTypeOpen] = useState(false);
  const [docType, setDocType] = useState("All Types");
  
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All Projects");

  // Modal State
  const [downloadModalData, setDownloadModalData] = useState<{name: string, size: string} | null>(null);

  const docTypes = ["All Types", "Technical Drawing", "QA Report", "Invoice", "Certification"];
  const projects = ["All Projects", "RFQ-2024-009", "RFQ-2024-008", "RFQ-2024-007"];

  const [rfqHistory] = useState(rfqHistoryProp || [
    {
      id: "RFQ-2024-008",
      description: "Rubber Seal Komponen Otomotif X-24",
      date: "24 Okt 2024",
      status: "Dalam Review",
      statusStyle: "bg-zinc-100 text-zinc-600 border border-transparent"
    }
  ]);

  const [recentDocs] = useState(recentDocsProp || [
    {
      name: "Tech_Drawing_Seal_v2.pdf",
      size: "2.4 MB",
      rfq: "RFQ-2024-008",
      date: "24 Okt 2024",
      iconType: "FileIcon",
      iconBg: "bg-[#0a1526]"
    }
  ]);

  const [allDocs] = useState(allDocsProp || [
    {
      name: "Extrusion_Profile_Specs_v2.pdf",
      type: "Technical Drawing",
      project: "RFQ-2024-009",
      date: "24 Oct 2024",
      size: "2.4 MB",
      iconType: "FileIcon",
      iconBg: "bg-[#0a1526]"
    }
  ]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight mb-2">
            {activeTab === "overview" ? "Dashboard Request for Quotation (RFQ)" : "Manajemen Semua Dokumen"}
          </h1>
          <p className="text-[14px] text-zinc-500">
            {activeTab === "overview" 
              ? "Manage and track your custom manufacturing requests." 
              : "Access and download technical specifications, QA reports, and commercial documents."}
          </p>
        </div>
        <Link 
          href="/dashboard/transactions/rfq" 
          className="bg-[#cc4224] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#b0351b] transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> New Custom Order
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-zinc-200">
        <button 
          onClick={() => setActiveTab("overview")}
          className={`pb-4 px-4 text-[14px] font-bold flex items-center gap-2 border-b-2 transition-colors
            ${activeTab === "overview" ? 'border-[#cc4224] text-[#cc4224]' : 'border-transparent text-zinc-500 hover:text-zinc-700'}
          `}
        >
          <LayoutDashboard className="w-4 h-4" /> Overview
        </button>
        <button 
          onClick={() => setActiveTab("documents")}
          className={`pb-4 px-4 text-[14px] font-bold flex items-center gap-2 border-b-2 transition-colors
            ${activeTab === "documents" ? 'border-[#cc4224] text-[#cc4224]' : 'border-transparent text-zinc-500 hover:text-zinc-700'}
          `}
        >
          <FolderKanban className="w-4 h-4" /> Semua Dokumen
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest">Total RFQ diajukan</p>
                <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center"><FileText className="w-5 h-5 text-zinc-400" /></div>
              </div>
              <p className="text-[36px] font-black text-zinc-900 leading-none">{rfqMetrics ? rfqMetrics.total : 124}</p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest">RFQ Aktif</p>
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center"><FileSearch className="w-5 h-5 text-blue-500" /></div>
              </div>
              <p className="text-[36px] font-black text-zinc-900 leading-none">{rfqMetrics ? rfqMetrics.active : 12}</p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest">RFQ Disetujui</p>
                <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-lg flex items-center justify-center"><FileCheck className="w-5 h-5 text-green-500" /></div>
              </div>
              <p className="text-[36px] font-black text-zinc-900 leading-none">{rfqMetrics ? rfqMetrics.approved : 8}</p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest">RFQ Ditolak</p>
                <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center"><FileX className="w-5 h-5 text-red-500" /></div>
              </div>
              <p className="text-[36px] font-black text-zinc-900 leading-none">{rfqMetrics ? rfqMetrics.rejected : 3}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Riwayat RFQ */}
            <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[16px] font-bold text-zinc-900">Riwayat RFQ</h2>
                <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="text-[13px] font-bold text-[#cc4224] hover:underline">Lihat Semua</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 text-[11px] uppercase tracking-widest text-zinc-400">
                      <th className="py-4 font-bold">ID RFQ</th>
                      <th className="py-4 font-bold">Proyek/Deskripsi</th>
                      <th className="py-4 font-bold">Tanggal</th>
                      <th className="py-4 font-bold">Status</th>
                      <th className="py-4 font-bold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {rfqHistory.map(rfq => (
                      <tr key={rfq.id} className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                        <td className="py-4 font-bold text-zinc-900">{rfq.id}</td>
                        <td className="py-4 text-zinc-600">{rfq.description}</td>
                        <td className="py-4 text-zinc-500">{rfq.date}</td>
                        <td className="py-4">
                          <span className={`${rfq.statusStyle} font-bold px-3 py-1.5 rounded-full text-[11px]`}>{rfq.status}</span>
                        </td>
                        <td className="py-4 text-right">
                          <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="bg-[#0a1526] text-white px-4 py-2 rounded-lg font-bold text-[11px] hover:bg-zinc-800 transition-colors">Detail</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dokumen Terbaru */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <FolderKanban className="w-5 h-5 text-zinc-400" />
                <h2 className="text-[16px] font-bold text-zinc-900">Dokumen Terbaru</h2>
              </div>
              
              <div className="space-y-4">
                {recentDocs.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 border border-zinc-100 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer" onClick={() => setDownloadModalData({name: doc.name, size: doc.size})}>
                    <div className={`w-10 h-10 ${doc.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                      {doc.iconType === "FileIcon" ? <FileIcon className="w-5 h-5 text-white" /> : <FileText className="w-5 h-5 text-white" />}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-zinc-900 line-clamp-1">{doc.name}</p>
                      <p className="text-[11px] text-zinc-500 mt-1">{doc.rfq} • {doc.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => setActiveTab("documents")}
                className="w-full mt-6 text-[13px] font-bold text-[#cc4224] hover:underline text-center"
              >
                Lihat Semua Dokumen →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENTS TAB */}
      {activeTab === "documents" && (
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Filters Bar */}
          <div className="p-6 border-b border-zinc-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-50/50 rounded-t-2xl">
            <div className="relative w-full md:max-w-sm">
              <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Cari nama dokumen..."
                className="w-full border border-zinc-300 rounded-xl pl-12 pr-4 py-3 text-[13px] outline-none focus:border-[#cc4224] focus:ring-1 focus:ring-[#cc4224] transition-colors bg-white"
              />
            </div>
            
            <div className="flex w-full md:w-auto items-center gap-4">
              {/* Filter Document Dropdown */}
              <div className="relative w-full md:w-48">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Filter Document</label>
                <div 
                  onClick={() => setIsDocTypeOpen(!isDocTypeOpen)}
                  className={`w-full border rounded-lg px-4 py-2.5 text-[13px] flex items-center justify-between cursor-pointer transition-colors bg-white ${isDocTypeOpen ? 'border-[#cc4224] ring-1 ring-[#cc4224]' : 'border-zinc-300'}`}
                >
                  <span className="text-zinc-900 font-bold">{docType}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isDocTypeOpen ? 'rotate-180' : ''}`} />
                </div>
                {isDocTypeOpen && (
                  <div className="absolute top-full right-0 mt-2 w-full md:w-56 bg-white border border-zinc-200 rounded-lg shadow-xl z-20 py-2">
                    {docTypes.map((type) => (
                      <div 
                        key={type}
                        onClick={() => {
                          setDocType(type);
                          setIsDocTypeOpen(false);
                        }}
                        className={`px-4 py-2.5 text-[13px] flex items-center justify-between cursor-pointer hover:bg-zinc-50 transition-colors ${docType === type ? 'text-[#cc4224] font-bold bg-orange-50/50' : 'text-zinc-700'}`}
                      >
                        {type}
                        {docType === type && <Check className="w-4 h-4" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Project Dropdown */}
              <div className="relative w-full md:w-48">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Filter Project</label>
                <div 
                  onClick={() => setIsProjectOpen(!isProjectOpen)}
                  className={`w-full border rounded-lg px-4 py-2.5 text-[13px] flex items-center justify-between cursor-pointer transition-colors bg-white ${isProjectOpen ? 'border-[#cc4224] ring-1 ring-[#cc4224]' : 'border-zinc-300'}`}
                >
                  <span className="text-zinc-900 font-bold">{projectFilter}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isProjectOpen ? 'rotate-180' : ''}`} />
                </div>
                {isProjectOpen && (
                  <div className="absolute top-full right-0 mt-2 w-full md:w-56 bg-white border border-zinc-200 rounded-lg shadow-xl z-20 py-2">
                    {projects.map((proj) => (
                      <div 
                        key={proj}
                        onClick={() => {
                          setProjectFilter(proj);
                          setIsProjectOpen(false);
                        }}
                        className={`px-4 py-2.5 text-[13px] flex items-center justify-between cursor-pointer hover:bg-zinc-50 transition-colors ${projectFilter === proj ? 'text-[#cc4224] font-bold bg-orange-50/50' : 'text-zinc-700'}`}
                      >
                        {proj}
                        {projectFilter === proj && <Check className="w-4 h-4" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Documents Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#0a1526] text-[11px] uppercase tracking-widest text-white/80">
                  <th className="py-4 px-6 font-bold rounded-tl-none">Document Name</th>
                  <th className="py-4 px-6 font-bold">Project Ref</th>
                  <th className="py-4 px-6 font-bold">Upload Date</th>
                  <th className="py-4 px-6 font-bold">Size</th>
                  <th className="py-4 px-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {allDocs.map((doc, idx) => (
                  <tr key={idx} className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${doc.iconBg} rounded flex items-center justify-center shrink-0`}>
                          <FileIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900">{doc.name}</p>
                          <p className="text-[11px] text-zinc-400">{doc.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-zinc-100 text-zinc-700 font-bold px-3 py-1.5 rounded-full text-[11px]">{doc.project}</span>
                    </td>
                    <td className="py-4 px-6 font-medium text-zinc-600">{doc.date}</td>
                    <td className="py-4 px-6 font-medium text-zinc-600">{doc.size}</td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => setDownloadModalData({name: doc.name, size: doc.size})}
                        className="bg-white border border-zinc-200 text-[#cc4224] px-4 py-2 rounded-lg font-bold text-[12px] hover:bg-orange-50 transition-colors flex items-center gap-1.5 ml-auto"
                      >
                        <Download className="w-4 h-4" /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 text-center text-[12px] text-zinc-400 border-t border-zinc-100">
            Showing 3 of 3 documents
          </div>
        </div>
      )}

      {/* Download Modal Overlay */}
      {downloadModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-[420px] w-full shadow-2xl relative text-center animate-in zoom-in-95 duration-200">
            
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 ring-8 ring-orange-50">
              <Download className="w-8 h-8 text-[#cc4224]" />
            </div>
            
            <h3 className="text-[20px] font-bold text-zinc-900 mb-2">Download Dimulai Otomatis</h3>
            <p className="text-[13px] text-zinc-500 leading-relaxed mb-8">
              Dokumen Anda sedang disiapkan, mohon tunggu... Jika tidak diunduh otomatis, klik tombol di bawah.
            </p>
            
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex items-center gap-3 mb-8 text-left">
              <div className="w-10 h-10 bg-[#0a1526] rounded-lg flex items-center justify-center shrink-0">
                <FileIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[13px] font-bold text-zinc-900 truncate" title={downloadModalData.name}>{downloadModalData.name}</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">{downloadModalData.size} • Siap diunduh</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setDownloadModalData(null)}
                className="flex-1 bg-white border border-zinc-200 text-zinc-700 font-bold text-[13px] py-3.5 rounded-xl hover:bg-zinc-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  alert(`Downloading ${downloadModalData.name}...`);
                  setDownloadModalData(null);
                }}
                className="flex-1 bg-[#cc4224] text-white font-bold text-[13px] py-3.5 rounded-xl hover:bg-[#b0351b] transition-colors"
              >
                Mulai Download
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
