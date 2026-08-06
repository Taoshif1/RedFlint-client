import WelcomeCard from "../components/dashboard/admin/WelcomeCard";
import AdminStats from "../components/dashboard/admin/AdminStats";
import RecentOrders from "../components/dashboard/admin/RecentOrders";
import LowStockAlert from "../components/dashboard/admin/LowStockAlert";
import TopProducts from "../components/dashboard/admin/TopProducts";

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <WelcomeCard />

      <AdminStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentOrders />
        <LowStockAlert />
      </div>

      <TopProducts />
    </div>
  );
};

export default AdminOverview;
