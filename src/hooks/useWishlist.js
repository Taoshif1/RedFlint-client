import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useWishlist = () => {
  const axiosSecure = useAxiosSecure();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await axiosSecure.get("/wishlist");
      setWishlist(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return {
    wishlist,
    loading,
    refetch: fetchWishlist,
  };
};

export default useWishlist;
