import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { ManifestPreviewClient } from "@/components/admin/orders/verify/ManifestPreviewClient";
import { mockReceipts } from "@/components/admin/orders/receiptData";

type Props = {
  params: Promise<{ receiptId: string }>;
};

export default async function ManifestPage({ params }: Props) {
  const session = await getSession();
  if (!session || session.userRole !== "admin") redirect("/login");

  const { receiptId } = await params;
  const receipt = mockReceipts.find((r) => r.id === receiptId);

  if (!receipt) redirect("/admin/orders");

  return <ManifestPreviewClient receipt={receipt} />;
}
