import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import RecentOrders from "../components/dashboard/RecentOrders";
import Wishlist from "../components/dashboard/Wishlist";
import AddressBook from "../components/dashboard/AddressBook";
import AccountInfo from "../components/dashboard/AccountInfo";

const CustomerDashboard = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-base-100 py-10 px-5">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader />

        <DashboardStats />

        <RecentOrders />

        <Wishlist />

        <AddressBook />

        <AccountInfo />
      </div>
    </div>
  );
};

export default CustomerDashboard;
