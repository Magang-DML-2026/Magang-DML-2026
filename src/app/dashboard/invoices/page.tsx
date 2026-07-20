import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import InvoicesClient from "./InvoicesClient";

export default async function InvoicesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userId = session.userId as number;

  const userTransactions = await db.select()
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.createdAt));

  return <InvoicesClient userTransactions={userTransactions} />;
}
