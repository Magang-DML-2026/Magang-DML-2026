import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import QualityDashboardClient from "@/components/dashboard/quality/QualityDashboardClient";

export default async function QualityPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userId = session.userId as number;
  const [dbUser] = await db.select().from(users).where(eq(users.id, userId));
  const role = dbUser?.role || "user";

  if (role !== "b2b") {
    redirect("/dashboard");
  }

  return <QualityDashboardClient />;
}
