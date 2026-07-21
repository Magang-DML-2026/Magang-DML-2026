import RfqSuccessClient from "../../../../../components/dashboard/transactions/RfqSuccessClient";
import { getSession } from "../../../../../lib/session";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function RfqSuccessPage() {
  const session = await getSession();
  
  if (!session || !session.userId) {
    redirect("/login");
  }

  const [dbUser] = await db.select().from(users).where(eq(users.id, session.userId as number));
  if (dbUser?.role !== "b2b") {
    redirect("/dashboard");
  }

  return <RfqSuccessClient />;
}
