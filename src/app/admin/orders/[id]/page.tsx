import { 
  Printer, 
  Truck,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Building2,
  Circle
} from "lucide-react"
import Link from "next/link"

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const orderId = resolvedParams.id.toUpperCase();
  
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-10">
      
      {/* Top Navigation */}
      <div className="mb-2">
        <Link href="/admin/orders" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Admin Portal
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Order #{orderId}</h1>
            <span className="inline-flex items-center px-2.5 py-1 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold tracking-widest uppercase">
              PAID
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium mt-1">Placed on Oct 24, 2023 at 14:22 PM</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/admin/orders/${resolvedParams.id}/invoice`} className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-lg border border-gray-200 transition-colors shadow-sm">
            <Printer className="w-4 h-4 text-gray-500" />
            Print Invoice
          </Link>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#b73719] hover:bg-[#9a2d14] text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
            <Truck className="w-4 h-4" />
            Ship Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-8">
        
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
              <span className="text-sm font-medium text-gray-500">2 Items</span>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Item 1 */}
              <div className="flex gap-5">
                <div className="w-[84px] h-[84px] rounded-lg bg-[#f4f5f6] border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center p-2">
                  {/* Fake Image for Seal */}
                  <div className="w-full h-full rounded bg-gray-300 relative overflow-hidden">
                    <div className="absolute inset-0 flex flex-wrap gap-1 p-1 items-center justify-center bg-[#e5e7eb]">
                        <div className="w-4 h-4 rounded-full border-4 border-gray-800"></div>
                        <div className="w-4 h-4 rounded-full border-4 border-gray-800"></div>
                        <div className="w-4 h-4 rounded-full border-4 border-gray-800"></div>
                        <div className="w-4 h-4 rounded-full border-4 border-gray-800"></div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Precision Gasket Seal X-90</h3>
                      <p className="text-[11px] text-gray-500 font-medium mt-1 uppercase tracking-wider">SKU: DML-GSK-001</p>
                    </div>
                    <div className="text-[15px] font-semibold text-gray-900">$6,250.00</div>
                  </div>
                  <div className="mt-4 flex gap-6 text-[13px] text-gray-600 font-medium">
                    <span>Unit Price: $12.50</span>
                    <span>Quantity: 500 units</span>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-5">
                <div className="w-[84px] h-[84px] rounded-lg bg-[#f4f5f6] border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center p-2">
                   {/* Fake Image for Mudguard */}
                   <div className="w-full h-full rounded bg-gray-800 relative overflow-hidden">
                      <div className="absolute inset-0 flex flex-col gap-1 p-2 items-center justify-center">
                          <div className="w-full h-1 bg-gray-600 rounded"></div>
                          <div className="w-full h-1 bg-gray-600 rounded"></div>
                          <div className="w-full h-1 bg-gray-600 rounded"></div>
                      </div>
                   </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Commercial Truck Mudguard (Heavy Duty)</h3>
                      <p className="text-[11px] text-gray-500 font-medium mt-1 uppercase tracking-wider">SKU: DML-MUD-992</p>
                    </div>
                    <div className="text-[15px] font-semibold text-gray-900">$5,400.00</div>
                  </div>
                  <div className="mt-4 flex gap-6 text-[13px] text-gray-600 font-medium">
                    <span>Unit Price: $45.00</span>
                    <span>Quantity: 120 units</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="px-6 py-5 bg-[#fcfcfd] border-t border-dashed border-gray-300">
              <div className="flex justify-end">
                <div className="w-full sm:w-[280px] space-y-2.5 text-[13px]">
                  <div className="flex justify-between font-medium text-gray-600">
                    <span>Subtotal</span>
                    <span className="text-gray-900">$11,650.00</span>
                  </div>
                  <div className="flex justify-between font-medium text-gray-600">
                    <span>Shipping (Bulk Freight)</span>
                    <span className="text-gray-900">$450.00</span>
                  </div>
                  <div className="flex justify-between font-medium text-gray-600">
                    <span>Tax (11%)</span>
                    <span className="text-gray-900">$1,281.50</span>
                  </div>
                  <div className="flex justify-between font-bold text-[15px] pt-3 mt-1 border-t border-gray-200">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">$13,381.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Timeline Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-8">Shipping Timeline</h2>
            
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
              
              {/* Step 1 */}
              <div className="relative flex items-start gap-4">
                <div className="bg-white p-0.5 relative z-10 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-[#b73719] fill-[#b73719]" color="white" />
                </div>
                <div className="-mt-1">
                  <h3 className="font-bold text-gray-900 text-sm">Order Processing Completed</h3>
                  <p className="text-[13px] text-gray-600 mt-1">Inventory reserved and quality checks finalized.</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-1.5 italic">Oct 24, 2023 - 16:45 PM</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-4">
                <div className="bg-white p-0.5 relative z-10 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-[#b73719] fill-[#b73719]" color="white" />
                </div>
                <div className="-mt-1">
                  <h3 className="font-bold text-gray-900 text-sm">Payment Verified</h3>
                  <p className="text-[13px] text-gray-600 mt-1">Invoice paid via Bank Transfer. Confirmation #TRX-9821-X.</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-1.5 italic">Oct 24, 2023 - 15:10 PM</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-4">
                <div className="bg-white p-1 relative z-10">
                  <div className="w-3 h-3 rounded-full border-2 border-[#b73719] bg-white ring-4 ring-white"></div>
                </div>
                <div className="-mt-1">
                  <h3 className="font-bold text-gray-900 text-sm">Awaiting Shipment</h3>
                  <p className="text-[13px] text-gray-600 mt-1">Scheduled for pickup by DHL Logistics.</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-1.5 italic">In Progress</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column - Context Details */}
        <div className="space-y-6">
          
          {/* Customer Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6">Customer Profile</h3>
            
            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
              <div className="w-12 h-12 rounded-lg bg-[#0f172a] text-white flex items-center justify-center shadow-sm shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-[15px]">Indo Rubber Corp</h4>
                <p className="text-[11px] font-medium text-gray-500 mt-1">Client ID: DML-CUST-8812</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Contact Person</p>
                <p className="text-[13px] font-semibold text-gray-800">Budi Santoso</p>
                <p className="text-[13px] text-gray-500 mt-0.5">budi.s@indorubber.co.id</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Billing Address</p>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  Jl. Industri Utama No. 45<br />
                  Cikarang Barat, Bekasi<br />
                  Jawa Barat, 17530
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-5">Shipping Address</h3>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#b73719] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[13px] font-bold text-gray-900">Warehouse 4 - Receiving Dock</h4>
                <p className="text-[13px] text-gray-600 mt-1.5 leading-relaxed">
                  Jl. Kawasan Industri Jababeka V<br />
                  Kav. 12-14, Cikarang<br />
                  Bekasi, Indonesia
                </p>
              </div>
            </div>
            
            <div className="mt-5 w-full h-24 bg-gray-200 rounded-lg border border-gray-300 overflow-hidden relative group">
              <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-center transition-opacity"></div>
              {/* Path line mockup for map */}
              <svg className="absolute inset-0 w-full h-full text-gray-400 opacity-60" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M 10 90 Q 30 20 60 40 T 90 10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="90" cy="10" r="3" fill="#b73719" />
              </svg>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-gray-900/80 backdrop-blur-sm text-white text-[10px] font-bold rounded">HQ Logistics Center</div>
            </div>
          </div>

          {/* Internal Notes Card */}
          <div className="bg-[#f4f5f6] rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Internal Notes</h3>
            
            <textarea 
              className="w-full h-[100px] p-3 bg-white border border-gray-200 rounded-lg text-[13px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none shadow-sm"
              placeholder="Add a private note about this order..."
            ></textarea>
            
            <button className="w-full mt-4 px-4 py-2.5 bg-black hover:bg-gray-900 text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
              Save Note
            </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}
