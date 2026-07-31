import { useState } from "react";
import { Outlet } from "react-router";
import AdminDashboardHeader from "../components/dashboard/admin/AdminDashboardHeader";
import AdminDashboardSidebar from "../components/dashboard/admin/AdminDashboardSidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-[#0F0F0F] text-white overflow-hidden">

      <AdminDashboardHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex h-[calc(100vh-80px)]">

        <AdminDashboardSidebar sidebarOpen={sidebarOpen} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;