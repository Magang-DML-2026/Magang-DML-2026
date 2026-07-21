import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { ProductFormClient } from "@/components/admin/products/ProductFormClient";

export default async function AddProductPage() {
  const session = await getSession();
  if (!session || session.userRole !== "admin") redirect("/login");

  const adminName = session.userName ?? "Admin";

  return <ProductFormClient adminName={adminName} />;
}
