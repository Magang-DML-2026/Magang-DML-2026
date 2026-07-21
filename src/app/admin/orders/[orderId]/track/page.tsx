import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { TrackingMapClient } from "@/components/admin/orders/track/TrackingMapClient";

type Props = {
  params: Promise<{ orderId: string }>;
};

export default async function TrackingMapPage({ params }: Props) {
  const session = await getSession();
  if (!session || session.userRole !== "admin") redirect("/login");

  const { orderId } = await params;
  const adminName = session.userName ?? "Admin";

  return <TrackingMapClient orderId={orderId} adminName={adminName} />;
}
