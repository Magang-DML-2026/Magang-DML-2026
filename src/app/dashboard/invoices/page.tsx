import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { transactions, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import InvoicesClient from "./InvoicesClient";
import B2BInvoicesClient from "@/components/dashboard/invoices/B2BInvoicesClient";

export default async function InvoicesPage() {
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
    // Calculate B2B Metrics
    let outstandingBalance = 0;
    let upcomingDue = 0;
    const tableDataProp: any[] = [];

    userTransactions.forEach(tx => {
      const amount = tx.totalAmount ? Number(tx.totalAmount) : 0;
      if (tx.status !== "Selesai" && tx.status !== "Dibatalkan") {
        outstandingBalance += amount;
      }
      if (tx.status === "Menunggu Pembayaran") {
        upcomingDue += amount;
      }

      tableDataProp.push({
        po: `PO-${tx.id.slice(-6).toUpperCase()}`,
        cat: "Custom Request",
        amount: `Rp ${amount.toLocaleString('id-ID')}`,
        date: tx.createdAt ? new Date(tx.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}) : "Unknown",
        status: tx.status === "Menunggu Pembayaran" ? "Unpaid" : tx.status === "Selesai" ? "Paid" : "In Progress"
      });
    });

    return <B2BInvoicesClient 
      b2bMetrics={{ outstandingBalance, upcomingDue }} 
      tableDataProp={tableDataProp.length > 0 ? tableDataProp : undefined}
    />;
  }



  return <InvoicesClient userTransactions={userTransactions} />;
}
