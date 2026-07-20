import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import ProductCatalog from "@/components/ProductCatalog";
import ProductionLifecycle from "@/components/ProductionLifecycle";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/session";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const session = await getSession();
  const user = session ? { name: session.userName, email: session.userEmail } : null;

  // Fetch featured products
  const featuredProducts = await db.select().from(products).where(eq(products.featured, true)).limit(2);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-black">
      <Navbar activeTab="profile" user={user} />
      <main className="flex-1">
        <Hero />
        <Vision />
        <ProductCatalog featuredProducts={featuredProducts} />
        <ProductionLifecycle />
      </main>
      <Footer />
    </div>
  );
}
