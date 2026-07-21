import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { SettingsClient } from "@/components/admin/settings/SettingsClient";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session || session.userRole !== "admin") redirect("/login");

  const adminName = session.userName ?? "Admin";

  return <SettingsClient adminName={adminName} />;
}
