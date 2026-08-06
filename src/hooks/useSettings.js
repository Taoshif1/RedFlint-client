import { useEffect, useState } from "react";

import useAxiosSecure from "./useAxiosSecure";

const useSettings = () => {
  const axiosSecure = useAxiosSecure();

  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const { data } = await axiosSecure.get("/settings");

      setSettings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    refetch: fetchSettings,
  };
};

export default useSettings;
