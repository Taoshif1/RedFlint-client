//
import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useOrder = (id) => {
  const axiosSecure = useAxiosSecure();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await axiosSecure.get(`/orders/${id}`);

        setOrder(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return {
    order,
    loading,
  };
};

export default useOrder;
