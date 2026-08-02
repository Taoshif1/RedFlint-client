import { Link } from "react-router";
import { FaBars, FaSearch, FaBell } from "react-icons/fa";
import Logo from "../../shared/Logo";
import useUser from "../../../hooks/useUser";

const AdminDashboardHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useUser();

  const avatar =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "Customer",
    )}&background=e50000&color=ffffff`;

  return (
    <header className="h-20 bg-[#181818] border-b border-zinc-800 px-6 grid grid-cols-3 items-center">
      {/* Left: Hamburger */}
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl text-white hover:text-red-500 transition duration-300 cursor-pointer"
        >
          <FaBars />
        </button>
      </div>

      {/* Center: Logo */}
      <div className="flex items-center justify-center">
        <Link to="/" className="cursor-pointer">
          <Logo />
        </Link>
      </div>

      {/* Right: Search + Avatar + Notification */}
      <div className="flex items-center justify-end gap-5">
        <div className="hidden md:flex items-center w-[220px] lg:w-[280px] bg-[#202020] border border-zinc-700 rounded-full px-4 py-2">
          <FaSearch className="text-gray-400 mr-3 text-sm shrink-0" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent outline-none text-white placeholder:text-gray-500 text-sm"
          />
        </div>

        <Link to="/dashboard/profile" className="cursor-pointer">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={avatar} alt={user?.name || "User"} />
            </div>
          </div>
        </Link>

        <button className="relative text-xl text-white hover:text-red-500 transition duration-300 cursor-pointer">
          <FaBell />
          <span className="absolute -top-2 -right-2 bg-red-600 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
            3
          </span>
        </button>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;