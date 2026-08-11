import { useLocation } from "react-router";

import useSettings from "../hooks/useSettings";
import Maintenance from "../pages/Maintenance";

const MaintenanceGate = ({ children }) => {
  const location = useLocation();
  const { settings, loading } = useSettings();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (settings?.maintenanceMode && location.pathname !== "/login") {
    return <Maintenance />;
  }

  return children;
};

export default MaintenanceGate;
