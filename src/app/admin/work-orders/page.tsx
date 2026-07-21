"use client"

import { useState } from "react"
import { 
  Download,
  Plus,
  SlidersHorizontal,
  LayoutGrid,
  List,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  CheckCircle2,
  RefreshCw,
  AlertCircle
} from "lucide-react"

export default function PendingWorkOrdersPage() {
  const [activeTab, setActiveTab] = useState("Active")
  const [showFilters, setShowFilters] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }, 1500)
  }

  const activeOrders = [
    { id: "WO-2023-9812", clientInitials: "T", clientBg: "bg-[#0f172a]", clientName: "Translogistics Corp.", product: "Custom Engine Gaskets", qty: "5,000 Units", status: "IN PRODUCTION", statusBg: "bg-[#ffedd5]", statusColor: "text-[#c2410c]", statusDot: "bg-[#c2410c]" },
    { id: "WO-2023-9844", clientInitials: "G", clientBg: "bg-[#e06822]", clientName: "Global Heavy Mach.", product: "High-Pressure Seals", qty: "12,500 Units", status: "FINAL QC", statusBg: "bg-blue-50", statusColor: "text-blue-600", statusDot: "bg-blue-500", hasIcon: true },
    { id: "WO-2023-9851", clientInitials: "A", clientBg: "bg-gray-200 text-gray-700", clientName: "AeroSpace Systems", product: "Vibration Dampeners", qty: "2,200 Units", status: "IN PRODUCTION", statusBg: "bg-[#ffedd5]", statusColor: "text-[#c2410c]", statusDot: "bg-[#c2410c]" },
    { id: "WO-2023-9877", clientInitials: "N", clientBg: "bg-[#0f172a]", clientName: "Nordic Power Tech", product: "Insulated Bushings", qty: "850 Units", status: "FINAL QC", statusBg: "bg-blue-50", statusColor: "text-blue-600", statusDot: "bg-blue-500", hasIcon: true },
    { id: "WO-2023-9902", clientInitials: "S", clientBg: "bg-[#e06822]", clientName: "Solaris Energy", product: "UV-Resistant O-Rings", qty: "15,000 Units", status: "IN PRODUCTION", statusBg: "bg-[#ffedd5]", statusColor: "text-[#c2410c]", statusDot: "bg-[#c2410c]" },
  ]

  const pausedOrders = [
    { id: "#WO-2024-8812", clientInitials: "AI", clientBg: "bg-gray-200 text-gray-700", clientName: "AutoIndustries Ltd.", product: "Custom Molding", qty: "12,500 Units", status: "ON HOLD", statusBg: "bg-red-50", statusColor: "text-red-600", statusDot: "bg-red-500", date: "Oct 12, 2024" },
    { id: "#WO-2024-8845", clientInitials: "GP", clientBg: "bg-gray-200 text-gray-700", clientName: "Global Polymers", product: "Extrusion Seal", qty: "4,200 Meters", status: "QUEUED", statusBg: "bg-yellow-50", statusColor: "text-yellow-700", statusDot: "bg-yellow-500", date: "Oct 15, 2024" },
    { id: "#WO-2024-8851", clientInitials: "TH", clientBg: "bg-gray-200 text-gray-700", clientName: "TechHydraulic Inc.", product: "O-Rings", qty: "50,000 Units", status: "ON HOLD", statusBg: "bg-red-50", statusColor: "text-red-600", statusDot: "bg-red-500", date: "Oct 18, 2024" },
    { id: "#WO-2024-8860", clientInitials: "NS", clientBg: "bg-gray-200 text-gray-700", clientName: "North Star Eng.", product: "Rubber Gaskets", qty: "8,000 Units", status: "QUEUED", statusBg: "bg-yellow-50", statusColor: "text-yellow-700", statusDot: "bg-yellow-500", date: "Oct 20, 2024" },
  ]

  const currentOrders = activeTab === "Paused" ? pausedOrders : activeOrders;

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12 relative min-h-[800px]">
      
      {/* Toast Notification (Proses Ekspor Laporan) */}
      {showToast && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="flex items-center gap-3 px-4 py-3 bg-black text-white rounded-lg shadow-xl">
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold pr-8 border-b border-white">Report successfully exported</span>
            <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-white transition-colors absolute right-4">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="mb-8">
        <div className="text-xs font-bold text-gray-500 tracking-wider mb-3">
          Dashboard / <span className="text-[#b73719]">Pending Work Orders</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Pending Work Orders</h1>
            <p className="text-[15px] text-gray-500 font-medium">
              Manage and monitor manufacturing queues for rubber molding and extrusion lines.
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-lg transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isExporting ? "Exporting..." : "Export CSV"}
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-black hover:bg-gray-900 text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              Create Order
            </button>
          </div>
        </div>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Total Pending</h3>
          <div className="text-[32px] font-bold text-gray-900 leading-none mb-3">128</div>
          <p className="text-xs font-bold text-[#c2410c]">↗ +12% from last week</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">In Production</h3>
          <div className="text-[32px] font-bold text-gray-900 leading-none mb-3">42</div>
          <p className="text-xs font-bold text-blue-600 flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Active Lines: 6
          </p>
        </div>

        <div className="bg-white rounded-xl border-2 border-[#e06822] shadow-sm p-6 relative">
          {/* Active Tab indicator style from mockup */}
          <div className="absolute top-0 left-0 w-1 h-full bg-[#e06822] rounded-l-xl"></div>
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 pl-2">Paused/Queued</h3>
          <div className="text-[32px] font-bold text-[#e06822] leading-none mb-3 pl-2">54</div>
          <p className="text-xs font-bold text-gray-500 pl-2">Awaiting Material/QA</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Avg. Lead Time</h3>
          <div className="text-[32px] font-bold text-gray-900 leading-none mb-3">8.2 <span className="text-lg">Days</span></div>
          <p className="text-xs font-bold text-emerald-600">✓ -0.5 Days Target</p>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex bg-gray-50 border border-gray-200 rounded-full p-1 w-max">
            <button 
              onClick={() => setActiveTab("All Orders")}
              className={`px-6 py-2 text-xs font-bold rounded-full transition-all ${activeTab === "All Orders" ? "bg-[#e06822] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
            >
              All Orders
            </button>
            <button 
              onClick={() => setActiveTab("Active")}
              className={`px-6 py-2 text-xs font-bold rounded-full transition-all ${activeTab === "Active" ? "bg-[#e06822] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
            >
              Active
            </button>
            <button 
              onClick={() => setActiveTab("Paused")}
              className={`px-6 py-2 text-xs font-bold rounded-full transition-all ${activeTab === "Paused" ? "bg-[#e06822] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
            >
              Paused
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
              <button className="p-1.5 bg-white text-gray-900 shadow-sm rounded-md"><List className="w-4 h-4" /></button>
              <button className="p-1.5 text-gray-400 hover:text-gray-900"><LayoutGrid className="w-4 h-4" /></button>
            </div>
            
            <button 
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-gray-900"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Advanced Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#fcfcfd] border-b border-gray-100 text-gray-500 font-bold text-[11px] tracking-widest uppercase">
              <tr>
                <th className="px-6 py-5">Order ID</th>
                <th className="px-6 py-5">Client Name</th>
                <th className="px-6 py-5">Product Type</th>
                <th className="px-6 py-5">Quantity</th>
                <th className="px-6 py-5">Status</th>
                {activeTab === "Paused" && <th className="px-6 py-5">Due Date</th>}
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentOrders.map((order, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6 font-bold text-gray-900">{order.id}</td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded bg-[#1e293b] text-white flex items-center justify-center font-bold text-xs ${order.clientBg.includes('bg-') ? order.clientBg : ''}`}>
                        {order.clientInitials}
                      </div>
                      <span className="font-bold text-gray-900">{order.clientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium">{order.product}</span>
                      {activeTab === "Paused" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold mt-1.5 w-max">
                          {order.product.includes("Extrusion") ? "Extrusion Seal" : order.product.includes("Molding") ? "Custom Molding" : order.product.includes("Gaskets") ? "Rubber Gaskets" : "O-Rings"}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6 font-medium text-gray-900">{order.qty}</td>
                  <td className="px-6 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold ${order.statusBg} ${order.statusColor}`}>
                      {/* @ts-ignore */}
                      {order.hasIcon && <RefreshCw className="w-3 h-3" />}
                      {/* @ts-ignore */}
                      {!order.hasIcon && <span className={`w-1.5 h-1.5 rounded-full ${order.statusDot}`}></span>}
                      {order.status}
                    </span>
                  </td>
                  {activeTab === "Paused" && (
                    <td className="px-6 py-6 font-medium text-gray-700">
                      {/* @ts-ignore */}
                      {order.date?.split(',')[0]}<br/>
                      {/* @ts-ignore */}
                      {order.date?.split(',')[1]}
                    </td>
                  )}
                  <td className="px-6 py-6 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-gray-500">
          <div>Showing {currentOrders.length} of {activeTab === "Paused" ? 54 : 32} {activeTab.toLowerCase()} work orders</div>
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-400 hover:text-gray-900"><ChevronLeft className="w-4 h-4" /></button>
            <div className="w-6 h-6 rounded flex items-center justify-center bg-black text-white font-bold">1</div>
            <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-200 text-gray-700 font-bold cursor-pointer">2</div>
            <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-200 text-gray-700 font-bold cursor-pointer">3</div>
            <button className="p-1 text-gray-400 hover:text-gray-900"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Bottom Section (Screenshot 4 style) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-[#0f172a] rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center">
           <div className="absolute top-0 right-0 p-8 opacity-10">
             <AlertCircle className="w-48 h-48" />
           </div>
           
           <div className="relative z-10">
             <div className="inline-flex px-3 py-1 bg-[#c2410c] text-white text-[10px] font-bold rounded-full uppercase tracking-wider mb-4">
               QUEUE ALERT
             </div>
             <h2 className="text-2xl font-bold text-white mb-3">Material Shortage Warning</h2>
             <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 max-w-sm">
               32% of paused orders are due to delayed EPDM rubber shipments. Production Line #4 will remain idle until next Wednesday.
             </p>
             <button className="px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-900 text-sm font-bold rounded-lg transition-colors w-max">
               View Supply Logistics
             </button>
           </div>
        </div>

        <div className="bg-[#f8f9fa] rounded-2xl border border-gray-200 p-8">
           <h2 className="text-xl font-bold text-gray-900 mb-8">Line Capacity</h2>
           
           <div className="space-y-6">
             <div>
               <div className="flex justify-between items-end mb-2">
                 <span className="text-sm font-bold text-gray-700">Molding A</span>
                 <span className="text-xs font-bold text-gray-900">88%</span>
               </div>
               <div className="w-full h-2 bg-gray-200 rounded-full">
                 <div className="w-[88%] h-full bg-[#c2410c] rounded-full"></div>
               </div>
             </div>

             <div>
               <div className="flex justify-between items-end mb-2">
                 <span className="text-sm font-bold text-gray-700">Extrusion B</span>
                 <span className="text-xs font-bold text-gray-900">12%</span>
               </div>
               <div className="w-full h-2 bg-gray-200 rounded-full">
                 <div className="w-[12%] h-full bg-red-500 rounded-full"></div>
               </div>
               <p className="text-xs font-medium text-gray-500 mt-3 max-w-xs leading-relaxed">
                 Line B efficiency dropped by 14% due to cooling system maintenance.
               </p>
             </div>
           </div>
        </div>

      </div>

      {/* Advanced Filters Modal (Filter Lanjutan) */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Advanced Filters</h2>
              <button onClick={() => setShowFilters(false)} className="p-1 text-gray-400 hover:text-gray-900 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-2">Client Name</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search clients..." className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:border-[#c2410c]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-3">Product Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#c2410c] focus:ring-[#c2410c]" />
                    <span className="text-sm font-medium text-gray-700">Molding</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#c2410c] focus:ring-[#c2410c]" />
                    <span className="text-sm font-medium text-gray-700">Extrusion</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#c2410c] focus:ring-[#c2410c]" />
                    <span className="text-sm font-medium text-gray-700">Seals</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#c2410c] focus:ring-[#c2410c]" />
                    <span className="text-sm font-medium text-gray-700">Gaskets</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">From Date</label>
                  <input type="text" placeholder="mm/dd/yyyy" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:border-[#c2410c]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">To Date</label>
                  <input type="text" placeholder="mm/dd/yyyy" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:border-[#c2410c]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-2">Order Priority</label>
                <div className="flex bg-white border border-gray-300 rounded-md overflow-hidden">
                  <button className="flex-1 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border-r border-gray-300">Low</button>
                  <button className="flex-1 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border-r border-gray-300">Medium</button>
                  <button className="flex-1 py-2 text-sm font-bold text-[#c2410c] bg-[#ffedd5]">High</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-2">Production Line</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:border-[#c2410c]">
                  <option>All Lines</option>
                  <option>Molding A</option>
                  <option>Extrusion B</option>
                </select>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
              <button 
                onClick={() => setShowFilters(false)}
                className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-lg transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                className="px-6 py-2.5 bg-[#c2410c] hover:bg-[#a3360a] text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button for mockup accuracy if needed */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#c2410c] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform z-40 lg:hidden">
        <Plus className="w-6 h-6" />
      </button>

    </div>
  )
}
