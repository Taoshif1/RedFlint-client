import {
  FaChartPie,
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaPlusSquare,
  FaCog,
  FaStar,
} from "react-icons/fa";

import { NavLink } from "react-router";

const menus = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: FaChartPie,
    end: true,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: FaClipboardList,
  },
  {
    name: "Reviews",
    path: "/admin/reviews",
    icon: FaStar,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: FaBoxOpen,
    end: true,
  },
  {
    name: "Add Product",
    path: "/admin/products/add",
    icon: FaPlusSquare,
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: FaUsers,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: FaCog,
  },
];

const AdminDashboardSidebar = ({ sidebarOpen }) => {
  return (
    <aside
      className={`bg-[#151515] border-r border-zinc-800 transition-all duration-300 overflow-hidden ${
        sidebarOpen ? "w-64" : "w-0"
      }`}
    >
      <div className="w-64 p-4">
        <div className="mb-6 px-3">
          <h2 className="text-lg font-bold text-white">RedFlint Admin</h2>

          <p className="text-xs text-zinc-500">Store Management</p>
        </div>

        <ul className="space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <li key={menu.path}>
                <NavLink
                  to={menu.path}
                  end={menu.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`
                  }
                >
                  <Icon className="text-lg" />

                  <span>{menu.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default AdminDashboardSidebar;
