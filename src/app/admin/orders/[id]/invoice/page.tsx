"use client"

import { useState, use, useEffect } from "react"
import { Check, X, Printer, Download, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function InvoicePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id.toUpperCase();
  
  const [modalType, setModalType] = useState<'download' | 'print' | 'printing' | null>('download') // Default to download for demo
  const [showToast, setShowToast] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const [destinationDropdownOpen, setDestinationDropdownOpen] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState('Save as PDF')

  useEffect(() => {
    if (modalType === 'download') {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval)
            return 100
          }
          return p + 20
        })
      }, 300)
      return () => clearInterval(interval)
    }
  }, [modalType])

  const handleDownloadComplete = () => {
    setModalType(null)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12 relative h-full">
      
      {/* Top Navigation */}
      <div className="mb-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
          <Link href="/admin/orders" className="hover:text-gray-900 transition-colors">Orders</Link>
          <span className="text-gray-400">/</span>
          <Link href={`/admin/orders/${resolvedParams.id}`} className="text-gray-900 hover:underline transition-colors">#{orderId}</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-6">
        
        {/* Left Column - Invoice Preview */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Brief */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Heavy Industrial Sealant Kit</h3>
                <p className="text-xs text-gray-500 mt-1">Batch No: MZ-90012-B | Order Date: Oct 24, 2023</p>
              </div>
              <span className="inline-flex px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-full tracking-widest uppercase">
                Processing
              </span>
            </div>
            
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Client</span>
                <span className="font-bold text-gray-900">Global Logistics Corp</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Material</span>
                <span className="font-bold text-gray-900">High-Density Industrial Rubber (Nitrile)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Quantity</span>
                <span className="font-bold text-gray-900">2,500 Units</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-gray-100">
                <span className="text-gray-500">Total Amount</span>
                <span className="font-bold text-[#b73719]">$42,850.00</span>
              </div>
            </div>
          </div>

          {/* Invoice Document Preview */}
          <div className="bg-white rounded-sm border border-gray-200 shadow-md p-10 relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
              <span className="text-[150px] font-black rotate-[-30deg] tracking-tighter text-gray-900">PT DUTA MITRA LUHUR</span>
            </div>
            
            <div className="relative z-10 flex justify-between items-start border-b-4 border-gray-900 pb-8 mb-8">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-gray-900 uppercase">INVOICE</h1>
                <p className="text-sm font-medium text-gray-500 mt-1">#{orderId}</p>
              </div>
              <div className="text-right">
                <h2 className="font-bold text-gray-900">PT Duta Mitra Luhur</h2>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Industrial Zone 4, Block B<br/>
                  Cikarang, Bekasi, 17530
                </p>
              </div>
            </div>

            <div className="relative z-10 flex justify-between gap-12 mb-10">
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Bill To:</p>
                <h3 className="font-bold text-gray-900">Global Logistics Corp</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Attn: Procurement Dept.<br/>
                  88 International Dr, Suite 500<br/>
                  Chicago, IL, 60601, USA
                </p>
              </div>
              <div className="flex-1 text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Ship To:</p>
                <h3 className="font-bold text-gray-900">Global Logistics Warehouse</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Facility 48, South Port<br/>
                  Chicago, IL, 60617
                </p>
              </div>
            </div>

            <div className="relative z-10">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/50 border-y border-gray-200">
                  <tr>
                    <th className="py-3 px-4 font-bold text-gray-700">Description</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center">Qty</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-right">Unit Price</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">Custom Molded Rubber Sealants (Nitrile 70)</div>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600">2,500</td>
                    <td className="py-4 px-4 text-right text-gray-600">$15.50</td>
                    <td className="py-4 px-4 text-right font-bold text-gray-900">$38,750.00</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">Industrial Logistics & Packaging Fee</div>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600">1</td>
                    <td className="py-4 px-4 text-right text-gray-600">$4,100.00</td>
                    <td className="py-4 px-4 text-right font-bold text-gray-900">$4,100.00</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
                <div className="w-[300px] space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 font-medium">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">$42,850.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 font-medium">
                    <span>Tax (0%)</span>
                    <span className="font-bold text-gray-900">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-4 mt-2 border-t-2 border-gray-900">
                    <span className="font-black text-gray-900 uppercase">Grand Total</span>
                    <span className="font-black text-[#b73719] text-lg">$42,850.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Status */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6">Manufacturing Status</h3>
          
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
            {/* Step 1 */}
            <div className="relative flex items-start gap-4">
              <div className="bg-white p-0.5 relative z-10 rounded-full border-2 border-gray-300">
                <div className="w-4 h-4 rounded-full bg-gray-500 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                </div>
              </div>
              <div className="-mt-0.5">
                <h3 className="font-bold text-gray-900 text-sm">Design Approved</h3>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5 italic">Oct 25, 2023</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start gap-4">
              <div className="bg-white p-0.5 relative z-10 rounded-full border-2 border-gray-300">
                <div className="w-4 h-4 rounded-full bg-gray-500 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                </div>
              </div>
              <div className="-mt-0.5">
                <h3 className="font-bold text-gray-900 text-sm">Material Sourcing</h3>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5 italic">Oct 27, 2023</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start gap-4 opacity-50">
              <div className="bg-white p-1 relative z-10">
                <div className="w-3 h-3 rounded-full bg-[#b73719] ring-2 ring-white"></div>
              </div>
              <div className="-mt-0.5">
                <h3 className="font-bold text-[#b73719] text-sm">Mass Production</h3>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5 italic">In Progress</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* OVERLAY MODALS */}

      {modalType && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-[100] flex items-center justify-center animate-in fade-in duration-200">
          
          {/* Download Modal (Image 3) */}
          {modalType === 'download' && (
            <div className="bg-white w-[400px] rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#ffedd5] text-[#b73719] flex items-center justify-center mb-6">
                <Download className="w-8 h-8 stroke-[2.5]" />
              </div>
              
              <h2 className="text-[17px] font-bold text-gray-900 mb-2">Download Started</h2>
              <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">
                Invoice for <span className="font-bold text-gray-800">#{orderId}</span> has been generated and is downloading...
              </p>

              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
                <div 
                  className="h-full bg-[#b73719] rounded-full transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="w-full flex items-center gap-3">
                <Link href={`/admin/orders/${resolvedParams.id}`} className="flex-1 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-lg transition-colors">
                  View Order Details
                </Link>
                <button onClick={() => setModalType('print')} className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 bg-black hover:bg-gray-900 text-white text-sm font-bold rounded-lg transition-colors shadow-md">
                  <Printer className="w-4 h-4" />
                  Print Copy
                </button>
              </div>

              {progress >= 100 && (
                 <button onClick={handleDownloadComplete} className="mt-4 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors">Dismiss</button>
              )}
            </div>
          )}

          {/* Print Modal (Image 5) */}
          {modalType === 'print' && (
            <div className="bg-white w-[400px] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <Printer className="w-5 h-5 text-gray-700" />
                  <h2 className="font-bold text-gray-900">Print</h2>
                </div>
                <button onClick={() => setModalType(null)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Destination</label>
                  <div className="relative">
                    <button 
                      onClick={() => setDestinationDropdownOpen(!destinationDropdownOpen)}
                      className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 shadow-sm"
                    >
                      {selectedDestination}
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    {destinationDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden">
                        <button 
                          onClick={() => { setSelectedDestination('Save as PDF'); setDestinationDropdownOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between ${selectedDestination === 'Save as PDF' ? 'bg-[#0f172a] text-white' : 'text-gray-900 hover:bg-gray-50'}`}
                        >
                          Save as PDF
                          {selectedDestination === 'Save as PDF' && <Check className="w-4 h-4 text-white" />}
                        </button>
                        <button 
                          onClick={() => { setSelectedDestination('Local Printer'); setDestinationDropdownOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between ${selectedDestination === 'Local Printer' ? 'bg-[#0f172a] text-white' : 'text-gray-900 hover:bg-gray-50'}`}
                        >
                          Local Printer
                          {selectedDestination === 'Local Printer' && <Check className="w-4 h-4 text-white" />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Pages</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 shadow-sm">
                      <option>All</option>
                      <option>Current Page</option>
                      <option>Custom</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center gap-3">
                <button onClick={() => setModalType('printing')} className="flex-1 px-4 py-2.5 bg-black hover:bg-gray-900 text-white text-sm font-bold rounded-lg transition-colors shadow-md">
                  Print
                </button>
                <button onClick={() => setModalType(null)} className="flex-1 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Printing Modal (Image 3) */}
          {modalType === 'printing' && (
            <div className="bg-white w-[400px] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <Printer className="w-5 h-5 text-gray-700" />
                  <h2 className="font-bold text-gray-900">Print</h2>
                </div>
                <button onClick={() => setModalType(null)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-[72px] h-[72px] rounded-full border-[2.5px] border-black flex items-center justify-center mb-6 relative">
                  <Printer className="w-8 h-8 text-black" />
                  <div className="absolute inset-[-2.5px] rounded-full border-[2.5px] border-transparent border-t-gray-300 animate-spin"></div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Printing...</h3>
                <p className="text-sm font-medium text-gray-500 mb-8">
                  Sending document to printer
                </p>

                <div className="w-[85%] h-1.5 bg-black rounded-full mb-8"></div>

                <p className="text-sm font-medium text-gray-600">
                  Please do not close this window
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Success Toast (Image 3 Bottom Right) */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right fade-in duration-300">
          <div className="flex items-center gap-4 p-4 pr-12 bg-black text-white rounded-xl shadow-2xl relative">
            <div className="w-8 h-8 rounded-full bg-[#ffedd5]/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-[#e06822] stroke-[3]" />
            </div>
            <div>
              <h4 className="text-sm font-bold">PDF Saved Successfully</h4>
              <p className="text-xs text-gray-400 font-medium mt-0.5">invoice_DML_981.pdf (245 KB)</p>
            </div>
            <button onClick={() => setShowToast(false)} className="absolute right-4 text-gray-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
    </div>
  )
}
