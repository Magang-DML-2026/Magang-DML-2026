import { getSession } from "@/lib/session";
import { db } from "@/db";
import { transactions, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import AdminHeader from "@/components/admin/AdminHeader";
import SalesPerformanceChart from "@/components/admin/SalesPerformanceChart";
import StatCard from "@/components/admin/StatCard";
import PaymentStatusCard from "@/components/admin/PaymentStatusCard";
import LiveOrdersTable from "@/components/admin/LiveOrdersTable";
import LifecycleLoad from "@/components/admin/LifecycleLoad";

export default async function AdminDashboardPage() {
  const session = await getSession();
  const user = session ? { name: session.userName, email: session.userEmail } : null;

  // Fetch transactions and join with users to get client name and role
  const allOrdersRaw = await db
    .select({
      transaction: transactions,
      user: {
        name: users.name,
        role: users.role,
      },
    })
    .from(transactions)
    .leftJoin(users, eq(transactions.userId, users.id))
    .orderBy(desc(transactions.createdAt));

  // Flatten the result for the table
  const allOrders = allOrdersRaw.map((r) => ({
    ...r.transaction,
    clientName: r.user?.name || "Unknown",
    clientRole: r.user?.role || "user",
  }));

  // Calculate Stats
  const totalOrders = allOrders.length;
  // B2B vs B2C simple heuristic based on role or shipping method
  const b2bCount = allOrders.filter((o) => o.shippingMethod === "BULK" || o.shippingMethod === "BATCH").length;
  const b2cCount = totalOrders - b2bCount;

  // Payment Status
  const paidCount = allOrders.filter((o) => o.status === "Paid").length;
  const pendingCount = allOrders.filter((o) => o.status === "Pending" || o.status === "Menunggu Pembayaran").length;
  const overdueCount = allOrders.filter((o) => o.status === "Overdue").length;

  const paidPct = totalOrders > 0 ? Math.round((paidCount / totalOrders) * 100) : 0;
  const pendingPct = totalOrders > 0 ? Math.round((pendingCount / totalOrders) * 100) : 0;
  const overduePct = totalOrders > 0 ? Math.round((overdueCount / totalOrders) * 100) : 0;

  // Chart Data (Mocking last 7 days based on real aggregates if available, otherwise just group)
  const chartDataMap: Record<string, number> = {};
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    chartDataMap[d.toISOString().split("T")[0]] = 0; // Initialize last 7 days
  }

  allOrders.forEach((o) => {
    const dateStr = o.createdAt.toISOString().split("T")[0];
    if (chartDataMap[dateStr] !== undefined) {
      chartDataMap[dateStr] += o.totalAmount;
    }
  });

  const chartData = Object.entries(chartDataMap).map(([date, amount]) => ({
    date,
    amount,
  }));

  const currentDateStr = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <AdminHeader title="Admin Portal" user={user} />

      <main className="flex-1 p-8 w-full max-w-[1400px] mx-auto flex flex-col gap-8 overflow-y-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-black tracking-tight">Executive Summary</h1>
            <p className="text-sm text-zinc-500">
              Real-time overview for <span className="font-semibold text-black">{currentDateStr}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-black font-semibold text-sm rounded-md transition-colors border border-zinc-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#f05c35]"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              Buat Akun
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-zinc-800 text-white font-semibold text-sm rounded-md transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Export PDF
            </button>
          </div>
        </div>

        {/* Top Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SalesPerformanceChart data={chartData} />
          </div>
          <div className="flex flex-col gap-8">
            <StatCard totalOrders={totalOrders} b2bCount={b2bCount} b2cCount={b2cCount} />
            <PaymentStatusCard paidPct={paidPct} pendingPct={pendingPct} overduePct={overduePct} />
          </div>
        </div>

        {/* Live Orders Table */}
        <LiveOrdersTable orders={allOrders.slice(0, 5)} />

        {/* Lifecycle */}
        <LifecycleLoad />

      </main>
    </>
  );
}
