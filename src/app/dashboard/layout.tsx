import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import DashboardClientWrapper from "@/components/dashboard/DashboardClientWrapper";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <DashboardClientWrapper user={{ name: session.userName, email: session.userEmail }}>
      {children}
    </DashboardClientWrapper>
  );
}
