import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ShoppingCart from "./ShoppingCart";
import useCart from "../../hooks/useCart";
import useUser from "../../hooks/useUser";

import { FiMenu, FiX, FiUser, FiShoppingCart, FiSearch } from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { user: dbUser, loading: userLoading } = useUser();
  const { cart, refetch } = useCart();
  const navigate = useNavigate();

  const dashboardPath = dbUser?.role === "admin" ? "/admin" : "/dashboard";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const [isDesktopProfileOpen, setIsDesktopProfileOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

  const desktopProfileRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const mobileMenuRef = useRef(null); // Ref for mobile menu

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
        setIsMenuOpen(false);
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
    <div className="sticky top-0 z-100 bg-base-100/90 backdrop-blur-md border-b border-base-300">
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
                <FiX size={24} className="text-primary" />
              ) : (
                // Hamburger Icon
                <FiMenu size={24} />
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
                        to={dashboardPath}
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
                      to={dashboardPath}
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
            <NavLink to="/login">
              <FiUser size={22} className="hover:text-primary transition" />
            </NavLink>
          )}

          <div className="indicator">
            <span className="indicator-item badge badge-primary badge-sm">
              {cart.length}
            </span>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="btn btn-ghost btn-circle hover:text-primary"
            >
              <FiShoppingCart size={22} />
            </button>
          </div>
        </div>

        {/* ----------------- MOBILE RIGHT ----------------- */}
        <div className="navbar-end lg:hidden items-center gap-3">
          <button
            onClick={() => setIsMobileSearchOpen((prev) => !prev)}
            className="btn btn-ghost btn-circle btn-sm"
          >
            <FiSearch size={18} />
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
                      to={dashboardPath}
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
            <NavLink to="/login">
              <FiUser size={22} className="hover:text-primary transition" />
            </NavLink>
          )}

          <div className="indicator">
            <span className="indicator-item badge badge-primary badge-sm">
              {cart.length}
            </span>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="btn btn-ghost btn-circle hover:text-primary"
            >
              <FiShoppingCart size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* ----------------- EXPANDABLE MOBILE SEARCH BAR ----------------- */}
      {isMobileSearchOpen && (
        <div className="lg:hidden px-4 pb-3 pt-1 border-t border-base-300">
          <SearchBar />
        </div>
      )}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        refetch={refetch}
      />
    </div>
  );
};

export default Navbar;
