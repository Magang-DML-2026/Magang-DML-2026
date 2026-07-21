"use client"

import { 
  Calendar,
  Download,
  TrendingUp,
  Activity,
  MoreVertical,
  BookOpen,
  Settings,
  Users
} from "lucide-react"

export default function PreviewDashboardPage() {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight mb-2">Operations Overview</h1>
          <p className="text-[15px] text-gray-500 font-medium">
            Real-time monitoring of PT Duta Mitra Luhur manufacturing performance.
          </p>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-lg transition-colors shadow-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] hover:bg-black text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Left Column - Small Metrics */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Total Production */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#ffedd5] text-[#e06822] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-[#e06822]">+12.5%</span>
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-500 mb-1">Total Production</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[32px] font-black text-gray-900 leading-none">48.2k</span>
                <span className="text-lg font-bold text-gray-900">kg</span>
              </div>
            </div>
          </div>

          {/* Machine Uptime */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#eff6ff] text-[#3b82f6] flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-gray-700">Active</span>
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-500 mb-1">Machine Uptime</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[32px] font-black text-gray-900 leading-none">94.8</span>
                <span className="text-lg font-bold text-gray-900">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Chart Area */}
        <div className="lg:col-span-6 bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
            <h2 className="text-lg font-bold text-gray-900">Inventory Fluctuations</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#e06822]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#0f172a]"></div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[250px]">
             <p className="text-[15px] font-bold text-[#475569] mb-1">Interactive Supply Data</p>
             <p className="text-[13px] font-medium text-[#64748b]">Real-time stock level synchronization</p>
          </div>
        </div>

        {/* Right Column - System Alerts */}
        <div className="lg:col-span-3 bg-[#0f172a] rounded-xl shadow-lg p-6 flex flex-col text-white">
          <h2 className="text-[22px] font-bold mb-6">System Alerts</h2>
          
          <div className="space-y-6 flex-1">
            <div className="relative pl-4 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-[#e06822]">
              <h3 className="text-[13px] font-medium text-gray-300">Molding Div</h3>
              <p className="text-[14.5px] font-bold text-white mt-0.5 leading-tight">Batch #8822 QC Completed</p>
              <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-widest">2 Mins Ago</p>
            </div>
            
            <div className="relative pl-4 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-[#3b82f6]">
              <h3 className="text-[13px] font-medium text-gray-300">Logistics</h3>
              <p className="text-[14.5px] font-bold text-white mt-0.5 leading-tight">New RFQ from Global Auto Co.</p>
              <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-widest">14 Mins Ago</p>
            </div>
          </div>

          <button className="w-full mt-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[13px] font-bold rounded-lg transition-colors">
            View All logs
          </button>
        </div>

      </div>

      {/* Pending Work Orders */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-[22px] font-bold text-gray-900">Pending Work Orders</h2>
          <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-1">
            <button className="px-4 py-1.5 text-xs font-bold bg-white text-gray-900 shadow-sm rounded-md">All</button>
            <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900">Active</button>
            <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900">Paused</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#fcfcfd] border-b border-gray-100 text-gray-600 font-bold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Client Entity</th>
                <th className="px-6 py-4">Product Category</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Row 1 */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 font-medium text-gray-700">#DML-2024-001</td>
                <td className="px-6 py-5 font-medium text-gray-900">Mitra Automotive Ind.</td>
                <td className="px-6 py-5">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">Rubber Molding</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#dc2626]"></div>
                    <span className="font-semibold text-gray-900">High</span>
                  </div>
                </td>
                <td className="px-6 py-5 font-medium text-gray-700">
                  24 Oct<br/>2024
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1.5 bg-[#ffedd5] text-[#c2410c] text-[10px] font-bold rounded-full uppercase tracking-wider text-center block w-max">
                    In Production
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-1 text-gray-400 hover:text-gray-700">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 font-medium text-gray-700">#DML-2024-002</td>
                <td className="px-6 py-5 font-medium text-gray-900">Luhur Construction Group</td>
                <td className="px-6 py-5">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">Extrusion</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></div>
                    <span className="font-semibold text-gray-900">Medium</span>
                  </div>
                </td>
                <td className="px-6 py-5 font-medium text-gray-700">
                  28 Oct<br/>2024
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full uppercase tracking-wider text-center block w-max">
                    Queued
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-1 text-gray-400 hover:text-gray-700">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 font-medium text-gray-700">#DML-2024-003</td>
                <td className="px-6 py-5 font-medium text-gray-900">Global Marine Corp.</td>
                <td className="px-6 py-5">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">Seals & Gaskets</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    <span className="font-semibold text-gray-900">Low</span>
                  </div>
                </td>
                <td className="px-6 py-5 font-medium text-gray-700">
                  02 Nov<br/>2024
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1.5 bg-[#dbeafe] text-[#1d4ed8] text-[10px] font-bold rounded-full uppercase tracking-wider text-center block w-max">
                    Final QC
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-1 text-gray-400 hover:text-gray-700">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Manufacturing Guide */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-16 h-16 rounded-lg bg-gray-100 shrink-0 overflow-hidden relative border border-gray-200">
             <div className="absolute inset-0 bg-[#334155] opacity-20 mix-blend-multiply"></div>
             <div className="absolute inset-0 flex items-center justify-center text-gray-500">
               <BookOpen className="w-6 h-6" />
             </div>
          </div>
          <div>
            <h3 className="text-[14.5px] font-bold text-gray-900 mb-1">Manufacturing Guide</h3>
            <p className="text-xs font-medium text-gray-500 leading-relaxed">
              Update the documentation for the new molding process ISO standards.
            </p>
          </div>
        </div>

        {/* Machine Maintenance */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-16 h-16 rounded-lg bg-gray-100 shrink-0 overflow-hidden relative border border-gray-200">
             <div className="absolute inset-0 bg-[#b73719] opacity-20 mix-blend-multiply"></div>
             <div className="absolute inset-0 flex items-center justify-center text-gray-500">
               <Settings className="w-6 h-6" />
             </div>
          </div>
          <div>
            <h3 className="text-[14.5px] font-bold text-gray-900 mb-1">Machine Maintenance</h3>
            <p className="text-xs font-medium text-gray-500 leading-relaxed">
              Scheduled downtime for the main extrusion line on weekend shift A.
            </p>
          </div>
        </div>

        {/* HR Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-16 h-16 rounded-lg bg-[#f05c35] text-white shrink-0 flex items-center justify-center shadow-inner">
             <Users className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-[14.5px] font-bold text-gray-900 mb-1">HR Notifications</h3>
            <p className="text-xs font-medium text-gray-500 leading-relaxed">
              3 New operator applications pending review in the HR portal.
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}
