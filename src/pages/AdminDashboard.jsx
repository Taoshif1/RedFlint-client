import WelcomeCard from "../components/dashboard/admin/WelcomeCard";
import DashboardStats from "../components/dashboard/admin/DashboardStats";
import RecentOrders from "../components/dashboard/admin/RecentOrders";
import TopProducts from "../components/dashboard/admin/TopProducts";
import LowStockAlert from "../components/dashboard/admin/LowStockAlert";

const AdminDashboard = () => {
  return (
    <>
      <WelcomeCard />
      <DashboardStats />
      <RecentOrders />
      <TopProducts />
      <LowStockAlert />
    </>
  );
};

export default AdminDashboard;