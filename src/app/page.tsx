import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import ProductCatalog from "@/components/ProductCatalog";
import ProductionLifecycle from "@/components/ProductionLifecycle";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-black">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Vision />
        <ProductCatalog />
        <ProductionLifecycle />
      </main>
      <Footer />
    </div>
  );
}
