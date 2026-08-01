import { FaBars, FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import Logo from "../../shared/Logo";

const AdminDashboardHeader = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="h-20 bg-[#181818] border-b border-zinc-800 px-6 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl text-white hover:text-red-500 transition duration-300 cursor-pointer"
        >
          <FaBars />
        </button>

        <Logo />
      </div>

      <div className="hidden lg:flex items-center w-[450px] bg-[#202020] border border-zinc-700 rounded-xl px-4 py-3">
        <FaSearch className="text-gray-400 mr-3 text-lg" />

        <input
          type="text"
          placeholder="Search products, orders, customers..."
          className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-2xl text-white hover:text-red-500 transition duration-300 cursor-pointer">
          <FaBell />

          <span className="absolute -top-2 -right-2 bg-red-600 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
            3
          </span>
        </button>
        <button className="text-4xl text-gray-400 hover:text-red-500 transition duration-300 cursor-pointer">
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;
