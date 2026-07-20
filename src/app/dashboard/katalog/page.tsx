import B2CCatalogHeader from "@/components/dashboard/katalog/B2CCatalogHeader";
import B2CCatalogFilters from "@/components/dashboard/katalog/B2CCatalogFilters";
import B2CProductGrid from "@/components/dashboard/katalog/B2CProductGrid";
import B2CCatalogFooterCTA from "@/components/dashboard/katalog/B2CCatalogFooterCTA";
import Footer from "@/components/Footer";

export default function B2CCatalogPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb] font-sans flex flex-col relative w-full overflow-y-auto">
      <B2CCatalogHeader />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Sidebar Filter */}
          <div className="w-full lg:w-[260px] shrink-0">
            <B2CCatalogFilters />
          </div>
          
          {/* Right Main Grid */}
          <div className="flex-1 w-full min-w-0">
            <B2CProductGrid />
          </div>
        </div>
      </div>

      {/* Footer Custom CTA */}
      <div className="mt-auto">
        <B2CCatalogFooterCTA />
        <Footer />
      </div>
    </div>
  );
}
