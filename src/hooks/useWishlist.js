import { useCallback, useEffect, useState } from "react";

import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useWishlist = () => {
  const axiosSecure = useAxiosSecure();

  const { user, loading: authLoading } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(true);

  // =====================================
  // Fetch Wishlist
  // =====================================

  const fetchWishlist = useCallback(async () => {
    // Guest users do not have a wishlist
    if (!user?.email) {
      setWishlist([]);
      setLoading(false);

      return;
    }

    setLoading(true);

    try {
      const res = await axiosSecure.get("/wishlist");

      setWishlist(res.data);
    } catch (error) {
      console.error("Wishlist fetch error:", error);

      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, user?.email]);

  // =====================================
  // Load Wishlist when auth is ready
  // =====================================

  useEffect(() => {
    if (!authLoading) {
      fetchWishlist();
    }
  }, [authLoading, fetchWishlist]);

  return {
    wishlist,
    loading,
    refetch: fetchWishlist,
  };
};

export default useWishlist;
