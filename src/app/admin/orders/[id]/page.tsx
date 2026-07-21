import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { OrderDetailClient } from "@/components/admin/orders/OrderDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailPage({ params }: Props) {
  const session = await getSession();
  if (!session || session.userRole !== "admin") redirect("/login");

  const { id } = await params;
  const adminName = session.userName ?? "Admin";

  return <OrderDetailClient orderId={id} adminName={adminName} />;
}
