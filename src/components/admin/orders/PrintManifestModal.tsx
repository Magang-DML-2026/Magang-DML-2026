"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Printer, Settings2, Info, Check, RotateCcw, FileClock } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
};

type ModalState = "settings" | "success";

export function PrintManifestModal({ isOpen, onClose, orderId }: Props) {
  const router = useRouter();
  const [modalState, setModalState] = useState<ModalState>("settings");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={modalState === "settings" ? onClose : undefined} />
      
      {modalState === "settings" ? (
        // ── Settings & Preview State ──
        <div className="bg-[#eef0f2] rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] overflow-hidden relative flex animate-in fade-in zoom-in duration-300">
          
          {/* Left Sidebar: Controls */}
          <div className="w-[320px] bg-zinc-50 border-r border-zinc-200 p-6 flex flex-col shrink-0">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#f05c35] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/20">
                <Printer className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-black leading-tight">Preparing to Print</h2>
                <p className="text-xs text-zinc-500">Manifest #{orderId}</p>
              </div>
            </div>

            <div className="space-y-6 flex-1">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Printer</label>
                <select className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2.5 text-sm font-medium text-black outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200">
                  <option>Warehouse_B_Label_04</option>
                  <option>Admin_Office_HP_M507</option>
                  <option>Logistics_Zebra_ZT411</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Copies</label>
                <input 
                  type="number" 
                  defaultValue={3}
                  className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2.5 text-sm font-medium text-black outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Paper Size</label>
                <div className="relative">
                  <select className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2.5 text-sm font-medium text-black outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 appearance-none">
                    <option>Industrial Label (4×6)</option>
                    <option>A4 Document</option>
                    <option>Thermal Receipt</option>
                  </select>
                  <Settings2 className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="bg-orange-100 border border-orange-200 rounded-lg p-3 flex gap-3 text-xs text-orange-900 mt-4">
                <Info className="w-4 h-4 text-[#f05c35] shrink-0 mt-0.5" />
                <p>System is formatting barcodes for high-speed thermal printers.</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <button 
                onClick={() => setModalState("success")}
                className="w-full py-3 bg-[#b2391b] hover:bg-[#912d14] text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
              >
                Confirm Print
              </button>
              <button 
                onClick={onClose}
                className="w-full py-3 bg-transparent border border-zinc-300 text-zinc-700 font-bold text-sm rounded-xl transition-colors hover:bg-zinc-100"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Right Area: Document Preview */}
          <div className="flex-1 bg-zinc-200/50 p-8 overflow-y-auto flex justify-center items-start relative">
            {/* Background decorative watermark */}
            <div className="absolute top-10 left-10 text-[200px] font-black text-black/5 tracking-tighter pointer-events-none select-none">
              DML
            </div>

            {/* Document Paper */}
            <div className="bg-white shadow-xl w-full max-w-[500px] relative mt-4">
              
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start border-b-[3px] border-black pb-4 mb-6">
                  <div>
                    <h1 className="text-xl font-black tracking-tight leading-none mb-1">PT DUTA MITRA LUHUR</h1>
                    <p className="text-[10px] text-zinc-600">Manufacturing & Rubber Precision Engineering</p>
                    <p className="text-[9px] text-zinc-500 mt-2">Jl. Industri Raya No. 42, Tangerang, Banten</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <span className="bg-black text-white text-[8px] font-bold px-2 py-1 tracking-widest uppercase">Official Order Manifest</span>
                    <p className="font-bold text-sm leading-none mt-1">#{orderId}</p>
                    <p className="text-[9px] text-zinc-600">Date: Nov 24, 2024</p>
                  </div>
                </div>

                {/* Info Blocks */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border border-zinc-200 p-3 rounded">
                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Consignee (Shipping To)</p>
                    <p className="font-bold text-xs mb-1">Global Tech Solutions Ltd.</p>
                    <p className="text-[9px] text-zinc-600 leading-relaxed">
                      123 Logistics Way, Sector 4<br/>
                      Singapore 654321<br/>
                      Attn: Warehouse Manager
                    </p>
                  </div>
                  <div className="border border-zinc-200 p-3 rounded">
                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Carrier Details</p>
                    <p className="font-bold text-xs mb-1">DML Express Logistics</p>
                    <p className="text-[9px] text-zinc-600 leading-relaxed">
                      Tracking ID: TRK-9283-XJ<br/>
                      Priority: High (Industrial)<br/>
                      Vehicle: B-9034-XYU
                    </p>
                  </div>
                </div>

                {/* Items Table */}
                <table className="w-full text-xs mb-8">
                  <thead>
                    <tr className="bg-black text-white text-left">
                      <th className="py-2 px-3 font-bold text-[9px] w-[50%]">Item Description</th>
                      <th className="py-2 px-3 font-bold text-[9px] text-center">Qty</th>
                      <th className="py-2 px-3 font-bold text-[9px] text-center">SKU</th>
                      <th className="py-2 px-3 font-bold text-[9px] text-right">Net Wt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 font-medium">
                    <tr>
                      <td className="py-3 px-3">
                        <p className="font-bold text-black mb-0.5">Custom Rubber Gasket (Industrial-Grade)</p>
                        <p className="text-[9px] text-zinc-500 italic">Spec: 45mm x 4mm Shore A 70</p>
                      </td>
                      <td className="py-3 px-3 text-center font-bold">1,200</td>
                      <td className="py-3 px-3 text-center text-[10px]">RG-4570-C</td>
                      <td className="py-3 px-3 text-right">145 kg</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3">
                        <p className="font-bold text-black mb-0.5">Precision Molding Seal - Series X</p>
                        <p className="text-[9px] text-zinc-500 italic">Spec: Nitrile Rubber (NBR)</p>
                      </td>
                      <td className="py-3 px-3 text-center font-bold">450</td>
                      <td className="py-3 px-3 text-center text-[10px]">MS-X-NBR</td>
                      <td className="py-3 px-3 text-right">32 kg</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3">
                        <p className="font-bold text-black mb-0.5">Heavy Duty Industrial O-Ring Kit</p>
                        <p className="text-[9px] text-zinc-500 italic">Bulk Pack - 100pc units</p>
                      </td>
                      <td className="py-3 px-3 text-center font-bold">15</td>
                      <td className="py-3 px-3 text-center text-[10px]">OR-KIT-BULK</td>
                      <td className="py-3 px-3 text-right">12 kg</td>
                    </tr>
                  </tbody>
                </table>

                {/* Footer Section */}
                <div className="flex justify-between items-end border-t-[3px] border-black pt-4">
                  
                  <div className="w-[180px]">
                    <div className="border border-dashed border-zinc-400 p-2 text-center mb-2">
                      <div className="flex justify-center gap-0.5 h-8 mb-1">
                        <div className="w-1 bg-black h-full"></div><div className="w-0.5 bg-black h-full"></div><div className="w-2 bg-black h-full"></div><div className="w-1 bg-black h-full"></div>
                        <div className="w-1.5 bg-black h-full"></div><div className="w-0.5 bg-black h-full"></div><div className="w-1 bg-black h-full"></div><div className="w-1.5 bg-black h-full"></div>
                        <div className="w-0.5 bg-black h-full"></div><div className="w-2 bg-black h-full"></div><div className="w-1 bg-black h-full"></div><div className="w-1 bg-black h-full"></div>
                        <div className="w-1 bg-black h-full"></div><div className="w-1.5 bg-black h-full"></div><div className="w-0.5 bg-black h-full"></div><div className="w-1 bg-black h-full"></div>
                      </div>
                      <p className="font-mono text-[8px] font-bold tracking-widest text-black">*DML-9921-XJ-2024*</p>
                    </div>
                    <p className="text-[7px] text-zinc-400 leading-tight">Certified by Quality Control: Jan 24, 2024. All materials meet ISO 9001:2015 standards. Unauthorized duplication of this manifest is prohibited.</p>
                  </div>

                  <div className="text-xs">
                    <table className="text-right">
                      <tbody>
                        <tr><td className="pr-4 py-0.5 text-zinc-500">Total Gross Wt:</td><td className="font-medium">194.2 kg</td></tr>
                        <tr><td className="pr-4 py-0.5 text-zinc-500">Total Packages:</td><td className="font-medium">14 Units</td></tr>
                        <tr><td colSpan={2}><div className="my-1 border-b border-zinc-300"></div></td></tr>
                        <tr><td className="pr-4 py-1 font-bold">Total Value:</td><td className="font-black">PRE-PAID</td></tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>

              {/* Outside elements attached to paper */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#001b3a] text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md">
                Page 1 of 1
              </div>
              <div className="absolute -bottom-6 -right-10 w-24 h-24 border-2 border-dashed border-[#d94a26]/50 rounded-full flex items-center justify-center rotate-[-15deg] shadow-sm bg-[#faf6f3]">
                <p className="text-[#d94a26] font-black text-[9px] uppercase text-center leading-tight tracking-wider">
                  Quality Passed<br/>
                  <span className="text-[6px] font-bold text-[#d94a26]/70">DML WH-B Tangerang</span>
                </p>
              </div>

            </div>
          </div>

        </div>
      ) : (
        // ── Success State ──
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative flex flex-col items-center text-center animate-in zoom-in duration-200">
          <div className="w-full h-1 bg-[#d94a26]"></div>
          
          <div className="p-10 w-full flex flex-col items-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 relative">
              <div className="w-16 h-16 bg-[#b2391b] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 z-10">
                <Check className="w-8 h-8 text-white" strokeWidth={4} />
              </div>
              <div className="absolute inset-0 border-8 border-white rounded-full scale-110"></div>
            </div>

            <h2 className="text-2xl font-black text-black mb-4 leading-tight">
              Manifest Printed<br/>Successfully
            </h2>
            <p className="text-sm text-zinc-500 mb-8 leading-relaxed max-w-[280px]">
              Manifest <span className="font-bold text-black">#{orderId}</span> has been sent to the primary warehouse printer and logged in the system.
            </p>

            <div className="w-full flex flex-col gap-3">
              <button 
                onClick={onClose}
                className="w-full py-3.5 bg-[#b2391b] hover:bg-[#912d14] text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Return to Order
              </button>
              <button 
                onClick={() => router.push(`/admin/orders/${orderId}/print-log`)}
                className="w-full py-3.5 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 text-black font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <FileClock className="w-4 h-4" />
                View Print Log
              </button>
            </div>
          </div>
          
          {/* Footer Bar */}
          <div className="w-full bg-zinc-50 border-t border-zinc-200 py-3 px-6 flex justify-between items-center text-[9px] uppercase tracking-wider font-bold text-zinc-500">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d94a26]"></div>
              System Synchronized
            </div>
            <span>Ref: 001-A9-Z</span>
          </div>
        </div>
      )}
    </div>
  );
}
