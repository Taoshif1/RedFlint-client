import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useOrder = (id) => {
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setOrder(null);
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      setLoading(true);

      try {
        const res = await axiosSecure.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (error) {
        console.error("Order load error:", error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, axiosSecure]);

  return {
    order,
    loading,
  };
};

export default useOrder;
