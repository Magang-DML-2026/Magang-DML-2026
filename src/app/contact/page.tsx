import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactBody from "@/components/contact/ContactBody";
import ContactFeatures from "@/components/contact/ContactFeatures";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activeTab="contact" showSearch={false} />
      <main>
        <ContactHero />
        <ContactBody />
        <ContactFeatures />
      </main>
      <Footer />
    </div>
  );
}
