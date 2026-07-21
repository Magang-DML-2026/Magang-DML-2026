import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { VerifyPaymentPageClient } from "@/components/admin/orders/verify/VerifyPaymentPageClient";
import { mockReceipts } from "@/components/admin/orders/receiptData";

type Props = {
  params: Promise<{ receiptId: string }>;
};

export default async function VerifyPaymentPage({ params }: Props) {
  const session = await getSession();
  if (!session || session.userRole !== "admin") redirect("/login");

  const { receiptId } = await params;
  const receipt = mockReceipts.find((r) => r.id === receiptId);

  if (!receipt) redirect("/admin/orders");

  const adminName = session.userName ?? "Admin";

  return <VerifyPaymentPageClient receipt={receipt} adminName={adminName} />;
}
