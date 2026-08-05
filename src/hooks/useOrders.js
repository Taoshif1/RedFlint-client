import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useOrders = () => {
  const axiosSecure = useAxiosSecure();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axiosSecure.get("/orders");

      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [axiosSecure]);

  return {
    orders,
    loading,
    refetch: fetchOrders,
  };
};

export default useOrders;
