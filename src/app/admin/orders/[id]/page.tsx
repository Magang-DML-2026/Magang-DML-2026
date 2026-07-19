import { 
  Printer, 
  Truck,
  MapPin,
  CheckCircle2,
  Circle
} from "lucide-react"

// A mock order page. In a real app, you would fetch data using params.id
export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div className="space-y-6 max-w-[1200px] animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Order #{resolvedParams.id.toUpperCase()}</h1>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide">
              PAID
            </span>
          </div>
          <p className="text-slate-500 font-medium mt-1">Placed on Oct 24, 2023 at 14:22 PM</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-all shadow-sm">
            <Printer className="w-4 h-4 text-slate-500" />
            Print Invoice
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#d93f21] hover:bg-[#b73719] text-white font-semibold rounded-lg transition-all shadow-sm">
            <Truck className="w-4 h-4" />
            Ship Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Order Items</h2>
              <span className="text-sm font-medium text-slate-500">2 Items</span>
            </div>
            
            <div className="space-y-6">
              {/* Item 1 */}
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                  <img src="https://placehold.co/100x100/e2e8f0/64748b?text=Seal" alt="Product" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">Precision Gasket Seal X-90</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">SKU: DML-GSK-001</p>
                    </div>
                    <div className="font-bold text-slate-900 font-mono tracking-tight">$6,250.00</div>
                  </div>
                  <div className="mt-3 text-sm font-medium text-slate-700 flex gap-4">
                    <span>Unit Price: $12.50</span>
                    <span>Quantity: 500 units</span>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                  <img src="https://placehold.co/100x100/e2e8f0/64748b?text=Mudguard" alt="Product" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">Commercial Truck Mudguard (Heavy Duty)</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">SKU: DML-MUD-992</p>
                    </div>
                    <div className="font-bold text-slate-900 font-mono tracking-tight">$5,400.00</div>
                  </div>
                  <div className="mt-3 text-sm font-medium text-slate-700 flex gap-4">
                    <span>Unit Price: $45.00</span>
                    <span>Quantity: 120 units</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-8 pt-6 border-t border-dashed border-slate-300">
              <div className="flex justify-end">
                <div className="w-full sm:w-1/2 space-y-3 text-sm">
                  <div className="flex justify-between font-medium text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-mono text-slate-900">$11,650.00</span>
                  </div>
                  <div className="flex justify-between font-medium text-slate-600">
                    <span>Shipping (Bulk Freight)</span>
                    <span className="font-mono text-slate-900">$450.00</span>
                  </div>
                  <div className="flex justify-between font-medium text-slate-600">
                    <span>Tax (11%)</span>
                    <span className="font-mono text-slate-900">$1,281.50</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-3 border-t border-slate-100">
                    <span className="text-slate-900">Total</span>
                    <span className="font-mono text-slate-900">$13,381.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Timeline Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Shipping Timeline</h2>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              
              {/* Step 1 */}
              <div className="relative flex items-start gap-4">
                <div className="bg-white p-0.5 relative z-10">
                  <CheckCircle2 className="w-5 h-5 text-[#d93f21] fill-[#d93f21]/10" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Order Processing Completed</h3>
                  <p className="text-sm text-slate-600 mt-1">Inventory reserved and quality checks finalized.</p>
                  <p className="text-xs text-slate-400 font-medium mt-1 italic">Oct 24, 2023 - 16:45 PM</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-4">
                <div className="bg-white p-0.5 relative z-10">
                  <CheckCircle2 className="w-5 h-5 text-[#d93f21] fill-[#d93f21]/10" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Payment Verified</h3>
                  <p className="text-sm text-slate-600 mt-1">Invoice paid via Bank Transfer. Confirmation #TRX-9821-X.</p>
                  <p className="text-xs text-slate-400 font-medium mt-1 italic">Oct 24, 2023 - 15:10 PM</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-4">
                <div className="bg-white p-1 relative z-10">
                  <div className="w-3 h-3 rounded-full border-2 border-[#d93f21] bg-white ring-4 ring-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Awaiting Shipment</h3>
                  <p className="text-sm text-slate-600 mt-1">Scheduled for pickup by DHL Logistics.</p>
                  <p className="text-xs text-slate-400 font-medium mt-1 italic">In Progress</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column - Context Details */}
        <div className="space-y-6">
          
          {/* Customer Profile Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Customer Profile</h3>
            
            <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-6">
              <div className="w-12 h-12 rounded-lg bg-[#0f172a] text-white flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m3 15 2 2 4-4"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Indo Rubber Corp</h4>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Client ID: DML-CUST-8812</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Person</p>
                <p className="text-sm font-semibold text-slate-700">Budi Santoso</p>
                <p className="text-sm text-slate-500 mt-0.5">budi.s@indorubber.co.id</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Billing Address</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Jl. Industri Utama No. 45<br />
                  Cikarang Barat, Bekasi<br />
                  Jawa Barat, 17530
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Shipping Address</h3>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#d93f21] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Warehouse 4 - Receiving Dock</h4>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Jl. Kawasan Industri Jababeka V<br />
                  Kav. 12-14, Cikarang<br />
                  Bekasi, Indonesia
                </p>
              </div>
            </div>
            
            <div className="mt-5 w-full h-24 bg-slate-100 rounded-lg border border-slate-200 overflow-hidden relative group cursor-pointer">
              {/* Fake Map Background */}
              <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold rounded">HQ Logistics Center</div>
            </div>
          </div>

          {/* Internal Notes Card */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Internal Notes</h3>
            
            <textarea 
              className="w-full h-24 p-3 bg-white border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none shadow-sm"
              placeholder="Add a private note about this order..."
            ></textarea>
            
            <button className="w-full mt-3 px-4 py-2 bg-black hover:bg-slate-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
              Save Note
            </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}
