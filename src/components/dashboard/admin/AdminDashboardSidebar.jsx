import {
  FaChartPie,
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaPlusSquare,
  FaCog,
} from "react-icons/fa";

import { NavLink } from "react-router";

const menus = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <FaChartPie />,
    end: true,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: <FaClipboardList />,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: <FaBoxOpen />,
  },
  {
    name: "Add Product",
    path: "/admin/products/add",
    icon: <FaPlusSquare />,
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: <FaUsers />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <FaCog />,
  },
];

const AdminDashboardSidebar = ({ sidebarOpen }) => {
  return (
    <aside
      className={`bg-[#151515] border-r border-zinc-800 transition-all duration-300 overflow-hidden ${
        sidebarOpen ? "w-64" : "w-0"
      }`}
    >
      <div className="w-64 h-full px-5 py-8">
        <ul className="p-6 space-y-5">
          <li>
            <NavLink to="/admin">Dashboard</NavLink>
          </li>

          <li>
            <NavLink to="/admin/orders">Orders</NavLink>
          </li>

          <li>
            <NavLink to="/admin/products">Products</NavLink>
          </li>

          <li>
            <NavLink to="/admin/products/add">Add Product</NavLink>
          </li>

          <li>
            <NavLink to="/admin/customers">Customers</NavLink>
          </li>

          <li>
            <NavLink to="/admin/settings">Settings</NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminDashboardSidebar;
