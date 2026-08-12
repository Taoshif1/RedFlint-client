import { Outlet } from "react-router";

import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import DashboardSidebar from "../components/dashboard/customer/DashboardSidebar";

const CustomerDashboardLayout = () => {
  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-5 sm:py-8 lg:py-10">
        <div className="grid gap-4 lg:grid-cols-4 lg:gap-8">
          <div className="min-w-0">
            <DashboardSidebar />
          </div>

          <div className="min-w-0 lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CustomerDashboardLayout;
