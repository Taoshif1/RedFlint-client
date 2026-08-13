import RedFlintLogo from "../shared/Logo";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="mx-auto grid w-full max-w-7xl grid-cols-2 justify-items-start gap-8 px-5 py-10 text-primary sm:px-8 md:grid-cols-3 md:justify-items-center md:gap-10 md:p-10">
        <nav className="flex flex-col items-start gap-2 text-left md:items-center md:text-center">
          <h6 className="footer-title text-lg font-bold">Services</h6>

          <Link
            to="/return"
            className="link link-hover text-primary hover:text-white active:text-white hover:scale-105 transition-all duration-200"
          >
            Return Policy
          </Link>

          <Link
            to="/track-order"
            className="link link-hover text-primary hover:text-white active:text-white hover:scale-105 transition-all duration-200"
          >
            Track Order
          </Link>

          <Link
            to="/motto"
            className="link link-hover text-primary hover:text-white active:text-white hover:scale-105 transition-all duration-200"
          >
            Our Motto
          </Link>
        </nav>

        <nav className="flex flex-col items-start gap-2 text-left md:items-center md:text-center">
          <h6 className="footer-title text-lg font-bold">Company</h6>

          <Link
            to="/about"
            className="link link-hover text-primary hover:text-white active:text-white hover:scale-105 transition-all duration-200"
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className="link link-hover text-primary hover:text-white active:text-white hover:scale-105 transition-all duration-200"
          >
            Contact Us
          </Link>

          <Link
            to="/delivery"
            className="link link-hover text-primary hover:text-white active:text-white hover:scale-105 transition-all duration-200"
          >
            Delivery
          </Link>

          <Link
            to="/privacy"
            className="link link-hover text-primary transition-all duration-200 hover:scale-105 hover:text-white active:text-white"
          >
            Privacy Policy
          </Link>

          <Link
            to="/terms"
            className="link link-hover text-primary transition-all duration-200 hover:scale-105 hover:text-white active:text-white"
          >
            Terms &amp; Conditions
          </Link>
        </nav>

        <nav className="col-span-2 flex w-full flex-col items-center gap-2 text-center md:col-span-1">
          <h1 className="footer-title text-lg font-bold">Social</h1>

          <div className="grid grid-flow-col gap-6">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/redflintclothing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram page"
              className="text-red-500 hover:text-white active:text-white hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm8.75 1a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@redflintbd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our YouTube channel"
              className="text-red-500 hover:text-white active:text-white hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/redflintbd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              className="text-red-500 hover:text-white active:text-white hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>

          <div className="flex justify-center mt-4">
            <RedFlintLogo />
          </div>
        </nav>
      </footer>

      <p className="pb-5 text-center text-primary text-sm border-t border-base-200/10 pt-4">
        Copyright © {new Date().getFullYear()} - All rights reserved
      </p>
    </div>
  );
};

export default Footer;
