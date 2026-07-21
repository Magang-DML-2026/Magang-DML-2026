"use client"

import { 
  Filter, 
  Download, 
  RefreshCw,
  Activity,
  AlertTriangle,
  User,
  Database,
  CheckCircle2,
  XCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Globe
} from "lucide-react"

export default function ActivityLogsPage() {
  const logs = [
    {
      time: "Oct 24, 2023\n14:22:15.003",
      actorIcon: <ShieldCheck className="w-4 h-4 text-gray-500" />,
      actor: "Admin_DML_01",
      action: "STATUS UPDATE",
      actionBg: "bg-[#ffedd5]",
      actionColor: "text-[#c2410c]",
      details: "Changed Order #RFQ-9921 from 'Pending' to 'In Production'",
      status: "success"
    },
    {
      time: "Oct 24, 2023\n14:18:42.912",
      actorIcon: <Settings className="w-4 h-4 text-white" />,
      actorBg: "bg-[#0f172a]",
      actor: "System_Automator",
      action: "BATCH_PROC",
      actionBg: "bg-gray-200",
      actionColor: "text-gray-700",
      details: "Inventory sync completed for Raw Rubber Grade-A (Warehouse 4)",
      status: "success"
    },
    {
      time: "Oct 24, 2023\n14:05:01.330",
      actorIcon: <User className="w-4 h-4 text-gray-500" />,
      actor: "B_Wijaya_Ops",
      action: "AUTH_FAILURE",
      actionBg: "bg-red-100",
      actionColor: "text-red-700",
      details: "Failed login attempt from IP: 192.168.1.104 (3rd retry)",
      status: "error"
    },
    {
      time: "Oct 24, 2023\n13:59:12.000",
      actorIcon: <Globe className="w-4 h-4 text-gray-500" />,
      actor: "External_API",
      action: "NEW RFQ",
      actionBg: "bg-[#0f172a]",
      actionColor: "text-white",
      details: "Client AutoPart Indo submitted new quote for Molding (3,000 units)",
      status: "success"
    },
    {
      time: "Oct 24, 2023\n13:45:30.551",
      actorIcon: <ShieldCheck className="w-4 h-4 text-gray-500" />,
      actor: "Admin_DML_Master",
      action: "CONFIG_CHANGE",
      actionBg: "bg-gray-200",
      actionColor: "text-gray-700",
      details: "Updated global shipping surcharge rates for 'Express Delivery'",
      status: "success"
    }
  ]

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      
      {/* Breadcrumb & Header */}
      <div className="mb-8">
        <div className="text-xs font-bold text-gray-500 tracking-wider mb-3">
          Admin Portal / <span className="text-gray-900">System Activity Logs</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Activity Logs</h1>
            <p className="text-[15px] text-gray-500 font-medium">
              Monitor manufacturing processes, user actions, and system health in real-time.
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-lg transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-lg transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-black hover:bg-gray-900 text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#0f172a] text-white flex items-center justify-center shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-[#c2410c]">+12%</span>
          </div>
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 mt-auto">TOTAL EVENTS (24H)</h3>
          <div className="text-[28px] font-bold text-gray-900 leading-none">14,292</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#ffedd5] text-[#c2410c] flex items-center justify-center shadow-sm">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-red-600">+2 alert</span>
          </div>
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 mt-auto">CRITICAL ERRORS</h3>
          <div className="text-[28px] font-bold text-gray-900 leading-none">3</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center shadow-sm">
              <User className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-gray-400">Active Now</span>
          </div>
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 mt-auto">ADMIN ACTIONS</h3>
          <div className="text-[28px] font-bold text-gray-900 leading-none">84</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#0f172a] text-white flex items-center justify-center shadow-sm">
              <Database className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-gray-900">99.9%</span>
          </div>
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 mt-auto">SYSTEM UPTIME</h3>
          <div className="text-[28px] font-bold text-gray-900 leading-none">Active</div>
        </div>

      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-[15px] font-bold text-gray-900">Real-time Stream</h2>
            <div className="w-2 h-2 rounded-full bg-[#c2410c] animate-pulse"></div>
          </div>

          <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-1 w-max">
            <button className="px-4 py-1.5 text-xs font-bold rounded-md bg-white text-gray-900 shadow-sm">All Logs</button>
            <button className="px-4 py-1.5 text-xs font-bold rounded-md text-gray-500 hover:text-gray-900">Security</button>
            <button className="px-4 py-1.5 text-xs font-bold rounded-md text-gray-500 hover:text-gray-900">Manufacturing</button>
            <button className="px-4 py-1.5 text-xs font-bold rounded-md text-gray-500 hover:text-gray-900">System</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#0f172a] text-white font-bold text-[11px] tracking-widest uppercase">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Actor</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4 w-1/2">Details</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-bold text-gray-900">{log.time.split('\n')[0]}</div>
                    <div className="text-[11px] text-gray-500 font-medium">{log.time.split('\n')[1]}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center ${log.actorBg || 'bg-gray-100'}`}>
                        {log.actorIcon}
                      </div>
                      <span className="font-bold text-gray-900">{log.actor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded ${log.actionBg} ${log.actionColor} text-[10px] font-bold tracking-widest uppercase`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-gray-700 font-medium whitespace-normal line-clamp-1 max-w-lg">
                      {log.details.includes('#RFQ-9921') ? (
                        <>Changed Order <span className="font-bold">#RFQ-9921</span> from 'Pending' to 'In Production'</>
                      ) : log.details.includes('AutoPart Indo') ? (
                        <>Client <span className="font-bold">AutoPart Indo</span> submitted new quote for Molding (3,000 units)</>
                      ) : log.details.includes('Raw Rubber Grade-A') ? (
                        <>Inventory sync completed for <span className="font-bold">Raw Rubber Grade-A</span> (Warehouse 4)</>
                      ) : (
                        log.details
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    {log.status === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between text-xs font-medium text-gray-500">
          <div>Showing 1 - 25 of 1,402 entries</div>
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-400 hover:text-gray-900"><ChevronLeft className="w-4 h-4" /></button>
            <div className="w-6 h-6 rounded flex items-center justify-center bg-black text-white font-bold">1</div>
            <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 text-gray-700 font-bold cursor-pointer">2</div>
            <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 text-gray-700 font-bold cursor-pointer">3</div>
            <div className="px-1 text-gray-400">...</div>
            <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 text-gray-700 font-bold cursor-pointer">56</div>
            <button className="p-1 text-gray-400 hover:text-gray-900"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Hourly Activity Volume */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col">
          <h2 className="text-[15px] font-bold text-gray-900 mb-8">Hourly Activity Volume</h2>
          
          <div className="flex-1 min-h-[150px] relative border-b border-gray-100">
            {/* Empty state representing the blank chart area */}
          </div>
          
          <div className="flex justify-between text-xs font-bold text-gray-400 mt-4 px-4">
            <span>08:00</span>
            <span>10:00</span>
            <span>12:00</span>
            <span>14:00</span>
            <span>16:00</span>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-[#0f172a] rounded-2xl p-8 relative overflow-hidden flex flex-col">
          <div className="absolute right-0 bottom-0 opacity-5 w-48 h-48 translate-x-1/4 translate-y-1/4">
            <ShieldCheck className="w-full h-full" />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <h2 className="text-[15px] font-bold text-white mb-2">Active Sessions</h2>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-[40px] font-bold text-white leading-none">18</span>
              <span className="text-xs font-medium text-gray-400">Users currently online</span>
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-gray-300">Production Manager (K. Hartono)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-gray-300">Inventory Controller (S. Devi)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium text-gray-400">Logistics Lead (A. Pratama) - Idle</span>
              </div>
            </div>

            <button className="mt-auto w-full py-3 bg-[#64748b] hover:bg-[#475569] text-white text-sm font-bold rounded-lg transition-colors">
              Manage Permissions
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
