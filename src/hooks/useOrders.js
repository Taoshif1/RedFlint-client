import { useCallback, useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useOrders = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    if (!user?.email) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const res = await axiosSecure.get("/orders");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Orders load error:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, user?.email]);

  useEffect(() => {
    if (!authLoading) {
      fetchOrders();
    }
  }, [authLoading, fetchOrders]);

  return {
    orders,
    loading,
    refetch: fetchOrders,
  };
};

export default useOrders;
