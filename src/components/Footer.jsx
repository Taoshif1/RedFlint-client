import React from "react";
import RedFlintLogo from "./shared/Logo";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal justify-between w-full bg-base-300 text-primary p-10">
        <nav>
          <h6 className="footer-title">Services</h6>

          <a className="link link-hover text-primary hover:text-white active:text-white hover:scale-105 transition-all duration-200">
            Branding
          </a>

          <a className="link link-hover text-primary hover:text-white active:text-white hover:scale-105 transition-all duration-200">
            Design
          </a>

          <a className="link link-hover text-primary hover:text-white active:text-white hover:scale-105 transition-all duration-200">
            Our Motto
          </a>
        </nav>

        <nav>
          <h6 className="footer-title">Company</h6>

          <a className="link link-hover text-primary hover:text-white active:text-white hover:scale-105 transition-all duration-200">
            About us
          </a>

          <a className="link link-hover text-primary hover:text-white active:text-white hover:scale-105 transition-all duration-200">
            Contact Us
          </a>

          <a className="link link-hover text-primary hover:text-white active:text-white hover:scale-105 transition-all duration-200">
            Delivery
          </a>
        </nav>

        <nav>
          <h6 className="footer-title">Social</h6>

          <div className="grid grid-flow-col -ml-8 gap-6">
            {/* Instagram */}
            <a className="text-red-500 hover:text-white active:text-white hover:scale-105 transition-all duration-200 cursor-pointer">
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
            <a className="text-red-500 hover:text-white active:text-white hover:scale-105 transition-all duration-200 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>

            {/* Facebook */}
            <a className="text-red-500 hover:text-white active:text-white hover:scale-105 transition-all duration-200 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>

          <div className="flex justify-center mt-4 -ml-22">
            <RedFlintLogo />
          </div>
        </nav>
      </footer>

      <p className="pb-5 text-center bg-base-300 text-primary">
        Copyright © {new Date().getFullYear()} - All right reserved
      </p>
    </div>
  );
};

export default Footer;
