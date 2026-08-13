import { useCallback, useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await axiosSecure.get("/admin/users");
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    refetch: fetchUsers,
  };
};

export default useUsers;
