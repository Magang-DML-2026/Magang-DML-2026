import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { PrintLogClient } from "@/components/admin/orders/PrintLogClient";

type Props = {
  params: Promise<{ orderId: string }>;
};

export default async function PrintLogPage({ params }: Props) {
  const session = await getSession();
  if (!session || session.userRole !== "admin") redirect("/login");

  const { orderId } = await params;
  const adminName = session.userName ?? "Admin";

  return <PrintLogClient orderId={orderId} adminName={adminName} />;
}
