import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { OrderDetailClient } from "@/components/admin/orders/OrderDetailClient";

type Props = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderDetailPage({ params }: Props) {
  const session = await getSession();
  if (!session || session.userRole !== "admin") redirect("/login");

  const { orderId } = await params;
  const adminName = session.userName ?? "Admin";

  return <OrderDetailClient orderId={orderId} adminName={adminName} />;
}
