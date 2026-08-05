import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useAdminOrders = () => {
  const axiosSecure = useAxiosSecure();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axiosSecure.get("/admin/orders");
      setOrders(data);
    } catch (error) {
      console.error(error);
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

export default useAdminOrders;
