import { Outlet } from "react-router";

import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;