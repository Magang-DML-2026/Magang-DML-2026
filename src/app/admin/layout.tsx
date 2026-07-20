import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session || session.userRole !== "admin") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-white font-sans text-black">
      {/* Sidebar fixed width */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen bg-[#fafafa]">
        {children}
      </div>
    </div>
  );
}
