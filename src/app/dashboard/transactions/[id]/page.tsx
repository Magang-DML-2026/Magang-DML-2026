import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  CheckCircle2, 
  Settings, 
  ClipboardList, 
  Info, 
  Calendar, 
  Truck, 
  ArrowLeft, 
  Download, 
  HeadphonesIcon
} from "lucide-react";

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Resolve params
  const resolvedParams = await params;
  const transactionId = resolvedParams.id;

  return (
    <div className="p-8 max-w-[900px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      {/* Header & Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-4">
          <Link href="/dashboard" className="hover:text-zinc-800 transition-colors">Dashboard</Link>
          <span className="text-zinc-300">›</span>
          <span className="text-[#cc4224]">Transaction Detail</span>
        </div>
        
        <div className="flex justify-between items-center">
          <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight">
            Detail Transaksi #{transactionId}
          </h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff6b4a] text-white text-[13px] font-semibold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            In Production
          </span>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Card 1: Manufacturing Timeline */}
        <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-8">
            Manufacturing Timeline
          </h2>
          
          <div className="relative flex justify-between items-center px-4">
            {/* Connecting Lines */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-200 z-0"></div>
            {/* Active Line (up to Production) */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#cc4224] z-0" style={{ width: '60%' }}></div>

            {/* Step 1: Design */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center ring-4 ring-white">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[13px] font-bold text-zinc-900">Design</span>
            </div>

            {/* Step 2: Prototype */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center ring-4 ring-white">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[13px] font-bold text-zinc-900">Prototype</span>
            </div>

            {/* Step 3: Production (Active) */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#cc4224] text-white flex items-center justify-center ring-4 ring-white shadow-md shadow-[#cc4224]/30 -mt-1">
                <Settings className="w-6 h-6 animate-[spin_4s_linear_infinite]" />
              </div>
              <span className="text-[13px] font-bold text-[#cc4224]">Production</span>
            </div>

            {/* Step 4: Quality Control */}
            <div className="relative z-10 flex flex-col items-center gap-3 opacity-40">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-zinc-300 text-zinc-400 flex items-center justify-center ring-4 ring-white">
                <ClipboardList className="w-5 h-5" />
              </div>
              <span className="text-[13px] font-bold text-zinc-400">Quality Control</span>
            </div>
          </div>
        </div>

        {/* Card 2: Product Information */}
        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="p-6 flex justify-between items-center bg-zinc-50/50 border-b border-zinc-100">
            <h2 className="text-[16px] font-bold text-zinc-900">
              Product Information
            </h2>
            <span className="text-[12px] font-bold text-zinc-600 bg-zinc-100 px-3 py-1 rounded-md">
              SKU: RL-EPDM-902
            </span>
          </div>
          
          <div className="p-6 flex flex-col md:flex-row gap-8">
            {/* Image Placeholder */}
            <div className="w-full md:w-1/3 shrink-0">
              <div className="aspect-square bg-zinc-200 rounded-lg overflow-hidden relative border border-zinc-100">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621252179022-297eb0981e64?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply opacity-90"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
            
            {/* Details */}
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">EPDM Rubber Seals</h3>
              <p className="text-[14px] text-zinc-500 leading-relaxed mb-8">
                High-durability automotive grade seals with weather resistance and chemical stability for industrial fluid management.
              </p>
              
              <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Quantity</p>
                  <p className="text-[15px] font-bold text-zinc-900">5,000 Pcs</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Material</p>
                  <p className="text-[15px] font-bold text-zinc-900">EPDM 70 ShA</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Process</p>
                  <p className="text-[15px] font-bold text-zinc-900">Injection Molding</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Precision</p>
                  <p className="text-[15px] font-bold text-zinc-900">±0.05mm</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Black Footer Status */}
          <div className="bg-black text-white p-4 flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#cc4224]/20 flex items-center justify-center text-[#cc4224]">
              <Info className="w-4 h-4" />
            </div>
            <p className="text-[13px] text-zinc-300">
              Current Phase: <span className="font-semibold text-white">Molding Phase - 3,200 of 5,000 units completed.</span>
            </p>
          </div>
        </div>

        {/* Card 3: Logistics & Financials Grid */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
            
            {/* Logistics Section */}
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
              Manufacturing Logistics
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                <Calendar className="w-5 h-5 text-[#cc4224] mt-0.5" />
                <div>
                  <p className="text-[11px] text-zinc-500 mb-0.5">Estimated Delivery</p>
                  <p className="text-[15px] font-bold text-zinc-900">Oct 24, 2023</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-zinc-200">
                <Truck className="w-5 h-5 text-zinc-700 mt-0.5" />
                <div>
                  <p className="text-[11px] text-zinc-500 mb-0.5">Carrier</p>
                  <p className="text-[15px] font-bold text-zinc-900">Duta Logistics Express</p>
                </div>
              </div>
            </div>

            {/* Financial Summary Section */}
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
              Financial Summary
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-zinc-500">Unit Price (5k qty)</span>
                <span className="font-medium text-zinc-900">$2.20</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-zinc-500">Subtotal</span>
                <span className="font-medium text-zinc-900">$11,000.00</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-zinc-500">VAT (12.7%)</span>
                <span className="font-medium text-zinc-900">$1,400.00</span>
              </div>
              
              <div className="w-full h-[1px] bg-zinc-200 my-2"></div>
              
              <div className="flex justify-between items-end pt-2">
                <span className="text-[20px] font-bold text-zinc-900">Total<br/>Amount</span>
                <span className="text-[28px] font-bold text-[#cc4224]">$12,400.00</span>
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 pb-12">
          <Link 
            href="/dashboard"
            className="flex items-center gap-2 text-[14px] font-bold text-zinc-600 hover:text-zinc-900 transition-colors w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border-2 border-zinc-800 text-zinc-900 font-bold text-[14px] hover:bg-zinc-50 transition-colors">
              <Download className="w-4 h-4" />
              Download Invoice
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#cc4224] text-white font-bold text-[14px] hover:bg-[#b0351b] transition-colors">
              <HeadphonesIcon className="w-4 h-4" />
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
