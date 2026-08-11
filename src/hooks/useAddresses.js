import { useCallback, useEffect, useState } from "react";

import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAddresses = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!user?.email) {
      setAddresses([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const res = await axiosSecure.get(`/addresses/${user.email}`);
      setAddresses(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Address load error:", error);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, user?.email]);

  useEffect(() => {
    if (!authLoading) {
      refetch();
    }
  }, [authLoading, refetch]);

  return {
    addresses,
    loading,
    refetch,
  };
};

export default useAddresses;
