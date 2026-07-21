import { db } from "@/db";
import { products, users } from "@/db/schema";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import NewPurchaseOrderClient from "@/components/dashboard/transactions/NewPurchaseOrderClient";

export default async function NewPurchaseOrderPage() {
  const session = await getSession();
  
  if (!session || !session.userId) {
    redirect("/login");
  }

  // Cek role B2B
  const [dbUser] = await db.select().from(users).where(eq(users.id, session.userId as number));
  if (dbUser?.role !== "b2b") {
    redirect("/dashboard");
  }

  // Fetch semua produk untuk katalog
  const allProducts = await db.select().from(products);

  return (
    <NewPurchaseOrderClient 
      products={allProducts} 
    />
  );
}
