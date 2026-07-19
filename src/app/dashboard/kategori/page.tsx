import CategoryHeader from "@/components/dashboard/kategori/CategoryHeader";
import CategoryGrid from "@/components/dashboard/kategori/CategoryGrid";
import CategoryCTA from "@/components/dashboard/kategori/CategoryCTA";
import Footer from "@/components/Footer";

export default function KategoriPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <CategoryHeader />
      <CategoryGrid />
      <div className="mt-auto">
        <CategoryCTA />
        <Footer />
      </div>
    </div>
  );
}
