import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import InvoicePrintPreviewClient from "@/components/dashboard/InvoicePrintPreviewClient";
import { db } from "@/db";
import { transactions, transactionItems, addresses } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export default async function InvoicePrintPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ txId?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const resolvedParams = await searchParams;
  const txId = resolvedParams.txId;
  if (!txId) redirect("/dashboard/invoices");

  const txList = await db.select()
    .from(transactions)
    .where(and(
      eq(transactions.id, txId),
      eq(transactions.userId, session.userId as number)
    ))
    .limit(1);
    
  if (txList.length === 0) redirect("/dashboard/invoices");
  const tx = txList[0];

  const items = await db.select().from(transactionItems).where(eq(transactionItems.transactionId, txId));

  let deliveryAddress = null;
  if (tx.addressId) {
    const addrList = await db.select().from(addresses).where(eq(addresses.id, tx.addressId)).limit(1);
    deliveryAddress = addrList[0];
  } else {
    // Fallback for old transactions before addressId was saved
    const userAddresses = await db.select().from(addresses).where(eq(addresses.userId, tx.userId));
    deliveryAddress = userAddresses.find(a => a.isDefault) || userAddresses[0];
  }

  // Date manipulation
  const txDate = tx.createdAt ? new Date(tx.createdAt) : new Date();
  const dueDate = new Date(txDate);
  dueDate.setMonth(dueDate.getMonth() + 1); // Jatuh tempo 1 bulan
  
  return (
    <InvoicePrintPreviewClient
      tx={tx}
      items={items}
      deliveryAddress={deliveryAddress}
      userName={session.userName}
      txDateIso={txDate.toISOString()}
      dueDateIso={dueDate.toISOString()}
    />
  );
}
