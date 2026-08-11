import { useCallback, useEffect, useState } from "react";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    if (!user?.email) {
      setDbUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axiosSecure.get(`/users/${user.email}`);
      setDbUser(data);
    } catch (error) {
      console.error("User load error:", error);
      setDbUser(null);
    } finally {
      setLoading(false);
    }
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user: dbUser,
    loading,
    refetch: fetchUser,
  };
};

export default useUser;
