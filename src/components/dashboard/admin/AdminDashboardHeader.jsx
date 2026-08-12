import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  FaBars,
  FaBell,
  FaBoxOpen,
  FaCheckCircle,
  FaSearch,
  FaTimes,
  FaTruck,
} from "react-icons/fa";

import Logo from "../../shared/Logo";
import useUser from "../../../hooks/useUser";

const AdminDashboardHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useUser();

  const [notificationOpen, setNotificationOpen] = useState(false);

  const notificationRef = useRef(null);

  const avatar =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "Admin",
    )}&background=e50000&color=ffffff`;

  const notifications = [
    {
      id: 1,
      title: "New order received",
      message: "Order #RF1024 has been placed.",
      time: "5 min ago",
      icon: <FaBoxOpen />,
      unread: true,
    },
    {
      id: 2,
      title: "Low stock alert",
      message: "Stone Gray Shirt has only 4 items left.",
      time: "20 min ago",
      icon: <FaTruck />,
      unread: true,
    },
    {
      id: 3,
      title: "Order delivered",
      message: "Order #RF1019 was successfully delivered.",
      time: "1 hour ago",
      icon: <FaCheckCircle />,
      unread: true,
    },
  ];

  const unreadCount = notifications.filter(
    (notification) => notification.unread,
  ).length;

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b border-zinc-800 bg-[#151515] px-2 sm:px-4 md:px-6">
      {/* Left: Sidebar Toggle */}
      <button
        type="button"
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="btn btn-ghost btn-circle min-h-11 min-w-11 cursor-pointer text-xl text-white transition duration-300 hover:text-red-500 sm:text-2xl"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Center: Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link to="/" className="cursor-pointer">
          <Logo compact />
        </Link>
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-1.5 sm:gap-4 md:gap-5">
        {/* Search */}
        <div className="hidden md:flex items-center w-[220px] lg:w-[280px] bg-[#202020] border border-zinc-700 rounded-full px-4 py-2">
          <FaSearch className="text-gray-400 mr-3 text-sm shrink-0" />

          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent outline-none text-white placeholder:text-gray-500 text-sm"
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => setNotificationOpen((prev) => !prev)}
            className="btn btn-ghost btn-circle relative min-h-11 min-w-11 cursor-pointer text-lg text-white transition duration-300 hover:text-red-500 sm:text-xl"
            aria-label="Notifications"
          >
            <FaBell />

            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 min-w-5 h-5 px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notificationOpen && (
            <div className="fixed left-3 right-3 top-16 overflow-hidden rounded-xl border border-zinc-700 bg-[#181818] shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[340px]">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-700">
                <div>
                  <h3 className="font-semibold text-white">Notifications</h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {unreadCount} unread notification
                    {unreadCount !== 1 && "s"}
                  </p>
                </div>

                <button
                  type="button"
                  className="text-xs text-red-500 hover:text-red-400 transition"
                  onClick={() => {
                    // Later we can connect this to backend notification state
                    console.log("Mark all as read");
                  }}
                >
                  Mark all as read
                </button>
              </div>

              {/* Notifications */}
              <div className="max-h-[360px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-10 text-center text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <button
                      type="button"
                      key={notification.id}
                      className={`w-full flex gap-4 text-left px-5 py-4 border-b border-zinc-800 hover:bg-[#222] transition ${
                        notification.unread ? "bg-[#1d1d1d]" : ""
                      }`}
                    >
                      {/* Icon */}
                      <div className="shrink-0 w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                        {notification.icon}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-sm text-white">
                            {notification.title}
                          </p>

                          {notification.unread && (
                            <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                          )}
                        </div>

                        <p className="text-xs text-gray-400 mt-1">
                          {notification.message}
                        </p>

                        <p className="text-[11px] text-gray-600 mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-zinc-700">
                <button
                  type="button"
                  className="w-full text-center text-sm text-red-500 hover:text-red-400 transition py-2"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <Link
          to="/admin/profile"
          className="cursor-pointer"
          aria-label="Admin profile"
        >
          <div className="avatar">
            <div className="w-8 rounded-full ring ring-primary ring-offset-1 ring-offset-base-100 sm:w-10 sm:ring-offset-2">
              <img src={avatar} alt={user?.name || "Admin"} />
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;
