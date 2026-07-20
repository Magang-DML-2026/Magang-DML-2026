"use client"

import { 
  ChevronRight,
  PackagePlus,
  Trash2,
  Truck,
  FileText
} from "lucide-react"
import Link from "next/link"
import { use } from "react"

export default function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id.toUpperCase();
  
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      
      {/* Top Navigation */}
      <div className="mb-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
          <Link href="/admin/orders" className="hover:text-gray-900 transition-colors">Orders</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900">Edit #{orderId}</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Edit Order #{orderId}</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Submitted on Oct 14, 2023 • Customer: Pertamina Industrial Solutions</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/admin/orders/${resolvedParams.id}`} className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-bold rounded-lg transition-colors shadow-sm">
            Cancel Changes
          </Link>
          <button className="px-5 py-2.5 bg-[#b73719] hover:bg-[#9a2d14] text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
            Save Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-8">
        
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-2">
              <PackagePlus className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#fcfcfd] border-b border-gray-100 text-gray-600 font-bold">
                  <tr>
                    <th className="px-6 py-4">Product Details</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Unit Price</th>
                    <th className="px-6 py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Item 1 */}
                  <tr>
                    <td className="px-6 py-6">
                      <div className="flex gap-4 items-center">
                        <div className="w-[60px] h-[60px] rounded-md bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center p-1">
                           <div className="w-full h-full rounded bg-gray-800 flex items-center justify-center">
                              <div className="w-8 h-2 bg-gray-600 rounded"></div>
                           </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 leading-tight">V-Style Industrial Seal</h3>
                          <p className="text-[11px] text-gray-500 font-medium mt-1">SKU: RB-VS-9012 • Custom Molding</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <input 
                        type="number" 
                        defaultValue={120} 
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      />
                    </td>
                    <td className="px-6 py-6 font-medium text-gray-600 text-center">
                      IDR<br/>45,000
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="font-bold text-gray-900 text-[15px]">
                        IDR<br/>54,000,000
                      </div>
                    </td>
                  </tr>

                  {/* Item 2 */}
                  <tr>
                    <td className="px-6 py-6">
                      <div className="flex gap-4 items-center">
                        <div className="w-[60px] h-[60px] rounded-md bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center p-1">
                           <div className="w-full h-full rounded bg-gray-300 flex items-center justify-center">
                              <div className="w-8 h-4 bg-gray-400 rounded"></div>
                           </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 leading-tight">Heat Resistant Extrusion Hose</h3>
                          <p className="text-[11px] text-gray-500 font-medium mt-1">SKU: RB-HR-203 • 25mm Diameter</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <input 
                        type="number" 
                        defaultValue={450} 
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      />
                    </td>
                    <td className="px-6 py-6 font-medium text-gray-600 text-center">
                      IDR<br/>112,000
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="font-bold text-gray-900 text-[15px]">
                        IDR<br/>50,400,000
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div className="px-6 py-6 border-t border-gray-100">
              <div className="flex justify-end">
                <div className="w-[300px] space-y-4 text-[13px]">
                  <div className="flex justify-between items-center text-gray-600 font-medium">
                    <span>Subtotal</span>
                    <span className="text-right text-gray-900 font-semibold">IDR<br/>104,400,000</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 font-medium">
                    <span>Tax (PPN 11%)</span>
                    <span className="text-right text-gray-900 font-semibold">IDR<br/>11,484,000</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0f172a] text-white p-4 rounded-lg mt-4">
                    <span className="font-bold">Grand Total</span>
                    <span className="text-right font-bold text-[15px]">IDR<br/>115,884,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Product Footer */}
            <div className="px-6 py-4 bg-[#fcfcfd] border-t border-gray-200 flex items-center justify-between">
              <button className="flex items-center gap-1.5 text-[#b73719] font-bold text-sm hover:text-[#9a2d14] transition-colors">
                <span className="text-lg leading-none">+</span> Add Another Product
              </button>
              <span className="text-[11px] text-gray-500 font-medium">Changes to quantities will recalculate tax and totals upon saving.</span>
            </div>
          </div>

          {/* Manufacturing Lifecycle Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                <h2 className="text-lg font-bold text-gray-900">Manufacturing Lifecycle</h2>
              </div>
              <span className="inline-flex px-3 py-1 bg-[#ffedd5] text-[#c2410c] text-[11px] font-bold rounded-full tracking-wider">
                In Production
              </span>
            </div>
            
            <div className="p-8">
              {/* Stepper */}
              <div className="relative flex justify-between items-center before:absolute before:inset-0 before:top-1/2 before:-translate-y-1/2 before:h-1 before:bg-gray-200 before:z-0">
                {/* Active Progress Line */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-[#b73719] z-0" style={{ width: '50%' }}></div>

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#b73719] text-white flex items-center justify-center font-bold shadow-[0_0_0_4px_white]">1</div>
                  <span className="text-[11px] font-bold text-gray-900">Design</span>
                </div>
                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#b73719] text-white flex items-center justify-center font-bold shadow-[0_0_0_4px_white]">2</div>
                  <span className="text-[11px] font-bold text-gray-900">Prototype</span>
                </div>
                {/* Step 3 */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#b73719] text-white flex items-center justify-center font-bold shadow-[0_0_0_4px_white]">3</div>
                  <span className="text-[11px] font-bold text-gray-900">Mass Production</span>
                </div>
                {/* Step 4 */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 text-gray-400 flex items-center justify-center font-bold shadow-[0_0_0_4px_white]">4</div>
                  <span className="text-[11px] font-bold text-gray-500">Quality Control</span>
                </div>
                {/* Step 5 */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 text-gray-400 flex items-center justify-center font-bold shadow-[0_0_0_4px_white]">5</div>
                  <span className="text-[11px] font-bold text-gray-500">Logistics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="space-y-6">
          
          {/* Shipping Address Form */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Truck className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-bold text-gray-900">Shipping Address</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Recipient / Company Name</label>
                <input 
                  type="text" 
                  defaultValue="Pertamina Industrial Solutions - Plant B" 
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-[13px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Street Address</label>
                <textarea 
                  defaultValue="Jl. Raya Bekasi KM 24, Kawasan Industri Pulogadung, Blok C-12" 
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-[13px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none h-20"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5">City</label>
                  <input 
                    type="text" 
                    defaultValue="Jakarta Timur" 
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-[13px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Postal Code</label>
                  <input 
                    type="text" 
                    defaultValue="13920" 
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-[13px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Shipping Method</label>
                <select className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-[13px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white">
                  <option>DML Internal Logistics (Recommended)</option>
                  <option>DHL Express</option>
                  <option>JNE Cargo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Internal Notes Form */}
          <div className="bg-[#fcfcfd] rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-bold text-gray-900">Internal Notes</h2>
            </div>
            
            <textarea 
              className="w-full h-32 p-3 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none italic"
              defaultValue="Customer requested priority molding for the V-Style seals. Ensure quality check batch #881 is completed before Friday. Shipping contact: Bpk. Andi (+62-811-000-XXX)."
            ></textarea>
          </div>
          
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button className="flex items-center gap-2 text-[#dc2626] hover:text-[#991b1b] font-bold text-sm transition-colors">
          <Trash2 className="w-4 h-4" />
          Cancel & Delete Order
        </button>
        <div className="flex items-center gap-6">
          <span className="text-[11px] text-gray-500 font-medium">Last updated by: Admin J. Doe (Oct 15, 2023 14:30)</span>
          <button className="px-8 py-3 bg-[#b73719] hover:bg-[#9a2d14] text-white text-base font-bold rounded-lg transition-colors shadow-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
