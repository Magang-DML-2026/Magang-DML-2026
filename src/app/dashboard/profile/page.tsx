import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import SettingsClient from "./SettingsClient";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  // Get full user data including phone
  const userData = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      role: users.role,
      companyName: users.companyName,
      b2bStatus: users.b2bStatus,
    })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  const user = userData[0];
  if (!user) redirect("/login");

  return <SettingsClient user={user} />;
}
