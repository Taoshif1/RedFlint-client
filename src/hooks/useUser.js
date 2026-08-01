import { useEffect, useState } from "react";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [dbUser, setDbUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setDbUser(null);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);

        setDbUser(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, axiosSecure]);

  return {
    user: dbUser,
    loading,
  };
};

export default useUser;
