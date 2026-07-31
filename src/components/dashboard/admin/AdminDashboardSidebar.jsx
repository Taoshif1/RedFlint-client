const AdminDashboardSidebar = ({ sidebarOpen }) => {
  return (
    <aside
      className={`bg-[#151515] border-r border-zinc-800 overflow-hidden transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-0"
      }`}
    >
      <div className="w-64 h-full">

        <ul className="p-6 space-y-5">

          <li className="cursor-pointer hover:text-red-500">
            Dashboard
          </li>

          <li className="cursor-pointer hover:text-red-500">
            Products
          </li>

          <li className="cursor-pointer hover:text-red-500">
            Orders
          </li>

          <li className="cursor-pointer hover:text-red-500">
            Customers
          </li>

        </ul>

      </div>
    </aside>
  );
};

export default AdminDashboardSidebar;