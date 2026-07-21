import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { ProductListClient } from "@/components/admin/products/ProductListClient";

export default async function ProductsPage() {
  const session = await getSession();
  if (!session || session.userRole !== "admin") redirect("/login");

  const adminName = session.userName ?? "Admin";

  return <ProductListClient adminName={adminName} />;
}
