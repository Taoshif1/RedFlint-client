import { useEffect, useState } from "react";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
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
