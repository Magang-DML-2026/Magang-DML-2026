"use client"

import { 
  Download,
  Settings2,
  Microscope,
  Factory,
  Truck,
  ArrowUp
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {/* Active Productions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between h-[120px]">
          <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Active<br/>Productions</h3>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-[28px] font-medium text-gray-900 leading-none">24</span>
            <span className="text-sm font-bold text-[#c2410c]">+2 this week</span>
          </div>
        </div>

        {/* Open RFQs */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between h-[120px]">
          <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Open RFQs</h3>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-[28px] font-medium text-gray-900 leading-none">12</span>
            <span className="text-sm font-bold text-gray-500">Pending Review</span>
          </div>
        </div>

        {/* Efficiency Rate */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between h-[120px]">
          <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Efficiency Rate</h3>
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-[28px] font-medium text-gray-900 leading-none">94.2%</span>
            <span className="flex items-center text-sm font-bold text-emerald-600">
              <ArrowUp className="w-3.5 h-3.5 mr-0.5" strokeWidth={3} />
              0.4%
            </span>
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between h-[120px]">
          <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Quality<br/>Assurance</h3>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-[28px] font-medium text-gray-900 leading-none">99.8%</span>
            <span className="text-sm font-bold text-gray-500">Tolerance met</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Content Area (Left) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Manufacturing Pipeline Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-[17px] font-medium text-gray-800">Manufacturing Pipeline</h2>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-900 text-white text-sm font-medium rounded-md transition-colors shadow-sm">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center relative max-w-2xl mx-auto mb-4">
              {/* Connecting Line */}
              <div className="hidden sm:block absolute top-[22px] left-8 right-8 h-1 bg-gray-200 -z-10 rounded-full"></div>
              
              {/* Design */}
              <div className="flex flex-col items-center gap-3 bg-white z-10 w-24">
                <div className="w-12 h-12 rounded-full bg-[#c2410c] flex items-center justify-center text-white shadow-sm ring-8 ring-white">
                  <Settings2 className="w-5 h-5" />
                </div>
                <div className="text-center mt-1">
                  <div className="font-medium text-gray-900 text-[15px]">Design</div>
                  <div className="text-sm font-medium text-gray-500 mt-1">4 Active</div>
                </div>
              </div>

              {/* Prototype */}
              <div className="flex flex-col items-center gap-3 bg-white z-10 w-24 mt-6 sm:mt-0">
                <div className="w-12 h-12 rounded-full bg-[#c2410c] flex items-center justify-center text-white shadow-sm ring-8 ring-white">
                  <Microscope className="w-5 h-5" />
                </div>
                <div className="text-center mt-1">
                  <div className="font-medium text-gray-900 text-[15px]">Prototype</div>
                  <div className="text-sm font-medium text-gray-500 mt-1">2 Active</div>
                </div>
              </div>

              {/* Production */}
              <div className="flex flex-col items-center gap-3 bg-white z-10 w-24 mt-6 sm:mt-0">
                <div className="w-12 h-12 rounded-full bg-[#334155] flex items-center justify-center text-white shadow-sm ring-8 ring-white">
                  <Factory className="w-5 h-5" />
                </div>
                <div className="text-center mt-1">
                  <div className="font-medium text-gray-900 text-[15px]">Production</div>
                  <div className="text-sm font-medium text-gray-500 mt-1">12 Active</div>
                </div>
              </div>

              {/* Logistics */}
              <div className="flex flex-col items-center gap-3 bg-white z-10 w-24 mt-6 sm:mt-0 opacity-50">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 shadow-sm ring-8 ring-white">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="text-center mt-1">
                  <div className="font-medium text-gray-400 text-[15px]">Logistics</div>
                  <div className="text-sm font-medium text-gray-400 mt-1">Queue Empty</div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#fcfcfd] border-b border-gray-100 text-gray-900 font-bold">
                  <tr>
                    <th className="px-6 py-5 w-[140px]">ID</th>
                    <th className="px-6 py-5">Client</th>
                    <th className="px-6 py-5">Product<br/>Line</th>
                    <th className="px-6 py-5 text-center">Status</th>
                    <th className="px-6 py-5">Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-600">#DML-<br/>8921</td>
                    <td className="px-6 py-5 font-medium text-gray-900">AutoCorp<br/>Gmbh</td>
                    <td className="px-6 py-5 font-medium text-gray-700">Vibration<br/>Mounts</td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffedd5] text-[#c2410c] text-[11px] font-bold tracking-wide">
                        Processing
                      </span>
                    </td>
                    <td className="px-6 py-5 font-medium text-gray-900">65%</td>
                  </tr>
                  
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-600">#DML-<br/>8919</td>
                    <td className="px-6 py-5 font-medium text-gray-900">Global<br/>Hydraulics</td>
                    <td className="px-6 py-5 font-medium text-gray-700">Sealing<br/>Gaskets</td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-bold tracking-wide">
                        Shipped
                      </span>
                    </td>
                    <td className="px-6 py-5 font-medium text-gray-900">100%</td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-600">#DML-<br/>8914</td>
                    <td className="px-6 py-5 font-medium text-gray-900">Nexo<br/>Energy</td>
                    <td className="px-6 py-5 font-medium text-gray-700">Custom<br/>Extrusion</td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold tracking-wide">
                        Design
                      </span>
                    </td>
                    <td className="px-6 py-5 font-medium text-gray-900">12%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Live Feed Card (Right) */}
        <div className="lg:col-span-4">
          <div className="relative h-[650px] rounded-2xl overflow-hidden shadow-md group">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-[#1e293b]">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            </div>
            
            {/* Gradient Overlay for bottom text */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f172a] to-transparent"></div>

            {/* Live Feed Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2 py-1 bg-[#dc2626] rounded text-white text-[10px] font-bold tracking-widest uppercase">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              LIVE FEED: FLOOR A2
            </div>

            {/* Bottom Status Content */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[15px] font-medium text-white mb-3">Machine Stability: High</p>
              
              <div className="flex gap-2">
                <div className="h-1 flex-1 bg-[#c2410c] rounded-full"></div>
                <div className="h-1 flex-1 bg-[#c2410c] rounded-full"></div>
                <div className="h-1 flex-1 bg-[#c2410c] rounded-full"></div>
                <div className="h-1 flex-1 bg-white/20 rounded-full"></div>
                <div className="h-1 flex-1 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
