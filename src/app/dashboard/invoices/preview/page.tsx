import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Printer, Settings2, Download, ArrowLeft, ChevronDown, Check } from "lucide-react";

export default async function InvoicePrintPreviewPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-zinc-800 font-sans flex flex-col md:flex-row">
      
      {/* Left Panel: Print Settings */}
      <div className="w-full md:w-[350px] bg-white h-screen flex flex-col shadow-2xl z-10 shrink-0">
        
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
              <label className="border-2 border-[#cc4224] bg-[#fdf5f3] py-2 px-3 rounded-lg cursor-pointer flex items-center justify-center gap-2">
                <input type="radio" name="color" className="hidden" defaultChecked />
                <div className="w-4 h-4 rounded-full border border-[#cc4224] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#cc4224]"></div>
                </div>
                <span className="text-[13px] font-bold text-zinc-900">Berwarna</span>
              </label>
              <label className="border-2 border-zinc-200 bg-white py-2 px-3 rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:border-zinc-300">
                <input type="radio" name="color" className="hidden" />
                <div className="w-4 h-4 rounded-full border border-zinc-300 flex items-center justify-center">
                </div>
                <span className="text-[13px] font-bold text-zinc-500">Hitam Putih</span>
              </label>
            </div>
          </div>
          
          <button className="flex items-center gap-2 text-[13px] font-bold text-[#cc4224] hover:underline">
            <Settings2 className="w-4 h-4" /> Pengaturan Lainnya
          </button>

        </div>

        <div className="p-6 border-t border-zinc-200 flex gap-3 bg-zinc-50">
          <Link href="/dashboard/invoices" className="flex-1 py-3 bg-white border border-zinc-300 text-zinc-700 font-bold text-[14px] rounded-lg hover:bg-zinc-100 transition-colors text-center">
            Batal
          </Link>
          <button className="flex-1 py-3 bg-[#cc4224] text-white font-bold text-[14px] rounded-lg hover:bg-[#b0351b] transition-colors shadow-sm flex items-center justify-center gap-2">
            <Printer className="w-4 h-4" /> Cetak
          </button>
        </div>
      </div>

      {/* Right Panel: A4 Print Preview Area */}
      <div className="flex-1 h-screen overflow-y-auto p-8 flex justify-center custom-scrollbar">
        
        {/* A4 Paper Mockup */}
        <div className="w-full max-w-[794px] min-h-[1123px] bg-white shadow-2xl rounded-sm p-12 shrink-0">
           
           {/* Invoice Header */}
           <div className="flex justify-between items-start border-b-2 border-zinc-800 pb-8 mb-8">
             <div>
               <h1 className="text-[32px] font-black text-zinc-900 tracking-tighter uppercase">INVOICE</h1>
               <p className="text-[14px] text-zinc-500 font-medium tracking-widest mt-1">#INV-2026-004</p>
             </div>
             <div className="text-right">
               <h2 className="text-[18px] font-bold text-zinc-900">PT Duta Mitra Luhur</h2>
               <p className="text-[12px] text-zinc-600 mt-1">Kawasan Industri Cikarang No. 12<br/>Bekasi, Jawa Barat 17530<br/>contact@dutamitraluhur.com</p>
             </div>
           </div>
           
           {/* Info */}
           <div className="flex justify-between mb-12">
             <div>
               <p className="text-[12px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Tagihan Kepada:</p>
               <p className="text-[16px] font-bold text-zinc-900">{session.userName}</p>
               <p className="text-[13px] text-zinc-600 mt-1 leading-relaxed">
                 Perusahaan Klien B2B<br/>
                 Jl. Sudirman Kav 45, Jakarta Pusat<br/>
                 10220
               </p>
             </div>
             <div className="text-right">
               <div className="mb-4">
                 <p className="text-[12px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Tanggal Invoice</p>
                 <p className="text-[14px] font-bold text-zinc-900">18 Oktober 2026</p>
               </div>
               <div>
                 <p className="text-[12px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Jatuh Tempo</p>
                 <p className="text-[14px] font-bold text-[#cc4224]">18 November 2026</p>
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
               <tr className="border-b border-zinc-200">
                 <td className="py-6">
                   <p className="text-[14px] font-bold text-zinc-900">EPDM Rubber Seals</p>
                   <p className="text-[12px] text-zinc-500 mt-1">Material: EPDM 70 ShA, Proses: Injection Molding</p>
                 </td>
                 <td className="py-6 text-[14px] text-zinc-900 text-center font-medium">5,000 Pcs</td>
                 <td className="py-6 text-[14px] text-zinc-900 text-right font-medium">Rp 10.000</td>
                 <td className="py-6 text-[14px] font-bold text-zinc-900 text-right">Rp 50.000.000</td>
               </tr>
               <tr className="border-b border-zinc-200">
                 <td className="py-6">
                   <p className="text-[14px] font-bold text-zinc-900">Biaya Pengiriman (LTL)</p>
                   <p className="text-[12px] text-zinc-500 mt-1">Kargo Darat - Estimasi 2-3 Hari</p>
                 </td>
                 <td className="py-6 text-[14px] text-zinc-900 text-center font-medium">1 Lumpsum</td>
                 <td className="py-6 text-[14px] text-zinc-900 text-right font-medium">Rp 1.500.000</td>
                 <td className="py-6 text-[14px] font-bold text-zinc-900 text-right">Rp 1.500.000</td>
               </tr>
             </tbody>
           </table>
           
           {/* Summary */}
           <div className="flex justify-end mb-16">
             <div className="w-1/2 max-w-[300px]">
               <div className="flex justify-between py-2 text-[13px]">
                 <span className="text-zinc-600">Subtotal</span>
                 <span className="font-bold text-zinc-900">Rp 51.500.000</span>
               </div>
               <div className="flex justify-between py-2 text-[13px] border-b border-zinc-200 mb-2">
                 <span className="text-zinc-600">PPN (11%)</span>
                 <span className="font-bold text-zinc-900">Rp 5.500.000</span>
               </div>
               <div className="flex justify-between py-3">
                 <span className="text-[16px] font-black text-zinc-900 uppercase">Total Tagihan</span>
                 <span className="text-[18px] font-black text-[#cc4224]">Rp 57.000.000</span>
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
