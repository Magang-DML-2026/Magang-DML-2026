import ProjectHero from "@/components/dashboard/proyek/ProjectHero";
import ProjectStats from "@/components/dashboard/proyek/ProjectStats";
import ProjectCollaborations from "@/components/dashboard/proyek/ProjectCollaborations";
import ProjectLifecycle from "@/components/dashboard/proyek/ProjectLifecycle";
import ProjectCTA from "@/components/dashboard/proyek/ProjectCTA";
import Footer from "@/components/Footer";

export default function ProyekPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <ProjectHero />
      <ProjectStats />
      <ProjectCollaborations />
      <ProjectLifecycle />
      <div className="mt-auto">
        <ProjectCTA />
        <Footer />
      </div>
    </div>
  );
}
