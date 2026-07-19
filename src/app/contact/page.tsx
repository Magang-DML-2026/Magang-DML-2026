import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactBody from "@/components/contact/ContactBody";
import ContactFeatures from "@/components/contact/ContactFeatures";
import { getSession } from "@/lib/session";

export default async function ContactPage() {
  const session = await getSession();
  const user = session ? { name: session.userName, email: session.userEmail } : null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeTab="contact" showSearch={false} user={user} />
      <main>
        <ContactHero />
        <ContactBody />
        <ContactFeatures />
      </main>
      <Footer />
    </div>
  );
}
