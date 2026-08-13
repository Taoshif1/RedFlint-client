import { useCallback, useEffect, useState } from "react";

import useAxiosSecure from "./useAxiosSecure";

const useSettings = () => {
  const axiosSecure = useAxiosSecure();

  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await axiosSecure.get("/settings");

      setSettings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    refetch: fetchSettings,
  };
};

export default useSettings;
