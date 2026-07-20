import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { transactions, transactionItems } from "@/db/schema";
import { eq, desc, inArray } from "drizzle-orm";
import TransactionsClient from "./TransactionsClient";

export default async function TransactionsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userId = session.userId as number;

  const userTransactions = await db.select()
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.createdAt));

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
