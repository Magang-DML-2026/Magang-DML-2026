import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { transactions, transactionItems, users } from "@/db/schema";
import { eq, desc, inArray } from "drizzle-orm";
import TransactionsClient from "./TransactionsClient";
import RfqDashboardClient from "@/components/dashboard/transactions/RfqDashboardClient";

export default async function TransactionsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userId = session.userId as number;

  const [dbUser] = await db.select().from(users).where(eq(users.id, userId));
  const role = dbUser?.role || "user";

  const userTransactions = await db.select()
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.createdAt));

  if (role === "b2b") {
    const total = userTransactions.length;
    const active = userTransactions.filter(t => t.status === "Diproses" || t.status === "Menunggu Pembayaran").length;
    const approved = userTransactions.filter(t => t.status === "Dikirim" || t.status === "Selesai").length;
    const rejected = userTransactions.filter(t => t.status === "Dibatalkan").length;

    const rfqHistoryProp = userTransactions.slice(0, 5).map(t => ({
      id: t.id.slice(-6).toUpperCase(),
      description: "Custom Component Order", // mapped statically for now without items join
      date: t.createdAt ? new Date(t.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}) : "Unknown",
      status: t.status,
      statusStyle: "bg-zinc-100 text-zinc-600 border border-transparent"
    }));

    return <RfqDashboardClient 
      rfqMetrics={{ total, active, approved, rejected }}
      rfqHistoryProp={rfqHistoryProp.length > 0 ? rfqHistoryProp : undefined}
    />;
  }



  let itemsByTxId: Record<string, { productName: string, totalQuantity: number }> = {};
  if (userTransactions.length > 0) {
    const txIds = userTransactions.map(t => t.id);
    const allItems = await db.select()
      .from(transactionItems)
      .where(inArray(transactionItems.transactionId, txIds));
    
    allItems.forEach(item => {
      if (!itemsByTxId[item.transactionId]) {
        itemsByTxId[item.transactionId] = {
          productName: item.productName,
          totalQuantity: item.quantity
        };
      } else {
        itemsByTxId[item.transactionId].totalQuantity += item.quantity;
      }
    });
  }

  return <TransactionsClient userTransactions={userTransactions} itemsByTxId={itemsByTxId} />;
}
