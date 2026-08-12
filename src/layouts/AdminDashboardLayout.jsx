import { useState } from "react";
import { Outlet } from "react-router";
import AdminDashboardHeader from "../components/dashboard/admin/AdminDashboardHeader";
import AdminDashboardSidebar from "../components/dashboard/admin/AdminDashboardSidebar";
import Footer from "../components/shared/Footer";

const AdminDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh min-h-[100dvh] flex-col overflow-hidden bg-[#0F0F0F] text-white">
      {/* Header - fixed at top, does not scroll */}
      <AdminDashboardHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Body: Sidebar (fixed) + Main (scrollable) */}
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen ? (
          <button
            type="button"
            aria-label="Close admin sidebar"
            className="fixed inset-x-0 bottom-0 top-16 z-30 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}

        <div
          className={`fixed bottom-0 left-0 top-16 z-40 overflow-y-auto transition-transform duration-300 md:static md:z-auto md:h-full md:shrink-0 md:transition-[width] ${
            sidebarOpen
              ? "translate-x-0 md:w-64"
              : "-translate-x-full md:w-0 md:translate-x-0"
          }`}
        >
          <AdminDashboardSidebar
            sidebarOpen={sidebarOpen}
            onNavigate={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main Content - only this part scrolls */}
        <main className="min-w-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="p-3 sm:p-4 md:p-6">
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
