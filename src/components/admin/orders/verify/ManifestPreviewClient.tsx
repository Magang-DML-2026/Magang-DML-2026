"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Printer, Download, Info } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { Receipt } from "@/components/admin/orders/receiptData";

type Props = {
  receipt: Receipt;
};

const orderItems = [
  { sku: "RB-GSK-0012-C", description: "Custom Rubber Gasket", qty: 500, unit: "PCS", spec: "Shore A 70, EPDM, High Heat Resistance" },
  { sku: "ML-SEL-9941-P", description: "Precision Molding Seal", qty: 1200, unit: "PCS", spec: "NBR-70, Oil Resistant, Blue Tone Finish" },
  { sku: "NL-SEL-9945-X", description: "Industrial Extrusion Strip", qty: 150, unit: "MTR", spec: "Reinforced Viton, 15mm Width" },
];

export function ManifestPreviewClient({ receipt }: Props) {
  const router = useRouter();
  const componentRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // 1. Print logic using react-to-print
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Manifest_${receipt.orderId}`,
  });

  // 2. Download PDF logic using html-to-image & jspdf
  const handleDownloadPdf = async () => {
    if (!componentRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const element = componentRef.current;
      // Use html-to-image instead of html2canvas to fix lab() color parsing errors
      const dataUrl = await toPng(element, { 
        pixelRatio: 2, 
        backgroundColor: "#ffffff",
      });
      
      // A4 paper size is 210 x 297 mm
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      // We get width/height of the original DOM element to calculate ratio
      const rect = element.getBoundingClientRect();
      const pdfHeight = (rect.height * pdfWidth) / rect.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Manifest_${receipt.orderId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col font-sans">
      {/* ── Top Action Bar ────────────────────────── */}
      <div className="h-[72px] bg-white border-b border-zinc-200 px-8 flex items-center justify-between sticky top-0 z-10 shrink-0 shadow-sm">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-3 text-black font-semibold hover:text-zinc-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Order Manifest Preview
        </button>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => handlePrint()}
            className="px-5 py-2.5 rounded-lg border border-zinc-200 bg-white text-black font-semibold text-sm hover:bg-zinc-50 transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            PRINT
          </button>
          <button 
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="px-5 py-2.5 rounded-lg bg-[#d94a26] text-white font-semibold text-sm hover:bg-[#c24222] transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            {isGeneratingPdf ? "GENERATING..." : "DOWNLOAD PDF"}
          </button>
        </div>
      </div>

      {/* ── Document Container ─────────────────────── */}
      <div className="flex-1 overflow-y-auto py-10 px-4 flex justify-center">
        {/* A4 Paper styling */}
        <div 
          ref={componentRef}
          className="bg-white shadow-xl max-w-[800px] w-full p-10 lg:p-14 text-black relative"
          style={{ minHeight: "1131px" }} // Approx A4 ratio
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <div>
                <h1 className="font-black text-xl tracking-tight">PT DUTA MITRA LUHUR</h1>
                <p className="text-zinc-500 text-sm font-medium tracking-wide">MANUFACTURING & INDUSTRIAL SOLUTIONS</p>
                <div className="text-[10px] text-zinc-400 mt-2 leading-relaxed">
                  Kawasan Industri Jababeka, Jl. Jababeka XVII No. 45<br/>
                  Cikarang, Bekasi, Jawa Barat 17530, Indonesia<br/>
                  P: +62 21 893 4567 | E: logistics@dml-industrial.co.id
                </div>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-[#d94a26] font-black text-lg tracking-widest uppercase mb-2">Manifest</h2>
              <table className="text-xs text-zinc-600 text-right ml-auto border-separate border-spacing-y-1">
                <tbody>
                  <tr><td className="pr-3 font-semibold text-black">No:</td><td className="font-bold text-black">OM/2024/05/1284</td></tr>
                  <tr><td className="pr-3">Date:</td><td>May 24, 2024</td></tr>
                  <tr><td className="pr-3">Warehouse:</td><td>WH-02 (Cikarang)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Blocks */}
          <div className="grid grid-cols-2 gap-8 mb-10">
            {/* Bill To */}
            <div>
              <div className="bg-[#d94a26] text-white text-[10px] font-bold px-3 py-1 inline-block uppercase tracking-wider mb-3">Bill To</div>
              <h3 className="font-bold text-lg mb-1">{receipt.customerName}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Procurement Director<br/>
                Global Auto Parts Corp.<br/>
                123 Industrial Way, Sector 4<br/>
                Jakarta Selatan, 12730<br/>
                <span className="font-semibold text-black mt-1 block">T: +62 812 3456 7890</span>
              </p>
            </div>
            
            {/* Logistics Details */}
            <div className="bg-blue-50/50 p-4 border-l-4 border-blue-200">
              <div className="bg-blue-100 text-blue-800 text-[10px] font-bold px-3 py-1 inline-block uppercase tracking-wider mb-3">Logistics Details</div>
              <table className="text-xs w-full border-separate border-spacing-y-2">
                <tbody>
                  <tr><td className="text-zinc-500 w-24">Carrier:</td><td className="font-bold">DML Logistics Express</td></tr>
                  <tr><td className="text-zinc-500">Vehicle ID:</td><td className="font-bold">B 9042 SFM</td></tr>
                  <tr><td className="text-zinc-500">Load Weight:</td><td className="font-bold">245.50 kg</td></tr>
                  <tr><td className="text-zinc-500">Priority:</td><td className="font-bold text-[#d94a26]">URGENT</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-sm mb-10 border-collapse">
            <thead>
              <tr className="bg-black text-white text-xs uppercase tracking-wider">
                <th className="py-3 px-4 text-left w-[20%]">SKU / Item Code</th>
                <th className="py-3 px-4 text-left w-[35%]">Description</th>
                <th className="py-3 px-4 text-center w-[10%]">QTY</th>
                <th className="py-3 px-4 text-center w-[10%]">Unit</th>
                <th className="py-3 px-4 text-right w-[25%]">Specification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {orderItems.map((item, i) => (
                <tr key={i} className="group">
                  <td className="py-4 px-4 text-[#d94a26] font-mono text-xs">{item.sku}</td>
                  <td className="py-4 px-4 font-bold">{item.description}</td>
                  <td className="py-4 px-4 text-center font-bold">{item.qty.toLocaleString()}</td>
                  <td className="py-4 px-4 text-center text-zinc-500">{item.unit}</td>
                  <td className="py-4 px-4 text-right text-xs text-zinc-500">{item.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Info */}
          <div className="grid grid-cols-[2fr_1fr] gap-6 mb-16">
            <div className="bg-zinc-50 border border-zinc-200 p-4 rounded text-xs text-zinc-600 leading-relaxed">
              <div className="flex items-center gap-1.5 text-[#d94a26] font-bold mb-2">
                <Info className="w-4 h-4" />
                Handling Instructions
              </div>
              Maintain storage temperature between 15°C and 25°C. Keep away from direct sunlight and ozone sources. Rubber components are sensitive to UV exposure. Batch numbers must be recorded upon arrival at the destination warehouse for traceability compliance.
            </div>
            <div className="border-2 border-dashed border-zinc-300 rounded p-4 flex flex-col items-center justify-center">
              {/* Fake barcode using simple lines */}
              <div className="flex gap-[2px] h-12 w-full mb-2 opacity-80">
                <div className="w-1 bg-black h-full"></div><div className="w-0.5 bg-black h-full"></div><div className="w-2 bg-black h-full"></div><div className="w-1 bg-black h-full"></div>
                <div className="w-0.5 bg-black h-full"></div><div className="w-1 bg-black h-full"></div><div className="w-3 bg-black h-full"></div><div className="w-0.5 bg-black h-full"></div>
                <div className="w-2 bg-black h-full"></div><div className="w-1 bg-black h-full"></div><div className="w-1 bg-black h-full"></div><div className="w-2 bg-black h-full"></div>
                <div className="w-0.5 bg-black h-full"></div><div className="w-2 bg-black h-full"></div><div className="w-1 bg-black h-full"></div><div className="w-1 bg-black h-full"></div>
                <div className="w-2 bg-black h-full"></div><div className="w-0.5 bg-black h-full"></div><div className="w-1 bg-black h-full"></div><div className="w-3 bg-black h-full"></div>
              </div>
              <p className="font-mono text-[10px] tracking-[0.3em] font-bold text-center">OM-2024-05-1284</p>
              <p className="text-[7px] text-zinc-400 font-bold uppercase mt-1">Warehouse Scan Authorized Only</p>
            </div>
          </div>

          {/* Signatures */}
          <div className="flex justify-between items-end px-4 mt-auto">
            <div className="text-center w-40">
              <div className="border-b border-zinc-400 mb-2 h-16"></div>
              <p className="font-bold text-xs">Logistics Supervisor</p>
              <p className="text-[10px] text-zinc-500">Warehouse Team</p>
            </div>
            
            <div className="text-center">
              {/* Fake stamp */}
              <div className="w-20 h-20 rounded-full border-4 border-[#d94a26]/30 mx-auto flex items-center justify-center rotate-[-15deg] mb-2">
                <div className="w-16 h-16 rounded-full border-2 border-[#d94a26]/20 flex items-center justify-center text-center">
                  <p className="text-[#d94a26]/40 text-[7px] font-black uppercase tracking-widest leading-tight">PT Duta Mitra<br/>Luhur<br/>Verified</p>
                </div>
              </div>
              <p className="font-bold text-xs">System Generated</p>
              <p className="text-[10px] text-zinc-500">DML Admin Portal v2.4</p>
            </div>

            <div className="text-center w-40">
              <div className="border-b border-zinc-400 mb-2 h-16"></div>
              <p className="font-bold text-xs">Receiver Signature</p>
              <p className="text-[10px] text-zinc-500">Client Acceptance</p>
            </div>
          </div>

          {/* Document Footer */}
          <div className="absolute bottom-6 left-10 right-10 flex justify-between text-[8px] text-zinc-400 font-mono tracking-widest uppercase border-t border-zinc-100 pt-4">
            <span>Ref: ISO 9001:2015 Certified Manufacturing</span>
            <span>Page 01 of 01</span>
            <span>Digital ID: 8B42-XLM-0092-DML</span>
          </div>
        </div>
      </div>
    </div>
  );
}
