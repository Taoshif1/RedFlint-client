import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

import useAxiosSecure from "../hooks/useAxiosSecure";
import Product from "../components/shared/Product";

const Products = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const axiosSecure = useAxiosSecure();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");

    axiosSecure
      .get("/products", {
        params: {
          search,
        },
      })
      .then((res) => {
        setProducts(Array.isArray(res.data) ? res.data : []);
      })
      .catch((error) => {
        console.error(error);
        setProducts([]);
        setError("Failed to load products.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [axiosSecure, search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="breadcrumbs text-sm mb-8">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Products</li>
        </ul>
      </div>

      {search && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">
            Search results for "{search}"
          </h2>

          {!isLoading && !error && (
            <p className="text-base-content/60">
              {products.length} product
              {products.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="py-20 text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4 text-base-content/60">Loading products...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold text-error">{error}</h2>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">No products found</h2>
          <p className="text-base-content/60 mt-3">
            Try another search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;