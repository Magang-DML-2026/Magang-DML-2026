"use client";

import { useState } from "react";
import Link from "next/link";
import { Printer, Settings2, ArrowLeft, ChevronDown } from "lucide-react";

type InvoicePrintPreviewClientProps = {
  tx: any;
  items: any[];
  deliveryAddress: any;
  userName: string;
  txDateIso: string;
  dueDateIso: string;
};

export default function InvoicePrintPreviewClient({
  tx,
  items,
  deliveryAddress,
  userName,
  txDateIso,
  dueDateIso,
}: InvoicePrintPreviewClientProps) {
  const [layout, setLayout] = useState<"portrait" | "landscape">("portrait");
  const [colorMode, setColorMode] = useState<"color" | "bw">("color");
  const [showMoreSettings, setShowMoreSettings] = useState(false);
  
  const txDate = new Date(txDateIso);
  const dueDate = new Date(dueDateIso);

  const handlePrint = async () => {
    // Attempt to log the print action to the database
    try {
      await fetch('/api/print-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentName: `Invoice #DML-2026-${tx.id.toString().padStart(3, '0')}`,
          documentType: 'Invoice',
          destination: 'Browser Print Spooler',
          status: 'Completed'
        })
      });
    } catch (e) {
      console.error("Failed to log print action", e);
    }
    window.print();
  };

  return (
    <div className="h-[calc(100vh-89px)] bg-zinc-800 font-sans flex flex-col md:flex-row print-container">
      
      {/* Dynamic Print Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: ${layout === 'portrait' ? 'portrait' : 'landscape'};
            margin: 10mm;
          }
          
          /* Hide non-printable elements globally */
          header, aside, .no-print {
            display: none !important;
          }

          /* Reset all containers to normal document flow to allow pagination */
          html, body, main, .print-container, .custom-scrollbar {
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            display: block !important;
            position: static !important;
            background: white !important;
          }

          .print-area {
            width: 100% !important;
            max-width: none !important;
            min-height: 0 !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}} />

      {/* Left Panel: Print Settings (Hidden when printing) */}
      <div className="w-full md:w-[350px] bg-white h-full flex flex-col shadow-2xl z-10 shrink-0 no-print">
        
        <div className="p-6 border-b border-zinc-200 flex items-center gap-4 bg-zinc-50">
          <Link href="/dashboard/invoices" className="p-2 -ml-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-[18px] font-bold text-zinc-900">Cetak Invoice</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          <div>
            <label className="block text-[13px] font-bold text-zinc-700 mb-2">Tujuan</label>
            <div className="relative">
              <select className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[14px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all appearance-none cursor-pointer font-medium">
                <option>Simpan sebagai PDF</option>
                <option>Microsoft Print to PDF</option>
                <option>Epson L3110 Series</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-[13px] font-bold text-zinc-700 mb-2">Layout</label>
            <div className="relative">
              <select 
                value={layout}
                onChange={(e) => setLayout(e.target.value as "portrait" | "landscape")}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[14px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all appearance-none cursor-pointer font-medium"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-[13px] font-bold text-zinc-700 mb-2">Halaman</label>
            <div className="relative">
              <select className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[14px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all appearance-none cursor-pointer font-medium">
                <option>Semua (1 halaman)</option>
                <option>Kustom</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-zinc-700 mb-2">Warna</label>
            <div className="grid grid-cols-2 gap-3">
              <label 
                className={`border-2 py-2 px-3 rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-all ${colorMode === 'color' ? 'border-[#cc4224] bg-[#fdf5f3]' : 'border-zinc-200 bg-white hover:border-zinc-300'}`}
                onClick={() => setColorMode('color')}
              >
                <input type="radio" name="color" className="hidden" checked={colorMode === 'color'} readOnly />
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${colorMode === 'color' ? 'border-[#cc4224]' : 'border-zinc-300'}`}>
                  {colorMode === 'color' && <div className="w-2 h-2 rounded-full bg-[#cc4224]"></div>}
                </div>
                <span className={`text-[13px] font-bold ${colorMode === 'color' ? 'text-zinc-900' : 'text-zinc-500'}`}>Berwarna</span>
              </label>
              <label 
                className={`border-2 py-2 px-3 rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-all ${colorMode === 'bw' ? 'border-zinc-900 bg-zinc-100' : 'border-zinc-200 bg-white hover:border-zinc-300'}`}
                onClick={() => setColorMode('bw')}
              >
                <input type="radio" name="color" className="hidden" checked={colorMode === 'bw'} readOnly />
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${colorMode === 'bw' ? 'border-zinc-900' : 'border-zinc-300'}`}>
                  {colorMode === 'bw' && <div className="w-2 h-2 rounded-full bg-zinc-900"></div>}
                </div>
                <span className={`text-[13px] font-bold ${colorMode === 'bw' ? 'text-zinc-900' : 'text-zinc-500'}`}>Hitam Putih</span>
              </label>
            </div>
          </div>
          
          <button 
            onClick={() => setShowMoreSettings(!showMoreSettings)}
            className="flex items-center gap-2 text-[13px] font-bold text-[#cc4224] hover:underline"
          >
            <Settings2 className="w-4 h-4" /> {showMoreSettings ? "Sembunyikan Pengaturan" : "Pengaturan Lainnya"}
          </button>

          {showMoreSettings && (
            <div className="space-y-6 pt-4 border-t border-zinc-200">
              <div>
                <label className="block text-[13px] font-bold text-zinc-700 mb-2">Skala</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[14px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all appearance-none cursor-pointer font-medium">
                    <option>Default</option>
                    <option>Sesuaikan ke Area Cetak</option>
                    <option>Kustom</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-zinc-700 mb-2">Margin</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[14px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#cc4224]/20 focus:border-[#cc4224] transition-all appearance-none cursor-pointer font-medium">
                    <option>Default</option>
                    <option>Tanpa Margin</option>
                    <option>Minimum</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-[#cc4224] focus:ring-[#cc4224]" defaultChecked />
                <span className="text-[13px] font-bold text-zinc-700">Cetak Latar Belakang (Grafis)</span>
              </label>
            </div>
          )}

        </div>

        <div className="p-6 border-t border-zinc-200 flex gap-3 bg-zinc-50">
          <Link href="/dashboard/invoices" className="flex-1 py-3 bg-white border border-zinc-300 text-zinc-700 font-bold text-[14px] rounded-lg hover:bg-zinc-100 transition-colors text-center">
            Batal
          </Link>
          <button 
            onClick={handlePrint}
            className="flex-1 py-3 bg-[#cc4224] text-white font-bold text-[14px] rounded-lg hover:bg-[#b0351b] transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" /> Cetak
          </button>
        </div>
      </div>

      {/* Right Panel: A4 Print Preview Area */}
      <div className="flex-1 h-full overflow-y-auto p-8 flex justify-center custom-scrollbar">
        
        {/* A4 Paper Mockup */}
        <div 
          className={`bg-white shadow-2xl rounded-sm p-12 shrink-0 print-area transition-all duration-300 ${
            layout === 'portrait' ? 'w-full max-w-[794px] min-h-[1123px]' : 'w-full max-w-[1123px] min-h-[794px]'
          } ${colorMode === 'bw' ? 'grayscale' : ''}`}
        >
           
           {/* Invoice Header */}
           <div className="flex justify-between items-start border-b-2 border-zinc-800 pb-8 mb-8">
             <div>
               <h1 className="text-[32px] font-black text-zinc-900 tracking-tighter uppercase">INVOICE</h1>
               <p className="text-[14px] text-zinc-500 font-medium tracking-widest mt-1">#{tx.id}</p>
             </div>
             <div className="text-right">
               <h2 className="text-[18px] font-bold text-zinc-900">PT Duta Mitra Luhur</h2>
               <p className="text-[12px] text-zinc-600 mt-1">Kawasan Industri Sentra Bitung, Blok A-14<br/>Cikupa, Banten, Indonesia<br/>contact@dutamitraluhur.com</p>
             </div>
           </div>
           
           {/* Info */}
           <div className="flex justify-between mb-12">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Tagihan Kepada:</p>
                {deliveryAddress ? (
                  <>
                    <p className="text-[16px] font-bold text-zinc-900">{deliveryAddress.recipientName}</p>
                    <p className="text-[13px] text-zinc-600 mt-1 leading-relaxed">
                      {deliveryAddress.fullAddress}<br/>
                      {deliveryAddress.district}, {deliveryAddress.city}<br/>
                      {deliveryAddress.province} {deliveryAddress.postalCode}<br/>
                      {deliveryAddress.phone}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[16px] font-bold text-zinc-900">{userName}</p>
                    <p className="text-[13px] text-zinc-600 mt-1 leading-relaxed">
                      Alamat tidak tersedia
                    </p>
                  </>
                )}
              </div>
             <div className="text-right">
               <div className="mb-4">
                 <p className="text-[12px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Tanggal Invoice</p>
                 <p className="text-[14px] font-bold text-zinc-900">{txDate.toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
               </div>
               <div>
                 <p className="text-[12px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Jatuh Tempo</p>
                 <p className="text-[14px] font-bold text-[#cc4224]">{dueDate.toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
               </div>
             </div>
           </div>
           
           {/* Table */}
           <table className="w-full text-left mb-12 border-collapse">
             <thead>
               <tr className="border-y-2 border-zinc-800">
                 <th className="py-4 text-[13px] font-bold text-zinc-900 uppercase">Deskripsi Item</th>
                 <th className="py-4 text-[13px] font-bold text-zinc-900 uppercase text-center">Qty</th>
                 <th className="py-4 text-[13px] font-bold text-zinc-900 uppercase text-right">Harga Satuan</th>
                 <th className="py-4 text-[13px] font-bold text-zinc-900 uppercase text-right">Total</th>
               </tr>
             </thead>
             <tbody>
               {items.map(item => (
                 <tr key={item.id} className="border-b border-zinc-200">
                   <td className="py-6">
                     <p className="text-[14px] font-bold text-zinc-900">{item.productName}</p>
                   </td>
                   <td className="py-6 text-[14px] text-zinc-900 text-center font-medium">{item.quantity.toLocaleString("id-ID")} Pcs</td>
                   <td className="py-6 text-[14px] text-zinc-900 text-right font-medium">Rp {item.priceAtPurchase.toLocaleString("id-ID")}</td>
                   <td className="py-6 text-[14px] font-bold text-zinc-900 text-right">Rp {(item.priceAtPurchase * item.quantity).toLocaleString("id-ID")}</td>
                 </tr>
               ))}
               <tr className="border-b border-zinc-200">
                 <td className="py-6">
                   <p className="text-[14px] font-bold text-zinc-900">Biaya Pengiriman ({tx.shippingMethod || 'LTL'})</p>
                 </td>
                 <td className="py-6 text-[14px] text-zinc-900 text-center font-medium">1 Lumpsum</td>
                 <td className="py-6 text-[14px] text-zinc-900 text-right font-medium">Rp {tx.shippingCost.toLocaleString("id-ID")}</td>
                 <td className="py-6 text-[14px] font-bold text-zinc-900 text-right">Rp {tx.shippingCost.toLocaleString("id-ID")}</td>
               </tr>
             </tbody>
           </table>
           
           {/* Summary */}
           <div className="flex justify-end mb-16">
             <div className="w-1/2 max-w-[300px]">
               <div className="flex justify-between py-2 text-[13px]">
                 <span className="text-zinc-600">Subtotal</span>
                 <span className="font-bold text-zinc-900">Rp {tx.subtotal.toLocaleString("id-ID")}</span>
               </div>
               <div className="flex justify-between py-2 text-[13px] border-b border-zinc-200 mb-2">
                 <span className="text-zinc-600">PPN (11%)</span>
                 <span className="font-bold text-zinc-900">Rp {tx.taxAmount.toLocaleString("id-ID")}</span>
               </div>
               <div className="flex justify-between py-3">
                 <span className="text-[16px] font-black text-zinc-900 uppercase">Total Tagihan</span>
                 <span className="text-[18px] font-black text-[#cc4224]">Rp {tx.totalAmount.toLocaleString("id-ID")}</span>
               </div>
             </div>
           </div>
           
           {/* Footer */}
           <div className="border-t border-zinc-200 pt-8 text-[11px] text-zinc-400 text-center">
             Dokumen ini dibuat secara otomatis oleh sistem dan sah tanpa tanda tangan fisik.<br/>
             Terima kasih atas kepercayaan Anda kepada PT Duta Mitra Luhur.
           </div>

        </div>
      </div>
      
    </div>
  );
}
