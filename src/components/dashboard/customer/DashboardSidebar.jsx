import { LayoutDashboard, Heart, MapPin, User, LogOut } from "lucide-react";
import { NavLink } from "react-router";
import toast from "react-hot-toast";

import useAuth from "../../../hooks/useAuth";

const DashboardSidebar = () => {
  const { logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged Out");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive ? "bg-primary text-white" : "hover:bg-base-300 text-base-content"
    }`;

  return (
    <aside className="bg-base-200 rounded-box border border-base-300 p-5 sticky top-24">
      <h2 className="font-black text-2xl mb-6 red-hat">My Dashboard</h2>

      <nav className="space-y-2">
        <NavLink end to="/dashboard" className={navClass}>
          <LayoutDashboard size={20} />
          Overview
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
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-error hover:text-white transition-all w-full cursor-pointer"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
