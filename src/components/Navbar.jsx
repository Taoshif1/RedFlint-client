import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Logo from "./shared/Logo";
import SearchBar from "./shared/SearchBar";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // Navigation & Search State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Explicit State for Profile Dropdowns
  const [isDesktopProfileOpen, setIsDesktopProfileOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

  const desktopProfileRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const mobileMenuRef = useRef(null); // Ref for mobile menu

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopProfileRef.current &&
        !desktopProfileRef.current.contains(event.target)
      ) {
        setIsDesktopProfileOpen(false);
      }
      if (
        mobileProfileRef.current &&
        !mobileProfileRef.current.contains(event.target)
      ) {
        setIsMobileProfileOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false); // Syncs cross icon state back to hamburger
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      await logOut();
      setIsDesktopProfileOpen(false);
      setIsMobileProfileOpen(false);
      setIsMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDesktopProfileOpen(false);
    setIsMobileProfileOpen(false);
  };

  // Helper for Standard NavLinks Active Styling
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-bold underline underline-offset-4 decoration-2"
      : "font-semibold hover:text-primary transition";

  // Helper for Dropdown Item Active Styling
  const dropdownLinkClass = ({ isActive }) =>
    isActive ? "text-primary font-bold bg-base-300" : "hover:text-primary";

  return (
    <div className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4 min-h-20">
        {/* ----------------- MOBILE MENU START ----------------- */}
        <div className="navbar-start lg:hidden">
          <div className="dropdown" ref={mobileMenuRef}>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              type="button"
              className="btn btn-ghost btn-circle p-0"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                // Cross Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {isMenuOpen && (
              <ul className="menu menu-sm dropdown-content mt-3 z-[100] w-64 rounded-box bg-base-200 p-3 shadow-xl space-y-2 border border-base-300 absolute left-0">
                <li>
                  <NavLink
                    to="/products"
                    onClick={closeMenu}
                    className={navLinkClass}
                  >
                    Products
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/special-edition"
                    onClick={closeMenu}
                    className={navLinkClass}
                  >
                    Special Edition
                  </NavLink>
                </li>

                <div className="divider my-1"></div>

                {user ? (
                  <>
                    <li className="px-3 py-1 text-xs text-neutral-content/70">
                      Logged in as{" "}
                      <span className="font-bold text-white block truncate">
                        {user?.displayName || "User"}
                      </span>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard"
                        onClick={closeMenu}
                        className={navLinkClass}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="text-error font-semibold hover:bg-error/10 w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/login"
                        onClick={closeMenu}
                        className={navLinkClass}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/register"
                        onClick={closeMenu}
                        className={navLinkClass}
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* ----------------- DESKTOP LEFT ----------------- */}
        <div className="navbar-start hidden lg:flex items-center gap-8">
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          <NavLink
            to="/special-edition"
            className={({ isActive }) =>
              isActive
                ? "badge badge-primary badge-lg font-semibold"
                : "badge badge-outline badge-primary badge-lg hover:bg-primary hover:text-white transition font-semibold"
            }
          >
            Special Edition
          </NavLink>
        </div>

        {/* ----------------- CENTER LOGO ----------------- */}
        <div className="navbar-center absolute left-1/2 -translate-x-1/2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "opacity-100" : "opacity-90 hover:opacity-100"
            }
          >
            <Logo />
          </NavLink>
        </div>

        {/* ----------------- DESKTOP RIGHT ----------------- */}
        <div className="navbar-end hidden lg:flex items-center gap-5">
          <div className="hover:text-primary transition">
            <SearchBar />
          </div>

          {user ? (
            <div className="relative" ref={desktopProfileRef}>
              <button
                type="button"
                onClick={() => setIsDesktopProfileOpen((prev) => !prev)}
                className="btn btn-ghost btn-circle avatar border-0 focus:outline-none"
              >
                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                  <img
                    alt={user?.displayName || "User Profile"}
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </button>

              {isDesktopProfileOpen && (
                <ul className="menu menu-sm absolute right-0 mt-3 z-[100] p-3 shadow-xl bg-base-200 rounded-box w-56 space-y-1 border border-base-300">
                  <li className="px-2 py-1 border-b border-base-300">
                    <p className="font-bold text-white truncate">
                      {user?.displayName || "Account"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard"
                      onClick={closeMenu}
                      className={dropdownLinkClass}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="text-error font-semibold hover:bg-error/10"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M5.121 17.804A9 9 0 1118.879 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </NavLink>
          )}

          <button
            type="button"
            className="relative hover:text-primary transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1 5h13M9 20a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 badge badge-primary badge-sm">
              2
            </span>
          </button>
        </div>

        {/* ----------------- MOBILE RIGHT ----------------- */}
        <div className="navbar-end lg:hidden items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen((prev) => !prev)}
            className="hover:text-primary transition"
            aria-label="Toggle Search Bar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {user ? (
            <div className="relative" ref={mobileProfileRef}>
              <button
                type="button"
                onClick={() => setIsMobileProfileOpen((prev) => !prev)}
                className="btn btn-ghost btn-circle avatar border-0 focus:outline-none"
              >
                <div className="w-8 rounded-full ring-2 ring-primary">
                  <img
                    alt={user?.displayName || "User avatar"}
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </button>

              {isMobileProfileOpen && (
                <ul className="menu menu-sm absolute right-0 mt-3 z-[100] p-2 shadow-xl bg-base-200 rounded-box w-48 space-y-1 border border-base-300">
                  <li className="px-2 py-1 font-bold border-b border-base-300 truncate">
                    {user?.displayName || "User"}
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard"
                      onClick={closeMenu}
                      className={dropdownLinkClass}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="text-error font-semibold hover:bg-error/10 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M5.121 17.804A9 9 0 1118.879 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </NavLink>
          )}

          <button
            type="button"
            className="relative hover:text-primary transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1 5h13M9 20a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 badge badge-primary badge-xs">
              2
            </span>
          </button>
        </div>
      </div>

      {/* ----------------- EXPANDABLE MOBILE SEARCH BAR ----------------- */}
      {isMobileSearchOpen && (
        <div className="lg:hidden px-4 pb-3 pt-1 border-t border-base-300">
          <SearchBar />
        </div>
      )}
    </div>
  );
};

export default Navbar;
