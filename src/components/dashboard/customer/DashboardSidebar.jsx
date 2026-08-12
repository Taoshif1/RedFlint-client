import {
  LayoutDashboard,
  Heart,
  MapPin,
  User,
  LogOut,
  Package,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";

import useAuth from "../../../hooks/useAuth";

const DashboardSidebar = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navClass = ({ isActive }) =>
    `flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 transition-all duration-300 lg:gap-3 lg:px-4 lg:py-3 ${
      isActive ? "bg-primary text-white" : "hover:bg-base-300 text-base-content"
    }`;

  return (
    <aside className="sticky top-16 z-30 -mx-4 border-y border-base-300 bg-base-200 p-2 sm:-mx-5 lg:top-24 lg:mx-0 lg:rounded-box lg:border lg:p-5">
      <h2 className="mb-6 hidden text-2xl font-black red-hat lg:block">
        My Dashboard
      </h2>

      <nav className="hide-scrollbar flex gap-2 overflow-x-auto lg:block lg:space-y-2">
        <NavLink end to="/dashboard" className={navClass}>
          <LayoutDashboard size={20} />
          Overview
        </NavLink>

        <NavLink to="/dashboard/recent-orders" className={navClass}>
          <Package size={20} />
          Orders
        </NavLink>

        <NavLink to="/dashboard/wishlist" className={navClass}>
          <Heart size={20} />
          Wishlist
        </NavLink>

        <NavLink to="/dashboard/address-book" className={navClass}>
          <MapPin size={20} />
          Address Book
        </NavLink>

        <NavLink to="/dashboard/account" className={navClass}>
          <User size={20} />
          Account
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 transition-all hover:bg-error hover:text-white lg:w-full lg:gap-3 lg:px-4 lg:py-3"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
