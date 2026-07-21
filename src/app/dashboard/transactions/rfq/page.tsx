import RfqFormClient from "../../../../components/dashboard/transactions/RfqFormClient";
import { getSession } from "../../../../lib/session";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function RfqPage() {
  const session = await getSession();
  
  if (!session || !session.userId) {
    redirect("/login");
  }

  const [dbUser] = await db.select().from(users).where(eq(users.id, session.userId as number));
  if (dbUser?.role !== "b2b") {
    redirect("/dashboard");
  }

  return (
    <RfqFormClient />
  );
}
