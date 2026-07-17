import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductHeader from "@/components/products/ProductHeader";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import Pagination from "@/components/products/Pagination";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activeTab="products" />
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
