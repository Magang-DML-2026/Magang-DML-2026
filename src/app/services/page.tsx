import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesCapabilities from "@/components/services/ServicesCapabilities";
import ServicesLifecycle from "@/components/services/ServicesLifecycle";
import ServicesCTA from "@/components/services/ServicesCTA";
import { getSession } from "@/lib/session";

export default async function ServicesPage() {
  const session = await getSession();
  const user = session ? { name: session.userName, email: session.userEmail } : null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeTab="services" user={user} />
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
