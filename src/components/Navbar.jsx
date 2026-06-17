import Logo from "./shared/Logo";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-base-100 border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4 min-h-20">

        {/* Mobile Menu */}
        <div className="navbar-start lg:hidden">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost p-0">
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
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] w-56 rounded-box bg-base-200 p-2 shadow"
            >
              <li>
                <a>Products</a>
              </li>

              <li>
                <a>Special Edition</a>
              </li>

              <li>
                <a>Login</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Left */}
        <div className="navbar-start hidden lg:flex gap-8">
          <a className="font-semibold hover:text-primary transition">
            Products
          </a>

          <a className="font-semibold hover:text-primary transition">
            Special Edition
          </a>
        </div>

        {/* Center Logo */}
        <div className="navbar-center absolute left-1/2 -translate-x-1/2">
          <Logo />
        </div>

        {/* Desktop Right */}
        <div className="navbar-end hidden lg:flex gap-5">

          {/* Search */}
          <button className="hover:text-primary transition">
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
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <button className="font-semibold hover:text-primary transition">
            Login
          </button>

          <button className="relative hover:text-primary transition">
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

        {/* Mobile Right */}
        <div className="navbar-end lg:hidden gap-3">

          <button className="hover:text-primary transition">
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

          <button className="relative hover:text-primary transition">
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
    </div>
  );
};

export default Navbar;