import AdminStats from "../components/dashboard/admin/AdminStats";
import AdminOrders from "../components/dashboard/admin/AdminOrders";

const AdminOverview = () => {
  return (
    <div className="space-y-8">
      <AdminStats />
      <AdminOrders />
    </div>
  );
};

export default AdminOverview;
