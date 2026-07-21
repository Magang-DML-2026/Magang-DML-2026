import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users, transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProductionDashboardClient from "@/components/dashboard/production/ProductionDashboardClient";

export default async function ProductionPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userId = session.userId as number;
  const [dbUser] = await db.select().from(users).where(eq(users.id, userId));
  const role = dbUser?.role || "user";

  if (role !== "b2b") {
    redirect("/dashboard");
  }

  const userTransactions = await db.select()
    .from(transactions)
    .where(eq(transactions.userId, userId));

  const activeShipments = userTransactions.filter(tx => tx.status === "Diproses" || tx.status === "Dikirim");
  const deliveredOrders = userTransactions.filter(tx => tx.status === "Selesai").length;

  const serviceLevel = {
    deliveryOntime: userTransactions.length > 0 ? ((deliveredOrders / userTransactions.length) * 100) || 98.5 : 98.5,
    deliveryTarget: 99.0
  };

  const productionMetrics = {
    activeCount: activeShipments.length,
    dailyVolume: "4.2k", // mock daily volume scaled to user
    yieldRate: 99.1,
    uptime: 99.5
  };

  const activeBatchesProp = activeShipments.slice(0, 3).map((tx, idx) => {
    let progress = 25;
    if (tx.status === "Diproses") progress = 50;
    if (tx.status === "QC") progress = 75;
    if (tx.status === "Dikirim") progress = 100;

    return {
      id: tx.id.slice(-6).toUpperCase(),
      product: "Custom Precision Component", // Mapped generically for now
      machine: "Line A - Kneader", // mock
      machineIcon: null, // client will handle icon
      estCompletion: "Today, 14:30",
      statusText: tx.status === "Diproses" ? "In Molding Stage" : "Quality Check",
      statusColor: "text-[#cc4224]",
      progress: progress,
      yieldProgress: Math.min(progress, 90),
      targetYield: "15,000 units",
      material: "Nitrile Butadiene (NBR)"
    };
  });

  return (
    <ProductionDashboardClient
      activeBatchesProp={activeBatchesProp.length > 0 ? activeBatchesProp : undefined}
      productionMetrics={productionMetrics}
      serviceLevel={serviceLevel}
    />
  );
}
