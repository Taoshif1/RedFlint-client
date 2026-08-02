import { FaSignOutAlt } from "react-icons/fa";

const AdminDashboardSidebar = ({ sidebarOpen }) => {
  return (
    <aside
      className={`bg-[#151515] border-r border-zinc-800 overflow-hidden transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-0"
      }`}
    >
      <div className="w-64 h-full p-6">

        {/* Menu */}
        <ul className="space-y-5">
          <li className="cursor-pointer hover:text-red-500 transition">
            Dashboard
          </li>

          <li className="cursor-pointer hover:text-red-500 transition">
            Products
          </li>

          <li className="cursor-pointer hover:text-red-500 transition">
            Orders
          </li>

          <li className="cursor-pointer hover:text-red-500 transition">
            Customers
          </li>
        </ul>

        {/* Space */}
        <div className="mt-16 border-t border-zinc-800 pt-6">
          <button className="flex items-center gap-3 text-red-500 hover:text-red-400 transition cursor-pointer">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </aside>
  );
};

export default AdminDashboardSidebar;