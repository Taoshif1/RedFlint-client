import { Outlet } from "react-router";

import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";
import WhatsAppSupport from "../components/shared/WhatsAppSupport";
import MaintenanceGate from "../routes/MaintenanceGate";
import MessengerSupport from "../components/shared/MessengerSupport";
const MainLayout = () => {
  return (
    <MaintenanceGate>
      <ScrollToTop />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
      <MessengerSupport/>
      <WhatsAppSupport />
    </MaintenanceGate>
  );
};

export default MainLayout;
