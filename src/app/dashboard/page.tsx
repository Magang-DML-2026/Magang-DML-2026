import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Truck, Package, Microscope, Wrench, Download, Calendar } from "lucide-react";
import { db } from "@/db";
import { transactions, transactionItems } from "@/db/schema";
import { desc, eq, inArray, sql } from "drizzle-orm";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userId = session.userId as number;

  // 1. Fetch transactions for the user
  const userTransactions = await db.select()
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.createdAt));

  // 2. Fetch items for these transactions to display first product name
  let itemsByTxId: Record<string, { productName: string, quantity: number, totalItems: number }> = {};
  if (userTransactions.length > 0) {
    const txIds = userTransactions.map(t => t.id);
    const allItems = await db.select()
      .from(transactionItems)
      .where(inArray(transactionItems.transactionId, txIds));
    
    // Group items by txId
    allItems.forEach(item => {
      if (!itemsByTxId[item.transactionId]) {
        itemsByTxId[item.transactionId] = {
          productName: item.productName,
          quantity: item.quantity,
          totalItems: 1
        };
      } else {
        itemsByTxId[item.transactionId].totalItems += 1;
        itemsByTxId[item.transactionId].quantity += item.quantity;
      }
    });
  }

  // 3. Calculate Insights
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  let totalSpendThisMonth = 0;
  let activeOrders = 0;
  let deliveredOrders = 0;

  const activeShipmentsList: any[] = [];

  userTransactions.forEach(tx => {
    const txDate = tx.createdAt ? new Date(tx.createdAt) : new Date();
    if (txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {
      totalSpendThisMonth += tx.totalAmount;
    }

    if (tx.status !== "Selesai") {
      activeOrders++;
    } else {
      deliveredOrders++;
    }

    if (tx.status === "Diproses" || tx.status === "Dikirim") {
      activeShipmentsList.push(tx);
    }
  });

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentMonth];

  // Helper for tracking status badge in table
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Menunggu Pembayaran":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>Menunggu</span>;
      case "Diproses":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fdf5f3] text-[#cc4224] text-[11px] font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-[#cc4224]"></span>Diproses</span>;
      case "Dikirim":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Dikirim</span>;
      case "Selesai":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Selesai</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500 text-[11px] font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>{status}</span>;
    }
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[22px] text-zinc-900 mb-1">
          Welcome back, <span className="font-semibold">{session.userName}</span>
        </h1>
        <p className="text-[15px] text-zinc-500">
          Track your precision rubber component manufacturing and shipments.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Shipments */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[15px] font-medium text-zinc-800">Pesanan Aktif</h2>
              <span className="text-sm font-semibold text-[#cc4224]">{activeShipmentsList.length} Sedang Berjalan</span>
            </div>

            <div className="space-y-6">
              {activeShipmentsList.length === 0 ? (
                <div className="text-center py-6 text-zinc-400 text-[14px]">
                  Tidak ada pesanan aktif saat ini.
                </div>
              ) : (
                <>
                  {activeShipmentsList.slice(0, 5).map((tx, idx) => (
                    <div key={tx.id} className="relative pl-14">
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 border rounded-lg flex items-center justify-center ${tx.status === 'Dikirim' ? 'border-[#f5d9d3] bg-[#fdf5f3] text-[#cc4224]' : 'border-zinc-200 bg-zinc-50 text-zinc-600'}`}>
                        {tx.status === 'Dikirim' ? <Truck className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                      </div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-[15px] font-medium text-zinc-900">Order {tx.id}</h3>
                          <p className="text-[13px] text-zinc-500 mt-0.5">{itemsByTxId[tx.id]?.productName} {itemsByTxId[tx.id]?.totalItems > 1 ? `+ ${itemsByTxId[tx.id]?.totalItems - 1} more` : ''}</p>
                        </div>
                        <span className={`text-[11px] font-bold px-2 py-1 rounded ${tx.status === 'Dikirim' ? 'bg-[#fdf5f3] text-[#cc4224]' : 'bg-zinc-100 text-zinc-600'}`}>
                          {tx.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${tx.status === 'Dikirim' ? 'bg-[#cc4224] w-[85%]' : 'bg-zinc-800 w-[30%]'}`}></div>
                      </div>
                    </div>
                  ))}
                  {activeShipmentsList.length > 5 && (
                    <div className="text-center pt-2">
                      <Link href="/dashboard/transactions" className="text-[13px] font-medium text-[#cc4224] hover:underline">
                        Lihat {activeShipmentsList.length - 5} pesanan lainnya
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Phase Cards (Based on recent active transactions) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userTransactions.slice(0, 2).map((tx, idx) => (
              <div key={tx.id} className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${idx === 0 ? 'bg-[#eef2ff] text-blue-600' : 'bg-zinc-100 text-zinc-600'}`}>
                      {idx === 0 ? <Wrench className="w-4 h-4" /> : <Microscope className="w-4 h-4" />}
                    </div>
                    <span className="text-xs text-zinc-500">Order {tx.id}</span>
                  </div>
                  <h3 className="text-[15px] font-medium text-zinc-900 mb-2">{tx.status === "Menunggu Pembayaran" ? "Pending Payment" : (tx.status === "Diproses" ? "Molding Phase" : "Quality / Dispatch")}</h3>
                  <p className="text-[13px] text-zinc-500 leading-relaxed mb-6">
                    {tx.status === "Menunggu Pembayaran" ? "Awaiting your payment to commence production." : (tx.status === "Diproses" ? "Component design finalized. Commencing production phase." : "Final checks and logistics preparation.")}
                  </p>
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${tx.status === "Diproses" ? 'text-[#cc4224]' : 'text-zinc-500'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${tx.status === "Diproses" ? 'bg-[#cc4224]' : 'bg-zinc-400'}`}></span>
                  {tx.status}
                </div>
              </div>
            ))}
            
            {userTransactions.length === 0 && (
               <div className="col-span-2 text-center p-8 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-500 text-[14px]">
                 No recent activities. 
                 <div className="mt-2"><Link href="/dashboard/cart" className="text-[#cc4224] hover:underline font-bold">Mulai Pesan Sekarang</Link></div>
               </div>
            )}
          </div>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          {/* Insights */}
          <div className="bg-black rounded-xl p-6 shadow-md text-white">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[15px] font-medium text-white/90">Monthly Insights</h2>
              <Calendar className="w-4 h-4 text-white/50" />
            </div>
            
            <div className="mb-6">
              <p className="text-xs text-white/60 mb-1">Total Spend ({currentMonthName})</p>
              <p className="text-2xl font-light tracking-tight">Rp {totalSpendThisMonth.toLocaleString("id-ID")}</p>
            </div>
            
            <div className="w-full h-[1px] bg-white/10 mb-6"></div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/60 mb-1">Orders</p>
                <p className="text-[15px]"><span className="font-semibold">{activeOrders}</span> Active</p>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-1">Delivered</p>
                <p className="text-[15px] text-[#ff8a66]"><span className="font-semibold">{deliveredOrders}</span> Total</p>
              </div>
            </div>
          </div>

          {/* Consultation */}
          <div className="bg-gradient-to-br from-[#ff6b4a] to-[#cc4224] rounded-xl p-6 shadow-md text-white">
            <h2 className="text-[15px] font-medium mb-2">Industrial Consultation</h2>
            <p className="text-[13px] text-white/90 leading-relaxed mb-6">
              Need technical advice on material selection for high-pressure environments? Our engineers are available for live consultation.
            </p>
            <Link href="/dashboard/support" className="block text-center w-full bg-white text-[#cc4224] hover:bg-white/90 transition-colors py-2.5 rounded-lg text-[13px] font-semibold">
              Speak to Expert
            </Link>
          </div>

          {/* Facility Image */}
          <div className="relative h-40 rounded-xl overflow-hidden shadow-sm group">
            <div className="absolute inset-0 bg-zinc-800">
              <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1580983582457-3f31c77bb32d?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-[10px] text-white/70 mb-0.5">Primary Facility</p>
              <h3 className="text-[15px] font-medium text-white mb-1.5">Tangerang Plant A</h3>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#86efac]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#86efac]"></span>
                OPERATIONAL
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden mb-10">
        <div className="px-6 py-5 border-b border-zinc-200 flex justify-between items-center bg-white">
          <h2 className="text-[15px] font-medium text-zinc-800">Recent Transactions</h2>
          <button className="text-[13px] font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5 transition-colors">
            Export CSV
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-4 text-[13px] font-semibold text-zinc-900 w-[12%]">Order ID</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-zinc-900 w-[25%]">Product</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-zinc-900 w-[15%]">Quantity</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-zinc-900 w-[18%]">Total Amount</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-zinc-900 w-[20%]">Tracking Status</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-zinc-900 w-[10%]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {userTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[14px] text-zinc-500">
                    Belum ada transaksi saat ini.
                  </td>
                </tr>
              ) : (
                userTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 text-[14px] text-zinc-600 font-medium">{tx.id}</td>
                    <td className="px-6 py-4 text-[14px] text-zinc-900 font-medium">
                      {itemsByTxId[tx.id]?.productName}
                      {itemsByTxId[tx.id]?.totalItems > 1 && <span className="text-zinc-400 text-xs ml-1">+{itemsByTxId[tx.id].totalItems - 1}</span>}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-zinc-600">{itemsByTxId[tx.id]?.quantity.toLocaleString("id-ID")} Pcs</td>
                    <td className="px-6 py-4 text-[14px] text-zinc-600">Rp {tx.totalAmount.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(tx.status)}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/transactions/${tx.id}/tracking`} className="text-[13px] font-medium text-zinc-900 hover:underline">Details</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
