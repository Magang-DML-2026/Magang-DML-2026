import { 
  ListFilter, 
  Download,
  Search,
  ChevronDown,
  Calendar,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  PackageSearch
} from "lucide-react"

export default function OrdersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Orders Management</h1>
          <p className="text-slate-500 font-medium">View, track, and manage all your B2B and B2C transactions in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="group flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md hover:border-slate-300">
            <ListFilter className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            Filters
          </button>
          <button className="group flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-[1px]">
            <Download className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Unified Search & Filter Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between bg-slate-50/50">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by Order ID, Client, or Category..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-600 text-sm font-semibold rounded-lg border border-slate-200 transition-all shadow-sm min-w-[140px] justify-between">
              Status: All
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-600 text-sm font-semibold rounded-lg border border-slate-200 transition-all shadow-sm min-w-[140px] justify-between">
              Category: All
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1"></div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg border border-slate-200 transition-all shadow-sm">
              <Calendar className="w-4 h-4 text-indigo-500" />
              Last 30 Days
            </button>
          </div>
        </div>

        {/* Premium Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 tracking-wide text-xs uppercase">Order Details</th>
                <th className="px-6 py-4 tracking-wide text-xs uppercase">Client / Entity</th>
                <th className="px-6 py-4 tracking-wide text-xs uppercase">Type</th>
                <th className="px-6 py-4 tracking-wide text-xs uppercase">Category</th>
                <th className="px-6 py-4 tracking-wide text-xs uppercase text-right">Amount</th>
                <th className="px-6 py-4 tracking-wide text-xs uppercase text-center">Status</th>
                <th className="px-6 py-4 w-[60px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/80 transition-all duration-200 group relative">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">#DML-2023-981</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Sep 14, 2023</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm ring-1 ring-indigo-500/20 shadow-sm">IN</div>
                    <div>
                      <div className="font-bold text-slate-900">Indo Rubber Corp</div>
                      <div className="text-xs text-slate-500 font-medium">Enterprise B2B</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold tracking-wider border border-slate-200/60 shadow-sm">BULK</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <PackageSearch className="w-4 h-4 text-slate-400" />
                    Molding
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="font-bold text-slate-900 font-mono tracking-tight">Rp 145,200,000</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wide ring-1 ring-emerald-600/20 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    PAID
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              
              {/* Row 2 */}
              <tr className="hover:bg-slate-50/80 transition-all duration-200 group relative">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">#DML-2023-982</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Sep 14, 2023</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm ring-1 ring-amber-500/20 shadow-sm">AW</div>
                    <div>
                      <div className="font-bold text-slate-900">Adi Wijaya</div>
                      <div className="text-xs text-slate-500 font-medium">Retail B2C</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold tracking-wider border border-slate-200/60 shadow-sm">UNIT</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <PackageSearch className="w-4 h-4 text-slate-400" />
                    Extrusion
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="font-bold text-slate-900 font-mono tracking-tight">Rp 2,450,000</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold tracking-wide ring-1 ring-amber-600/20 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    PENDING
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-slate-50/80 transition-all duration-200 group relative">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">#DML-2023-983</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Sep 13, 2023</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm ring-1 ring-blue-500/20 shadow-sm">TL</div>
                    <div>
                      <div className="font-bold text-slate-900">Tunas Logistik PT</div>
                      <div className="text-xs text-slate-500 font-medium">Regular B2B</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold tracking-wider border border-slate-200/60 shadow-sm">BATCH</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <PackageSearch className="w-4 h-4 text-slate-400" />
                    Custom Seal
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="font-bold text-slate-900 font-mono tracking-tight">Rp 67,800,000</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wide ring-1 ring-emerald-600/20 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    PAID
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modern Table Footer / Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">1-3</span> of <span className="font-bold text-slate-900">128</span> orders
          </p>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50 shadow-sm">
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo-50 text-indigo-700 font-bold text-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600 font-medium text-sm transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600 font-medium text-sm transition-colors">3</button>
              <span className="text-slate-400 px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600 font-medium text-sm transition-colors">13</button>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
