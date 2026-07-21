"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Bell, Printer, CheckCircle2, AlertCircle, Users, Filter, CalendarDays, FileText, Download, ShieldCheck, Activity } from "lucide-react";

export function PrintLogClient({ orderId, adminName }: { orderId: string, adminName: string }) {
  const router = useRouter();

  const logs = [
    {
      id: 1,
      date: "Oct 24, 2023",
      time: "14:22:15 GMT",
      docType: `Manifest #${orderId}`,
      subType: "Packing List (v2.4)",
      user: "John Doe",
      initials: "JD",
      role: "Floor Manager",
      printer: "HP LaserJet M507",
      node: "Warehouse-North-Bay02",
      status: "SUCCESS"
    },
    {
      id: 2,
      date: "Oct 24, 2023",
      time: "14:18:02 GMT",
      docType: `Manifest #${orderId}`,
      subType: "Customs Declaration Form",
      user: "John Doe",
      initials: "JD",
      role: "Floor Manager",
      printer: "HP LaserJet M507",
      node: "Warehouse-North-Bay02",
      status: "FAILED"
    },
    {
      id: 3,
      date: "Oct 23, 2023",
      time: "09:45:11 GMT",
      docType: `Manifest #${orderId}`,
      subType: "Draft Export Documentation",
      user: "Admin Sarah",
      initials: "AS",
      role: "Inventory Lead",
      printer: "Zebra ZT411",
      node: "Admin-Office-East",
      status: "SUCCESS"
    },
    {
      id: 4,
      date: "Oct 23, 2023",
      time: "08:15:44 GMT",
      docType: `Manifest #${orderId}`,
      subType: "Initial Manifest Generation",
      user: "System Process",
      initials: "SY",
      role: "Automated Trigger",
      printer: "Virtual PDF Printer",
      node: "Cloud Storage Node",
      status: "SUCCESS"
    }
  ];

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-[#fafafa]">
      
      {/* ── Page Header ─────────────── */}
      <header className="h-[72px] bg-white border-b border-zinc-200 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-6 text-sm font-medium">
          <span className="text-black font-black text-lg">Admin Portal</span>
          <nav className="flex gap-4">
            <a href="#" className="text-zinc-500 hover:text-black">Global Logs</a>
            <a href="#" className="text-black font-bold border-b-2 border-black pb-1">Order History</a>
            <a href="#" className="text-zinc-500 hover:text-black">Reports</a>
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search logs..."
              className="pl-9 pr-4 py-2 w-[240px] bg-zinc-100 border-none rounded-full text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30"
            />
          </div>
          <button className="relative text-zinc-500 hover:text-black transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <span className="text-xs font-bold">{adminName.charAt(0)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 max-w-6xl mx-auto w-full">
        
        {/* Title Bar */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
              <span>ORDERS</span>
              <span>›</span>
              <span>#{orderId}</span>
              <span>›</span>
              <span className="text-black">PRINT HISTORY</span>
            </div>
            <h1 className="text-3xl font-black text-black tracking-tight mb-2">Order Manifest Log</h1>
            <p className="text-sm text-zinc-600 max-w-xl">
              Viewing complete audit trail for document generation and physical printing processes related to manifest #{orderId}.
            </p>
          </div>
          <button 
            onClick={() => router.push(`/admin/orders/${orderId}`)}
            className="px-5 py-2.5 rounded-lg border border-black bg-white text-black font-semibold text-sm hover:bg-zinc-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Order
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5 text-zinc-700" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 mb-0.5">Total Prints</p>
              <p className="text-2xl font-black text-black">24</p>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#d94a26]" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 mb-0.5">Successful</p>
              <p className="text-2xl font-black text-black">22</p>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 mb-0.5">Failures</p>
              <p className="text-2xl font-black text-black">02</p>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 mb-0.5">Unique Users</p>
              <p className="text-2xl font-black text-black">05</p>
            </div>
          </div>
        </div>

        {/* Log Table Area */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm mb-6">
          {/* Toolbar */}
          <div className="p-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50 rounded-t-xl">
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-zinc-300 rounded text-xs font-bold text-zinc-700 flex items-center gap-2 hover:bg-zinc-50">
                <Filter className="w-3.5 h-3.5" /> Filter Status
              </button>
              <button className="px-4 py-2 bg-white border border-zinc-300 rounded text-xs font-bold text-zinc-700 flex items-center gap-2 hover:bg-zinc-50">
                <CalendarDays className="w-3.5 h-3.5" /> Date Range
              </button>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
              Showing 1-10 of 24 logs
              <div className="flex gap-1">
                <button className="w-6 h-6 border border-zinc-300 rounded bg-white hover:bg-zinc-50 flex items-center justify-center">&lt;</button>
                <button className="w-6 h-6 border border-zinc-300 rounded bg-white hover:bg-zinc-50 flex items-center justify-center">&gt;</button>
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black text-white text-xs uppercase tracking-wider">
                <th className="py-3 px-6 text-left font-bold">Timestamp</th>
                <th className="py-3 px-6 text-left font-bold">Document Type</th>
                <th className="py-3 px-6 text-left font-bold">Admin/Initiator</th>
                <th className="py-3 px-6 text-left font-bold">Printer Node</th>
                <th className="py-3 px-6 text-center font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-4 px-6 align-top">
                    <p className="font-bold text-black text-[13px]">{log.date}</p>
                    <p className="text-[11px] text-zinc-500">{log.time}</p>
                  </td>
                  <td className="py-4 px-6 align-top">
                    <div className="flex gap-3 items-start">
                      <FileText className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold text-black text-[13px]">{log.docType}</p>
                        <p className="text-[11px] text-zinc-500">{log.subType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 align-top">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${log.user === 'System Process' ? 'bg-zinc-200 text-zinc-600' : 'bg-black text-white'}`}>
                        {log.initials}
                      </div>
                      <div>
                        <p className="font-bold text-black text-[13px]">{log.user}</p>
                        <p className="text-[11px] text-zinc-500">{log.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 align-top">
                    <p className="font-bold text-black text-[13px]">{log.printer}</p>
                    <p className="text-[11px] text-zinc-500">{log.node}</p>
                  </td>
                  <td className="py-4 px-6 text-center align-top">
                    {log.status === "SUCCESS" ? (
                      <span className="inline-flex items-center gap-1.5 bg-orange-50 text-[#d94a26] border border-orange-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d94a26]"></div>
                        SUCCESS
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                        FAILED
                        <AlertCircle className="w-3 h-3 text-red-500 ml-1" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Pagination & Export */}
          <div className="p-4 border-t border-zinc-200 bg-white flex justify-between items-center rounded-b-xl">
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-zinc-300 rounded text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-colors">
                CSV Export
              </button>
              <button className="px-4 py-2 border border-zinc-300 rounded text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-colors">
                Audit PDF
              </button>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
              <div className="flex items-center gap-2">
                Rows per page: 
                <select className="border border-zinc-300 rounded px-1.5 py-1 text-black bg-white outline-none">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex gap-3">
                <span className="cursor-pointer hover:text-black transition-colors">PREV</span>
                <div className="flex gap-2">
                  <span className="w-5 h-5 rounded flex items-center justify-center bg-black text-white">1</span>
                  <span className="w-5 h-5 rounded flex items-center justify-center hover:bg-zinc-100 cursor-pointer text-black">2</span>
                  <span className="w-5 h-5 rounded flex items-center justify-center hover:bg-zinc-100 cursor-pointer text-black">3</span>
                </div>
                <span className="text-black cursor-pointer hover:text-black transition-colors">NEXT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Info */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 flex gap-4">
            <div className="w-10 h-10 bg-white border border-zinc-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <Activity className="w-5 h-5 text-zinc-700" />
            </div>
            <div>
              <p className="font-bold text-black text-sm mb-1">Printer Network Status</p>
              <p className="text-xs text-zinc-500 leading-relaxed mb-3">All manufacturing floor nodes are currently online and reachable.</p>
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider">
                <span className="text-green-600 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> ACTIVE</span>
                <span className="text-zinc-500">LATENCY: 12ms</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 flex gap-4">
            <div className="w-10 h-10 bg-white border border-zinc-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-zinc-700" />
            </div>
            <div>
              <p className="font-bold text-black text-sm mb-1">Audit Compliance</p>
              <p className="text-xs text-zinc-500 leading-relaxed mb-3">This log is cryptographically signed and immutable for 7 years.</p>
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider text-black">
                <span>ISO 9001:2015 COMPLIANT</span>
                <span className="text-zinc-500">ID: AUTH-882-990</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
