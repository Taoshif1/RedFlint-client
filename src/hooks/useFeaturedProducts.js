import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useFeaturedProducts = () => {
  const axiosSecure = useAxiosSecure();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await axiosSecure.get("/products/featured", {
          params: { view: "card", limit: 4 },
        });

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Featured products error:", error);
        setProducts([]);
        setError("Failed to load featured products.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [axiosSecure]);

  return {
    products,
    loading,
    error,
  };
};

export default useFeaturedProducts;
