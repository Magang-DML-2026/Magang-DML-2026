import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Printer, HelpCircle, Truck, Check, MapPin, Search, PackageCheck, 
  Clock, ShieldCheck, Activity, Receipt, Settings
} from "lucide-react";
import { db } from "@/db";
import { transactions, transactionItems, products, addresses } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  
  const resolvedParams = await params;
  const transactionId = resolvedParams.id;

  const txList = await db.select().from(transactions).where(eq(transactions.id, transactionId)).limit(1);
  if (txList.length === 0) redirect("/dashboard");
  const tx = txList[0];
  
  let deliveryAddress = null;
  if (tx.addressId) {
    const addrList = await db.select().from(addresses).where(eq(addresses.id, tx.addressId)).limit(1);
    deliveryAddress = addrList[0];
  } else {
    const userAddresses = await db.select().from(addresses).where(eq(addresses.userId, tx.userId));
    deliveryAddress = userAddresses.find(a => a.isDefault) || userAddresses[0];
  }

  const items = await db.select({
    id: transactionItems.id,
    productName: transactionItems.productName,
    priceAtPurchase: transactionItems.priceAtPurchase,
    quantity: transactionItems.quantity,
    imageUrl: products.imageUrl,
  }).from(transactionItems)
  .leftJoin(products, eq(transactionItems.productId, products.id))
  .where(eq(transactionItems.transactionId, transactionId));

  const status = tx.status;
  const isPaid = status !== "Menunggu Pembayaran";
  const isProcessing = ["Diproses", "Dikirim", "Selesai"].includes(status);
  const isShipped = ["Dikirim", "Selesai"].includes(status);
  const isFinished = status === "Selesai";
  
  let activeStep = 0;
  if (isFinished) activeStep = 4;
  else if (isShipped) activeStep = 3;
  else if (isProcessing) activeStep = 2;
  else if (isPaid) activeStep = 1;
  else activeStep = 0;

  const estimatedDelivery = new Date(tx.createdAt);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 14);

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto p-4 sm:p-8 flex flex-col gap-6 font-sans">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-2">
          
          <div>
            <div className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase flex gap-2 items-center mb-4">
              <Link href="/dashboard" className="hover:text-zinc-900 transition-colors">Dashboard</Link>
              <span>›</span>
              <span className="hover:text-zinc-900 transition-colors cursor-pointer">Order History</span>
              <span>›</span>
              <span className="text-zinc-900">#{transactionId}</span>
            </div>
            
            <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight mb-2">Track Your Order</h1>
            <p className="text-[12px] text-zinc-500 font-medium">
              Order ID: <strong className="text-zinc-700">#{transactionId}</strong> • Placed on {tx.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <Link href={`/dashboard/invoices/preview?txId=${transactionId}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-50 px-5 py-2 rounded text-[12px] font-bold transition-colors shadow-sm">
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </Link>
            <Link href="/dashboard/complaints" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#cc4224] text-white hover:bg-[#b0351b] px-5 py-2 rounded text-[12px] font-bold transition-colors shadow-sm">
              <HelpCircle className="w-4 h-4" />
              <span>Need Support?</span>
            </Link>
          </div>
        </div>

        {/* Main Columns */}
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
          
          {/* Left Column */}
          <div className="w-full lg:flex-[2] flex flex-col gap-6">
            
            {/* Status Tracking Card */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-14">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ff623d] rounded-lg flex items-center justify-center text-white shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Estimated Delivery</p>
                    <p className="text-[16px] font-bold text-zinc-900">{estimatedDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
                
                <div className="sm:text-right">
                  <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Current Carrier</p>
                  <p className="text-[13px] font-medium text-zinc-900">{tx.shippingMethod || "Industrial Logistics Express"}</p>
                </div>
              </div>
              
              {/* Stepper */}
              <div className="relative flex justify-between items-start w-full mb-16 px-4">
                {/* Connecting Line */}
                <div className="absolute top-5 left-10 right-10 h-[2px] bg-zinc-100 z-0">
                  <div className="h-full bg-[#cc4224] transition-all duration-1000" style={{ width: `${activeStep * 25}%` }}></div>
                </div>
                
                {[
                  { label: "Order Placed", time: tx.createdAt.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), icon: <Check className="w-4 h-4" />, done: true },
                  { label: "Payment Verified", time: tx.paidAt ? tx.paidAt.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "Pending", icon: <Check className="w-4 h-4" />, done: isPaid },
                  { label: "Processing", desc: "Quality Inspection in Progress", icon: <Search className="w-5 h-5" />, active: isProcessing, done: isShipped },
                  { label: "Shipped", desc: "Pending", icon: <Truck className="w-5 h-5" />, active: isShipped, done: isFinished },
                  { label: "Delivered", desc: "Expected " + estimatedDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), icon: <PackageCheck className="w-5 h-5" />, active: isFinished, done: isFinished }
                ].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center w-[20%] text-center gap-3">
                    <div className={`relative w-10 h-10 rounded-full flex items-center justify-center ring-[6px] ring-white transition-colors
                      ${step.done && idx < 2 ? 'bg-[#cc4224] text-white' : ''}
                      ${!step.done && step.active && idx === 2 ? 'bg-white border-2 border-[#cc4224] text-[#cc4224]' : ''}
                      ${!step.done && !step.active ? 'bg-zinc-100 text-zinc-300' : ''}
                      ${step.done && idx >= 2 ? 'bg-[#cc4224] text-white' : ''}
                    `}>
                      {!step.done && step.active && idx === 2 && (
                        <span className="absolute inset-0 rounded-full border-2 border-[#cc4224] animate-ping opacity-70"></span>
                      )}
                      <div className="relative z-10 flex items-center justify-center">{step.icon}</div>
                    </div>
                    <div>
                      <p className={`text-[12px] font-bold ${step.active || step.done ? 'text-zinc-900' : 'text-zinc-400'}`}>{step.label}</p>
                      <p className="text-[9px] font-medium text-zinc-500 mt-1 max-w-[80px] mx-auto leading-relaxed">{step.time || step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="w-full h-[1px] bg-zinc-100 mb-6"></div>
              
              {/* Activity Log */}
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-4 h-4 text-[#cc4224]" />
                <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-widest">Activity Log</span>
              </div>
              
              <div className="relative pl-3 border-l-2 border-zinc-100 flex flex-col gap-6">
                <div className="relative">
                  <div className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-[#cc4224] ring-4 ring-white"></div>
                  <p className="text-[13px] font-bold text-zinc-800 mb-1">Quality check passed. Moving to final packaging.</p>
                  <p className="text-[11px] text-zinc-500">May 13, 09:45 AM - Warehouse Hub A</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-zinc-300 ring-4 ring-white"></div>
                  <p className="text-[13px] font-medium text-zinc-600 mb-1">Payment received via Corporate Wire Transfer.</p>
                  <p className="text-[11px] text-zinc-400">May 12, 11:15 AM - Finance Portal</p>
                </div>
              </div>
            </div>

            {/* Shipment Details */}
            <div className="bg-[#f8f9fa] border border-zinc-200 rounded-xl shadow-sm p-6 sm:p-8">
              <div className="flex justify-between items-end mb-6 pb-4 border-b border-zinc-200">
                <h2 className="text-[16px] font-bold text-zinc-900">Shipment Details</h2>
                <span className="text-[11px] font-medium text-zinc-500">{items.length} Items • 215kg Total Weight</span>
              </div>
              
              <div className="flex flex-col gap-4">
                {items.map((item, idx) => (
                  <div key={idx} className="bg-white border border-zinc-200 rounded-xl p-4 flex gap-4 items-center">
                    <div 
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-100 rounded-lg border border-zinc-100 bg-cover bg-center shrink-0 mix-blend-multiply"
                      style={{ backgroundImage: `url(${item.imageUrl || 'https://images.unsplash.com/photo-1590496155985-23c4eb8964e7?q=80'})` }}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1 sm:gap-4 mb-2">
                        <h3 className="text-[13px] font-bold text-zinc-900 truncate">{item.productName}</h3>
                        <span className="text-[12px] font-bold text-zinc-900 shrink-0">IDR {item.priceAtPurchase.toLocaleString("id-ID")}</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider mb-3">
                        SKU: {item.productName.substring(0, 3).toUpperCase()}-{(idx+1)*124}
                      </p>
                      <div className="flex gap-2">
                        <span className="bg-zinc-100 text-zinc-600 text-[10px] font-bold px-2 py-0.5 rounded">Qty: {item.quantity} Units</span>
                        <span className="bg-[#fdf5f3] text-[#cc4224] text-[10px] font-bold px-2 py-0.5 rounded">Molding</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          
          {/* Right Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-6 min-w-[300px]">
            
            {/* Shipping Address */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-[#cc4224]" />
                <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-widest">Shipping Address</span>
              </div>
              
              <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-4 mb-4">
                <h3 className="text-[12px] font-bold text-zinc-900 mb-2">{deliveryAddress?.recipientName || "PT. Global Logistik Nusantara"}</h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed mb-4">
                  {deliveryAddress ? `${deliveryAddress.fullAddress}, ${deliveryAddress.district}, ${deliveryAddress.city}, ${deliveryAddress.province} ${deliveryAddress.postalCode}` : "Kawasan Industri Sentra Bitung\nBlok A-14, Cikupa\nBanten, Indonesia"}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                  <span>📞</span>
                  <span>{deliveryAddress?.phone || "+62 21 8883 4500"}</span>
                </div>
              </div>
              
              <p className="text-[10px] font-bold text-zinc-900 mb-2">Shipping Method</p>
              <div className="flex items-center gap-3 text-[12px] font-medium text-zinc-600">
                <Truck className="w-4 h-4" />
                <span>{tx.shippingMethod || "Freight Express (Surface Only)"}</span>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Receipt className="w-4 h-4 text-[#cc4224]" />
                <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-widest">Payment Summary</span>
              </div>
              
              <div className="space-y-4 text-[12px] mb-6">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-zinc-800">IDR {tx.subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-zinc-800">IDR {tx.shippingCost.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Tax [PPN 11%]</span>
                  <span className="font-bold text-zinc-800">IDR {tx.taxAmount.toLocaleString("id-ID")}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end border-t border-zinc-100 pt-4 mb-6">
                <span className="text-[13px] font-bold text-zinc-900">Total<br/>Amount</span>
                <div className="text-right flex items-start gap-1">
                  <span className="text-[14px] font-bold text-[#cc4224] mt-1">IDR</span>
                  <span className="text-[24px] font-bold text-[#cc4224] leading-none">{tx.totalAmount.toLocaleString("id-ID")}</span>
                </div>
              </div>
              
              <div className="w-full bg-black text-white rounded-lg p-3 sm:p-4 flex gap-3 items-center">
                <ShieldCheck className="w-5 h-5 text-[#ff623d]" />
                <div>
                  <p className="text-[11px] font-bold">Payment Verified</p>
                  <p className="text-[9px] text-zinc-400">Reference: DML-PAY-7729</p>
                </div>
              </div>
            </div>
            
            {/* Promo Box */}
            <div className="bg-[#09090b] text-white rounded-xl p-6 relative overflow-hidden shadow-sm">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <Settings className="w-32 h-32 -mb-8 -mr-8" />
              </div>
              <h3 className="text-[18px] font-bold mb-2">Manufacturing<br/>Progress?</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed mb-6 max-w-[200px]">
                View the detailed production lifecycle for your custom orders.
              </p>
              <button className="w-full py-3 bg-[#cc4224] hover:bg-[#b0351b] text-white text-[11px] font-bold rounded transition-colors relative z-10 shadow-sm">
                View Production Portal
              </button>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
