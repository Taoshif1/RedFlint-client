import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useProducts = () => {
  const axiosSecure = useAxiosSecure();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosSecure.get("/products");
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [axiosSecure]);

  return {
    products,
    loading,
    refetch: fetchProducts,
  };
};

export default useProducts;
