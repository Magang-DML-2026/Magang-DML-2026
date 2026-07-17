import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesCapabilities from "@/components/services/ServicesCapabilities";
import ServicesLifecycle from "@/components/services/ServicesLifecycle";
import ServicesCTA from "@/components/services/ServicesCTA";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activeTab="services" />
      <main>
        <ServicesHero />
        <ServicesCapabilities />
        <ServicesLifecycle />
        <ServicesCTA />
      </main>
      <Footer />
    </div>
  );
}
