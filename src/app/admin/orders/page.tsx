"use client"

import { useState, useRef, useEffect } from "react"
import { 
  ListFilter, 
  Download,
  Search,
  ChevronDown,
  Calendar,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  PackageSearch,
  CheckCircle2,
  X,
  Eye,
  Edit2,
  DownloadCloud,
  RefreshCw,
  Check,
  ChevronUp
} from "lucide-react"
import { UpdateStatusModal } from "../../../components/admin/UpdateStatusModal"

export default function OrdersPage() {
  const [isExporting, setIsExporting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null)
  
  const [modalOrderId, setModalOrderId] = useState<string | null>(null)
  
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [orderType, setOrderType] = useState("All")

  const statusDropdownRef = useRef<HTMLDivElement>(null)
  const actionMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false)
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setOpenActionMenuId(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }, 1000)
  }

  const toggleActionMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenActionMenuId(openActionMenuId === id ? null : id)
  }

  const statuses = ["All Statuses", "Paid", "Pending", "Overdue", "Processing", "Shipped"]

  const orders = [
    {
      id: "#DML-2023-981",
      date: "Sep 14, 2023",
      clientInitials: "IN",
      clientBg: "bg-[#1f2937]", // Dark slate
      clientColor: "text-white",
      clientName: "Indo Rubber Corp",
      clientType: "Enterprise B2B",
      type: "BULK",
      category: "Molding",
      amount: "Rp 145,200,000",
      status: "PAID",
      statusBg: "bg-emerald-50",
      statusColor: "text-emerald-600",
      statusDot: "bg-emerald-500"
    },
    {
      id: "#DML-2023-982",
      date: "Sep 14, 2023",
      clientInitials: "RT",
      clientBg: "bg-[#ea580c]", // Orange
      clientColor: "text-white",
      clientName: "Adi Wijaya",
      clientType: "Retail B2C",
      type: "UNIT",
      category: "Extrusion",
      amount: "Rp 2,450,000",
      status: "PENDING",
      statusBg: "bg-amber-50",
      statusColor: "text-[#ea580c]",
      statusDot: "bg-[#ea580c]"
    },
    {
      id: "#DML-2023-983",
      date: "Sep 13, 2023",
      clientInitials: "TL",
      clientBg: "bg-black",
      clientColor: "text-white",
      clientName: "Tunas Logistik PT",
      clientType: "Regular B2B",
      type: "BATCH",
      category: "Custom Seal",
      amount: "Rp 67,800,000",
      status: "PAID",
      statusBg: "bg-emerald-50",
      statusColor: "text-emerald-600",
      statusDot: "bg-emerald-500"
    }
  ]

  return (
    <div className="relative min-h-[calc(100vh-136px)]">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="flex items-center gap-3 px-4 py-3 bg-black text-white rounded-lg shadow-xl">
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold pr-8 border-b border-white">Laporan berhasil diekspor</span>
            <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-white transition-colors absolute right-4">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">All Orders</h1>
            <p className="text-gray-500 font-medium text-sm">Manage and track all B2B and B2C transactions</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#f4f5f6] hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-lg border border-gray-200 transition-colors shadow-sm"
            >
              <ListFilter className="w-4 h-4" />
              Filters
            </button>
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-900 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm disabled:opacity-70"
            >
              <Download className="w-4 h-4" />
              {isExporting ? "Exporting..." : "Export CSV"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible flex flex-col">
          {/* Toolbar */}
          <div className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center bg-white rounded-t-xl">
            <div className="relative w-full max-w-[500px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by Order ID, Client, or Category..." 
                className="w-full pl-10 pr-4 py-2.5 bg-[#f4f5f6] rounded-lg text-sm font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-3 relative">
              <div className="relative" ref={statusDropdownRef}>
                <button 
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className={`flex items-center gap-2 px-4 py-2.5 bg-[#f4f5f6] hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors shadow-sm min-w-[140px] justify-between ${showStatusDropdown ? 'border-gray-300 ring-1 ring-gray-200' : ''}`}
                >
                  {selectedStatus}
                  {showStatusDropdown ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                {showStatusDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    {statuses.map(status => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status)
                          setShowStatusDropdown(false)
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center justify-between hover:bg-gray-50 transition-colors ${selectedStatus === status ? 'text-[#b73719] bg-[#fdf5f3]' : 'text-gray-700'}`}
                      >
                        {status}
                        {selectedStatus === status && <Check className="w-4 h-4 text-[#b73719]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="flex flex-col items-center justify-center px-4 py-1.5 bg-[#f4f5f6] hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors shadow-sm min-w-[90px]">
                Last
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Calendar className="w-3.5 h-3.5" />
                  30 Days
                </div>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#f4f5f6] text-gray-500 font-bold border-y border-gray-200 text-[11px] tracking-widest">
                <tr>
                  <th className="px-6 py-4 uppercase">Order ID</th>
                  <th className="px-6 py-4 uppercase">Date</th>
                  <th className="px-6 py-4 uppercase">Client / Entity</th>
                  <th className="px-6 py-4 uppercase">Type</th>
                  <th className="px-6 py-4 uppercase">Category</th>
                  <th className="px-6 py-4 uppercase text-right">Amount</th>
                  <th className="px-6 py-4 uppercase text-center">Status</th>
                  <th className="px-4 py-4 w-[60px]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group relative">
                    <td className="px-6 py-5">
                      <div className="font-bold text-gray-900">{order.id}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs text-gray-500 font-medium">{order.date}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-md ${order.clientBg} ${order.clientColor} flex items-center justify-center font-bold text-xs`}>
                          {order.clientInitials}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{order.clientName}</div>
                          <div className="text-[11px] text-gray-500 font-medium">{order.clientType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-[10px] font-bold tracking-wider">
                        {order.type}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-gray-700 font-medium text-sm">
                        {order.category}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="font-bold text-gray-900 text-sm">
                        {order.amount}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${order.statusBg} ${order.statusColor} text-[10px] font-bold tracking-widest uppercase`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${order.statusDot}`}></span>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-right relative">
                      <button 
                        onClick={(e) => toggleActionMenu(order.id, e)}
                        className="p-1.5 rounded-md text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {openActionMenuId === order.id && (
                        <div ref={actionMenuRef} className="absolute right-8 top-10 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-10 animate-in fade-in zoom-in-95 duration-100">
                          <button className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                            View Details
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                            <Edit2 className="w-4 h-4 text-gray-400" />
                            Edit Order
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                            <DownloadCloud className="w-4 h-4 text-gray-400" />
                            Download Invoice
                          </button>
                          <div className="h-px bg-gray-100 my-1"></div>
                          <button 
                            onClick={() => {
                              setModalOrderId(order.id)
                              setOpenActionMenuId(null)
                            }}
                            className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                          >
                            <RefreshCw className="w-4 h-4 text-gray-400" />
                            Update Status
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between rounded-b-xl">
            <p className="text-xs text-gray-500 font-medium">
              Showing 1-3 of 128 orders
            </p>
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalOrderId && (
        <UpdateStatusModal 
          orderId={modalOrderId} 
          onClose={() => setModalOrderId(null)} 
        />
      )}

      {/* Advanced Filters Sidebar Overlay */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end animate-in fade-in duration-200">
          <div className="w-[400px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Advanced Filters</h2>
              <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Date Range */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date Range</label>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="mm/dd/yyyy" className="w-full px-3 py-2 bg-[#f4f5f6] border-none rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200" />
                  <input type="text" placeholder="mm/dd/yyyy" className="w-full px-3 py-2 bg-[#f4f5f6] border-none rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200" />
                </div>
              </div>

              {/* Order Type */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Order Type</label>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setOrderType("All")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors border ${orderType === "All" ? "bg-[#e06822] text-white border-[#e06822]" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setOrderType("B2B")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors border ${orderType === "B2B" ? "bg-[#e06822] text-white border-[#e06822]" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}
                  >
                    B2B
                  </button>
                  <button 
                    onClick={() => setOrderType("B2C")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors border ${orderType === "B2C" ? "bg-[#e06822] text-white border-[#e06822]" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}
                  >
                    B2C
                  </button>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
                <div className="relative">
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 bg-[#f4f5f6] border-none rounded-md text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-gray-200"
                  >
                    <option>All Categories</option>
                    <option>Molding</option>
                    <option>Extrusion</option>
                    <option>Custom Seal</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Amount Range */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Amount Range (RP)</label>
                <div className="pt-4">
                  <div className="h-1 w-full bg-gray-200 rounded-full relative">
                    {/* Placeholder for slider */}
                  </div>
                  <div className="flex justify-between items-center mt-3 text-xs font-semibold text-gray-500">
                    <span>0</span>
                    <span>200M+</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex items-center gap-3 bg-white mt-auto">
              <button 
                onClick={() => setShowFilters(false)}
                className="flex-1 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-lg transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                className="flex-1 px-4 py-2.5 bg-black hover:bg-gray-900 text-white text-sm font-bold rounded-lg transition-colors shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
