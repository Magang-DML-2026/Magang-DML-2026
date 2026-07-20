import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductHeader from "@/components/products/ProductHeader";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { getSession } from "@/lib/session";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";

type Props = {
  searchParams: Promise<{ q?: string; cat?: string; sort?: string; page?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const session = await getSession();
  const user = session ? { name: session.userName, email: session.userEmail } : null;
  const { q = "", cat = "", sort = "newest", page = "1" } = await searchParams;

  // Fetch all products from database (for client-side filtering/sorting)
  const allProducts = await db.select().from(products).orderBy(desc(products.id));

  // Map the database products to include UI specific properties if needed
  const mappedProducts = allProducts.map((p) => ({
    ...p,
    colSpan: p.featured ? 2 : 1,
    // Add default values for tags if they are null
    tags: p.tags || [],
    category: p.category || "All Products",
  }));

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeTab="products" user={user} />
      <main>
        <ProductHeader />
        <ProductFilters searchQuery={q} category={cat} sort={sort} />
        <ProductGrid products={mappedProducts as any} searchQuery={q} category={cat} sort={sort} page={Number(page) || 1} />
      </main>
      <Footer />
    </div>
  );
}
