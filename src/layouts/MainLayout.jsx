import { Outlet } from "react-router";

import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";
import WhatsAppSupport from "../components/shared/WhatsAppSupport";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <WhatsAppSupport />
    </>
  );
};

export default MainLayout;
