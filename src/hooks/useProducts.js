import { useCallback, useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useInventoryVersion from "./useInventoryVersion";

const useProducts = () => {
  const axiosSecure = useAxiosSecure();
  const inventoryVersion = useInventoryVersion();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await axiosSecure.get("/products");
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, inventoryVersion]);

  return {
    products,
    loading,
    refetch: fetchProducts,
  };
};

export default useProducts;
