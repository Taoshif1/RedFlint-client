import { useEffect, useState } from "react";

import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAddresses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    if (!user?.email) return;

    try {
      const res = await axiosSecure.get(`/addresses/${user.email}`);

      setAddresses(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [user]);

  return {
    addresses,
    loading,
    refetch,
  };
};

export default useAddresses;
