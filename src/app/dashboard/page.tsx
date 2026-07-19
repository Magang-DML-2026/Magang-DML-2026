import { getSession } from "@/lib/session";
import Link from "next/link";
import { Truck, Package, Microscope, Wrench, Download } from "lucide-react";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[22px] text-zinc-900 mb-1">
          Welcome back, <span className="font-semibold">{session?.userName}</span>
        </h1>
        <p className="text-[15px] text-zinc-500">
          Track your precision rubber component manufacturing and shipments.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Shipments */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[15px] font-medium text-zinc-800">Active Shipments</h2>
              <span className="text-sm font-semibold text-[#cc4224]">2 En Route</span>
            </div>

            <div className="space-y-6">
              {/* Shipment 1 */}
              <div className="relative pl-14">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 border border-[#f5d9d3] bg-[#fdf5f3] rounded-lg flex items-center justify-center text-[#cc4224]">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[15px] font-medium text-zinc-900">Custom Gasket Batch #DM-9022</h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">Estimated Delivery: Oct 24, 2023</p>
                  </div>
                  <span className="text-[11px] font-bold bg-[#fdf5f3] text-[#cc4224] px-2 py-1 rounded">ON TRUCK</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#cc4224] w-[85%] rounded-full"></div>
                </div>
              </div>

              {/* Shipment 2 */}
              <div className="relative pl-14">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 border border-zinc-200 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-600">
                  <Package className="w-5 h-5" />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[15px] font-medium text-zinc-900">O-Ring Bulk Supply (Industrial Grade)</h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">Estimated Delivery: Oct 28, 2023</p>
                  </div>
                  <span className="text-[11px] font-bold bg-zinc-100 text-zinc-600 px-2 py-1 rounded">PROCESSING</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-800 w-[30%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-8 h-8 rounded bg-[#eef2ff] text-blue-600 flex items-center justify-center">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-zinc-500">Order #98332</span>
                </div>
                <h3 className="text-[15px] font-medium text-zinc-900 mb-2">Molding Phase</h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed mb-6">
                  Component design finalized. Commencing mass injection molding for 5,000 units.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#cc4224]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc4224]"></span>
                Active Production
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-8 h-8 rounded bg-zinc-100 text-zinc-600 flex items-center justify-center">
                    <Microscope className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-zinc-500">Order #98411</span>
                </div>
                <h3 className="text-[15px] font-medium text-zinc-900 mb-2">Quality Inspection</h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed mb-6">
                  Final stress-testing and material integrity checks for High-Temp seals.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                Pending Testing
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          {/* Insights */}
          <div className="bg-black rounded-xl p-6 shadow-md text-white">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[15px] font-medium text-white/90">Monthly Insights</h2>
              <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            
            <div className="mb-6">
              <p className="text-xs text-white/60 mb-1">Total Spend (October)</p>
              <p className="text-2xl font-light tracking-tight">$42,850.00</p>
            </div>
            
            <div className="w-full h-[1px] bg-white/10 mb-6"></div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/60 mb-1">Orders</p>
                <p className="text-[15px]"><span className="font-semibold">12</span> Active</p>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-1">Delivered</p>
                <p className="text-[15px] text-[#ff8a66]"><span className="font-semibold">104</span> Total</p>
              </div>
            </div>
          </div>

          {/* Consultation */}
          <div className="bg-gradient-to-br from-[#ff6b4a] to-[#cc4224] rounded-xl p-6 shadow-md text-white">
            <h2 className="text-[15px] font-medium mb-2">Industrial Consultation</h2>
            <p className="text-[13px] text-white/90 leading-relaxed mb-6">
              Need technical advice on material selection for high-pressure environments? Our engineers are available for live consultation.
            </p>
            <button className="w-full bg-white text-[#cc4224] hover:bg-white/90 transition-colors py-2.5 rounded-lg text-[13px] font-semibold">
              Speak to Expert
            </button>
          </div>

          {/* Facility Image */}
          <div className="relative h-40 rounded-xl overflow-hidden shadow-sm group">
            {/* using a placeholder image that looks like a factory facility */}
            <div className="absolute inset-0 bg-zinc-800">
              {/* Note: using a realistic placeholder since we don't have the exact image */}
              <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1580983582457-3f31c77bb32d?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-[10px] text-white/70 mb-0.5">Primary Facility</p>
              <h3 className="text-[15px] font-medium text-white mb-1.5">Tangerang Plant A</h3>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#86efac]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#86efac]"></span>
                OPERATIONAL
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden mb-10">
        <div className="px-6 py-5 border-b border-zinc-200 flex justify-between items-center bg-white">
          <h2 className="text-[15px] font-medium text-zinc-800">Recent Transactions</h2>
          <button className="text-[13px] font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5 transition-colors">
            Export CSV
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-4 text-[13px] font-semibold text-zinc-900 w-[12%]">Order ID</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-zinc-900 w-[25%]">Product</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-zinc-900 w-[15%]">Quantity</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-zinc-900 w-[18%]">Total Amount</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-zinc-900 w-[20%]">Tracking Status</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-zinc-900 w-[10%]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {/* Row 1 */}
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 text-[14px] text-zinc-600">#98332</td>
                <td className="px-6 py-4 text-[14px] text-zinc-900 font-medium">EPDM Rubber Seals</td>
                <td className="px-6 py-4 text-[14px] text-zinc-600">5,000 Pcs</td>
                <td className="px-6 py-4 text-[14px] text-zinc-600">$12,400.00</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fdf5f3] text-[#cc4224] text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cc4224]"></span>
                    In Production
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link href="/dashboard/transactions/98332" className="text-[13px] font-medium text-zinc-900 hover:underline">Details</Link>
                </td>
              </tr>
              
              {/* Row 2 */}
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 text-[14px] text-zinc-600">#97981</td>
                <td className="px-6 py-4 text-[14px] text-zinc-900 font-medium">Industrial Floor Matting</td>
                <td className="px-6 py-4 text-[14px] text-zinc-600">200 Rolls</td>
                <td className="px-6 py-4 text-[14px] text-zinc-600">$22,150.00</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Delivered
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link href="/dashboard/transactions/97981" className="text-[13px] font-medium text-zinc-900 hover:underline">Details</Link>
                </td>
              </tr>
              
              {/* Row 3 */}
              <tr className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 text-[14px] text-zinc-600">#97652</td>
                <td className="px-6 py-4 text-[14px] text-zinc-900 font-medium">Vibration Isolator Pads</td>
                <td className="px-6 py-4 text-[14px] text-zinc-600">1,200 Pcs</td>
                <td className="px-6 py-4 text-[14px] text-zinc-600">$8,300.00</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500 text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                    Dispatched
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link href="/dashboard/transactions/97652" className="text-[13px] font-medium text-zinc-900 hover:underline">Details</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
