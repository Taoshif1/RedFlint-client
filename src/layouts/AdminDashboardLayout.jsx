import { useState } from "react";
import { Outlet } from "react-router";
import AdminDashboardHeader from "../components/dashboard/admin/AdminDashboardHeader";
import AdminDashboardSidebar from "../components/dashboard/admin/AdminDashboardSidebar";
import Footer from "../components/shared/Footer";

const AdminDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-[#0F0F0F] text-white flex flex-col overflow-hidden">
      {/* Header - fixed at top, does not scroll */}
      <AdminDashboardHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Body: Sidebar (fixed) + Main (scrollable) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - fixed, does not scroll with content */}
        <div className="h-full overflow-y-auto shrink-0">
          <AdminDashboardSidebar sidebarOpen={sidebarOpen} />
        </div>

        {/* Main Content - only this part scrolls */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>

          {/* Footer scrolls with content, at the bottom of main area */}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
