import { Outlet } from "react-router";

import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import DashboardSidebar from "../components/dashboard/customer/DashboardSidebar";

const CustomerDashboardLayout = () => {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          <div>
            <DashboardSidebar />
          </div>

          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CustomerDashboardLayout;
