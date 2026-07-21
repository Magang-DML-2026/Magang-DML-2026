"use client";

import { FileText, Download, TrendingUp, CheckCircle, Clock, AlertCircle, Wrench } from "lucide-react";
import Link from "next/link";

import { useState } from "react";

export default function B2BDashboardClient({
  userName,
  companyName,
  b2bMetrics,
  recentPOs,
  productionTracking,
  serviceLevel
}: {
  userName: string;
  companyName: string | null;
  b2bMetrics: {
    outstandingBalance: number;
    upcomingDue: number;
    activeContracts: number;
  };
  recentPOs: any[];
  productionTracking: any[];
  serviceLevel: {
    deliveryOntime: number;
    deliveryTarget: number;
    qualityYield: number;
    inquiryResponse: number;
  };
}) {
  const [qualityDocs] = useState([
    {
      id: "iso-9001",
      name: "ISO 9001:2015",
      icon: "FileText"
    }
  ]);

  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-zinc-900 tracking-tight">
            Selamat Datang, Partner
          </h1>
          <p className="text-[13px] text-zinc-500 mt-1">
            Overview operasional dan manajemen kontrak {companyName || "PT Duta Mitra Luhur"}.
          </p>
        </div>
        <Link href="/dashboard/transactions/new" className="bg-[#cc4224] text-white px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#b0351b] transition-colors flex items-center gap-1.5 shadow-sm">
          <span className="text-lg leading-none mt-[-2px]">+</span> New Purchase Order
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Contract & Invoices + Production Tracking */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Contract & Invoices Card */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#cc4224]" />
                <h2 className="text-[16px] font-bold text-zinc-900">Contract & Invoices</h2>
              </div>
              <Link href="/dashboard/invoices" className="text-[12px] font-bold text-[#cc4224] hover:underline">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 border border-zinc-200 rounded-lg bg-zinc-50">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Outstanding Balance</p>
                <p className="text-[20px] font-black text-zinc-900">
                  Rp {(b2bMetrics.outstandingBalance / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="p-4 border border-zinc-200 rounded-lg bg-zinc-50">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Upcoming Due (7D)</p>
                <p className="text-[20px] font-black text-[#cc4224]">
                  Rp {(b2bMetrics.upcomingDue / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="p-4 border border-zinc-200 rounded-lg bg-zinc-50">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Active Contracts</p>
                <p className="text-[20px] font-black text-zinc-900">{b2bMetrics.activeContracts}</p>
              </div>
            </div>

            {/* PO Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-100/50">
                    <th className="px-4 py-3 text-[11px] font-bold text-zinc-600 border-b border-zinc-200">PO Number</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-zinc-600 border-b border-zinc-200">Product Category</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-zinc-600 border-b border-zinc-200">Amount</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-zinc-600 border-b border-zinc-200">Status</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-zinc-600 border-b border-zinc-200 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPOs.length > 0 ? recentPOs.map((po) => (
                    <tr key={po.id} className="border-b border-zinc-100 last:border-none">
                      <td className="px-4 py-4 text-[12px] font-bold text-zinc-900">{po.id}</td>
                      <td className="px-4 py-4 text-[12px]">
                        <span className="bg-zinc-100 text-zinc-600 px-2 py-1 rounded-md text-[10px] font-medium">
                          {po.productCategory || "Custom Molding"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[13px] font-bold text-zinc-900">
                        Rp {po.totalAmount.toLocaleString("id-ID")}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${
                          po.status === 'Paid' || po.status === 'Selesai' ? 'text-emerald-600' :
                          po.status === 'Overdue' || po.status === 'Unpaid' ? 'text-red-600' :
                          'text-blue-600'
                        }`}>
                          {po.status === 'Paid' || po.status === 'Selesai' ? <CheckCircle className="w-3.5 h-3.5" /> : 
                           po.status === 'Overdue' || po.status === 'Unpaid' ? <AlertCircle className="w-3.5 h-3.5" /> : 
                           <TrendingUp className="w-3.5 h-3.5" />}
                          {po.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="text-zinc-400 hover:text-[#cc4224] transition-colors">
                          <Download className="w-4 h-4 ml-auto" />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-sm text-zinc-500">
                        Belum ada Purchase Order
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Production Tracking Card */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#cc4224]" />
                <h2 className="text-[16px] font-bold text-zinc-900">Production Tracking</h2>
              </div>
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#cc4224]"></span> On Schedule</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-600"></span> Critical</span>
              </div>
            </div>

            {productionTracking.map(track => (
              <div key={track.id} className="mb-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-[14px] font-bold text-zinc-900">Batch #{track.id} - {track.batchName}</h3>
                    <p className="text-[11px] text-zinc-500">Started: {track.started} • Qty: {track.qty}</p>
                  </div>
                  <div className="px-3 py-1 bg-zinc-100 rounded-md text-[11px] font-bold text-zinc-700">
                    ETA: {track.eta}
                  </div>
                </div>
                <div className="flex items-start justify-between relative px-2 z-0">
                  <div className="absolute top-4 left-6 right-6 h-[2px] bg-zinc-200 -z-10"></div>
                  
                  {/* Calculate active progress width dynamically */}
                  <div className="absolute top-4 left-6 h-[2px] bg-[#cc4224] -z-10 transition-all duration-500"
                    style={{ width: `${(track.steps.findIndex((s: any) => s.status === 'active') >= 0 ? track.steps.findIndex((s: any) => s.status === 'active') : 0) / (track.steps.length - 1) * 100}%` }}></div>
                  
                  {track.steps.map((step: any, idx: number) => (
                    <div key={step.id} className="flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold shadow-sm relative ${
                        step.status === 'completed' || step.status === 'active' ? 'bg-[#cc4224] text-white' : 'bg-zinc-200 text-zinc-500'
                      }`}>
                        {step.status === 'active' && <span className="absolute inset-0 rounded-full border-2 border-[#cc4224] animate-ping opacity-70"></span>}
                        <span className="relative z-10">{step.id}</span>
                      </div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${
                        step.status === 'completed' || step.status === 'active' ? 'text-[#cc4224]' : 'text-zinc-400'
                      }`}>{step.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Right Column: Service Level & Docs */}
        <div className="space-y-6">
          
          {/* Service Level Card */}
          <div className="bg-[#111c2a] rounded-xl border border-zinc-800 p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 opacity-10">
              <TrendingUp className="w-48 h-48" />
            </div>
            
            <div className="flex items-center gap-2 mb-8 relative z-10">
              <TrendingUp className="w-5 h-5 text-[#cc4224]" />
              <h2 className="text-[16px] font-bold">Service Level</h2>
            </div>

            <div className="mb-8 relative z-10">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Delivery Ontime</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-[42px] font-black tracking-tight leading-none">{serviceLevel.deliveryOntime.toFixed(1)}%</h3>
              </div>
              
              <div className="w-full bg-zinc-800 h-2 rounded-full mt-4 mb-2 overflow-hidden">
                <div className="bg-[#cc4224] h-full rounded-full transition-all duration-1000" style={{ width: `${serviceLevel.deliveryOntime}%` }}></div>
              </div>
              <p className="text-[10px] text-zinc-500">Target: {serviceLevel.deliveryTarget.toFixed(1)}% (Δ {(serviceLevel.deliveryOntime - serviceLevel.deliveryTarget).toFixed(1)}%)</p>
            </div>

            <div className="h-px bg-zinc-800 w-full mb-6 relative z-10"></div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Quality Yield</p>
                <p className="text-[20px] font-bold">{serviceLevel.qualityYield.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Inquiry Resp.</p>
                <p className="text-[20px] font-bold">{serviceLevel.inquiryResponse.toFixed(1)} hrs</p>
              </div>
            </div>
          </div>

          {/* Quality Docs */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-5 h-5 text-[#cc4224]" />
              <h2 className="text-[15px] font-bold text-zinc-900">Quality Docs</h2>
            </div>

            <div className="space-y-3">
              {qualityDocs.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-3 border border-zinc-200 rounded-lg hover:border-zinc-300 hover:bg-zinc-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-zinc-100 flex items-center justify-center">
                      {doc.icon === "FileText" ? <FileText className="w-4 h-4 text-zinc-500" /> : <CheckCircle className="w-4 h-4 text-zinc-500" />}
                    </div>
                    <span className="text-[13px] font-bold text-zinc-800">{doc.name}</span>
                  </div>
                  <Download className="w-4 h-4 text-zinc-400 group-hover:text-[#cc4224]" />
                </div>
              ))}
            </div>
          </div>

          {/* Account Manager */}
          <div className="bg-zinc-100 rounded-xl p-6 border border-zinc-200">
            <p className="text-[10px] font-bold text-[#cc4224] uppercase tracking-widest mb-4">Account Manager</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80" 
                  alt="Wendy Ramadhan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-zinc-900">Wendy Ramadhan</h3>
                <p className="text-[11px] text-zinc-500">Lead Consultant</p>
              </div>
            </div>
            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="w-full py-2 bg-white border border-zinc-300 rounded-md text-[12px] font-bold text-zinc-700 hover:bg-zinc-50 transition-colors">
              Direct Message
            </button>
          </div>

        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-bold text-black">DML</span>
          <span className="text-[11px] text-zinc-500">© 2024 PT Duta Mitra Luhur. ISO 9001:2015 Certified.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-[11px] text-zinc-500 hover:text-zinc-900">Legal</Link>
          <Link href="#" className="text-[11px] text-zinc-500 hover:text-zinc-900">Privacy Policy</Link>
          <Link href="#" className="text-[11px] text-zinc-500 hover:text-zinc-900">Compliance</Link>
        </div>
      </div>
    </div>
  );
}
