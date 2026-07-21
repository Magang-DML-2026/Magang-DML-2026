import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import DashboardClientWrapper from "@/components/dashboard/DashboardClientWrapper";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const [dbUser] = await db.select().from(users).where(eq(users.id, session.userId as number));

  return (
    <DashboardClientWrapper user={{ 
      name: session.userName, 
      email: session.userEmail, 
      role: dbUser?.role || "user",
      companyName: dbUser?.companyName || ""
    }}>
      {children}
    </DashboardClientWrapper>
  );
}
