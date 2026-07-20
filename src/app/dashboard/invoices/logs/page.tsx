import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Search, Calendar, ChevronDown, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { db } from "@/db";
import { printLogs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import LogsClient from "./LogsClient";

export default async function InvoiceLogsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userId = session.userId as number;
  const userLogs = await db.select()
    .from(printLogs)
    .where(eq(printLogs.userId, userId))
    .orderBy(desc(printLogs.createdAt));

  const totalLogs = userLogs.length;
  const successfulLogs = userLogs.filter(log => log.status === 'Completed').length;
  const failedLogs = userLogs.filter(log => log.status === 'Failed').length;
  const successRate = totalLogs > 0 ? ((successfulLogs / totalLogs) * 100).toFixed(1) : "0.0";

  return <LogsClient initialLogs={userLogs} userName={session.userName!} />;
}
