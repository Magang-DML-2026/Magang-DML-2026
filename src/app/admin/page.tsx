import { 
  Zap, 
  Download,
  Settings as SettingsIcon,
  PenTool,
  Factory,
  Truck
} from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Executive Summary</h1>
          <p className="text-gray-500 mt-1">Real-time overview for <span className="font-medium text-gray-700">September 14, 2023</span></p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md border border-gray-300 transition-colors shadow-sm">
            <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
            Buat Akun
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0f172a] hover:bg-slate-800 text-white font-semibold rounded-md transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Top Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Performance Card */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-gray-900">Sales Performance</h2>
            <div className="flex items-center bg-gray-100 p-1 rounded-md text-sm font-medium text-gray-500">
              <button className="px-3 py-1 bg-white text-gray-900 rounded shadow-sm">Week</button>
              <button className="px-3 py-1 hover:text-gray-900">Month</button>
              <button className="px-3 py-1 hover:text-gray-900">Year</button>
            </div>
          </div>
          
          <div className="flex-1 min-h-[240px] flex items-end relative">
            {/* Placeholder for chart */}
            <div className="w-full flex justify-between text-xs text-gray-400 font-medium px-4 mt-auto">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Right Column Stack */}
        <div className="flex flex-col gap-6">
          {/* Today's Orders */}
          <div className="bg-[#1e293b] rounded-xl text-white p-6 relative overflow-hidden shadow-sm">
            <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase mb-2">Today's Orders</h3>
            <div className="text-5xl font-bold mb-8 tracking-tighter">42</div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-semibold text-slate-400 mb-1">B2B (Direct)</p>
                <p className="text-2xl font-bold text-slate-200">18</p>
              </div>
              <div className="w-px h-10 bg-slate-700 mx-4"></div>
              <div>
                <p className="text-xs font-semibold text-slate-400 mb-1">B2C (Store)</p>
                <p className="text-2xl font-bold text-slate-200">24</p>
              </div>
            </div>
            
            {/* Decorative element like in the image */}
            <div className="absolute right-4 bottom-4 flex gap-1 opacity-20">
              <div className="w-3 h-3 bg-white rounded-sm mt-3"></div>
              <div className="w-3 h-6 bg-white rounded-sm"></div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex-1">
            <h3 className="text-sm font-bold text-gray-900 mb-6">Payment Status</h3>
            
            <div className="space-y-5">
              {/* Paid */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-gray-700">Paid</span>
                  </div>
                  <span className="text-gray-900">78%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              {/* Pending */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#d93f21]"></div>
                    <span className="text-gray-700">Pending</span>
                  </div>
                  <span className="text-gray-900">15%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#d93f21] h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>

              {/* Overdue */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                    <span className="text-gray-700">Overdue</span>
                  </div>
                  <span className="text-gray-900">7%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '7%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Incoming Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Live Incoming Orders</h2>
          <button className="text-sm font-semibold text-[#b73719] hover:text-[#d93f21]">View All Orders</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100/80 text-gray-500 font-bold">
              <tr>
                <th className="px-6 py-4 tracking-wider">ORDER ID</th>
                <th className="px-6 py-4 tracking-wider">CLIENT / ENTITY</th>
                <th className="px-6 py-4 tracking-wider">TYPE</th>
                <th className="px-6 py-4 tracking-wider">CATEGORY</th>
                <th className="px-6 py-4 tracking-wider text-right">AMOUNT</th>
                <th className="px-6 py-4 tracking-wider text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-5 font-bold text-gray-900">#DML-2023-981</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#1e293b] text-white flex items-center justify-center font-bold text-xs">IN</div>
                    <div>
                      <div className="font-bold text-gray-900">Indo Rubber Corp</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">Enterprise B2B</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-gray-200 text-gray-700 text-xs font-bold tracking-wider">BULK</span>
                </td>
                <td className="px-6 py-5 text-gray-700 font-medium">Molding</td>
                <td className="px-6 py-5 text-right font-bold text-gray-900">Rp 145,200,000</td>
                <td className="px-6 py-5 text-right">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    PAID
                  </span>
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-5 font-bold text-gray-900">#DML-2023-982</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-orange-500 text-white flex items-center justify-center font-bold text-xs">RT</div>
                    <div>
                      <div className="font-bold text-gray-900">Adi Wijaya</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">Retail B2C</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-gray-200 text-gray-700 text-xs font-bold tracking-wider">UNIT</span>
                </td>
                <td className="px-6 py-5 text-gray-700 font-medium">Extrusion</td>
                <td className="px-6 py-5 text-right font-bold text-gray-900">Rp 2,450,000</td>
                <td className="px-6 py-5 text-right">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                    PENDING
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-5 font-bold text-gray-900">#DML-2023-983</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-black text-white flex items-center justify-center font-bold text-xs">TL</div>
                    <div>
                      <div className="font-bold text-gray-900">Tunas Logistik PT</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">Regular B2B</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-gray-200 text-gray-700 text-xs font-bold tracking-wider">BATCH</span>
                </td>
                <td className="px-6 py-5 text-gray-700 font-medium">Custom Seal</td>
                <td className="px-6 py-5 text-right font-bold text-gray-900">Rp 67,800,000</td>
                <td className="px-6 py-5 text-right">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    PAID
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Manufacturing Lifecycle Load */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-8">Manufacturing Lifecycle Load</h3>
        
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 md:px-12 relative">
          {/* Connecting Line */}
          <div className="hidden sm:block absolute top-7 left-12 right-12 h-px bg-gray-200 -z-10"></div>
          
          {/* Design */}
          <div className="flex flex-col items-center gap-3 bg-white z-10 w-32">
            <div className="w-14 h-14 rounded-full bg-[#1e293b] flex items-center justify-center text-white border-[6px] border-white shadow-sm">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 text-sm">Design</div>
              <div className="text-xs font-bold text-[#b73719] mt-1">12 Projects</div>
            </div>
          </div>

          {/* Prototyping */}
          <div className="flex flex-col items-center gap-3 bg-white z-10 w-32 mt-6 sm:mt-0">
            <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white border-[6px] border-white shadow-sm">
              <PenTool className="w-5 h-5" />
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 text-sm">Prototyping</div>
              <div className="text-xs font-bold text-[#d93f21] mt-1">5 Active</div>
            </div>
          </div>

          {/* Production */}
          <div className="flex flex-col items-center gap-3 bg-white z-10 w-32 mt-6 sm:mt-0">
            <div className="w-14 h-14 rounded-full bg-[#d93f21] flex items-center justify-center text-white border-[6px] border-white shadow-sm">
              <Factory className="w-5 h-5" />
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 text-sm">Production</div>
              <div className="text-xs font-bold text-[#b73719] mt-1">28 Batches</div>
            </div>
          </div>

          {/* Delivery */}
          <div className="flex flex-col items-center gap-3 bg-white z-10 w-32 mt-6 sm:mt-0">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-[6px] border-white shadow-sm">
              <Truck className="w-5 h-5" />
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 text-sm">Delivery</div>
              <div className="text-xs font-medium text-gray-500 mt-1">Scheduled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
