import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductHeader from "@/components/products/ProductHeader";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import Pagination from "@/components/products/Pagination";
import { getSession } from "@/lib/session";

export default async function ProductsPage() {
  const session = await getSession();
  const user = session ? { name: session.userName, email: session.userEmail } : null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeTab="products" user={user} />
      <main>
        <ProductHeader />
        <ProductFilters />
        <ProductGrid />
        <Pagination />
      </main>
      <Footer />
    </div>
  );
}
