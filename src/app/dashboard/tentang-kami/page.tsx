import HeroSection from "@/components/dashboard/tentang-kami/HeroSection";
import CompanyOverview from "@/components/dashboard/tentang-kami/CompanyOverview";
import VisionMission from "@/components/dashboard/tentang-kami/VisionMission";
import ProductionFacilities from "@/components/dashboard/tentang-kami/ProductionFacilities";
import OrgChart from "@/components/dashboard/tentang-kami/OrgChart";
import B2CCallToAction from "@/components/dashboard/tentang-kami/B2CCallToAction";
import Footer from "@/components/Footer";

export default function TentangKamiPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <HeroSection />
      <CompanyOverview />
      <VisionMission />
      <ProductionFacilities />
      <OrgChart />
      <div className="mt-auto">
        <B2CCallToAction />
        {/* We include the global footer if the screenshot requires it, otherwise it's just the CTA. The screenshot shows the global footer. */}
        <Footer />
      </div>
    </div>
  );
}
