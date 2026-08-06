import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

import useAxiosSecure from "../hooks/useAxiosSecure";
import Product from "../components/shared/Product";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const sort = searchParams.get("sort") || "newest";

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
          sort,
        },
      })
      .then((response) => {
        setProducts(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Products loading error:", error);

        setProducts([]);
        setError("Failed to load products.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [axiosSecure, search, sort]);

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;

    const updatedParams = new URLSearchParams(searchParams);

    if (selectedSort === "newest") {
      updatedParams.delete("sort");
    } else {
      updatedParams.set("sort", selectedSort);
    }

    setSearchParams(updatedParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-8">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>Products</li>
        </ul>
      </div>

      {/* Heading and sorting */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {search ? `Search results for "${search}"` : "All Products"}
          </h1>

          {!isLoading && !error && (
            <p className="mt-2 text-sm text-base-content/60">
              {products.length} product
              {products.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        <label className="flex w-full sm:w-72 flex-col items-center gap-3">
          <span className="w-full text-center text-lg font-semibold">
            Sort Products
          </span>

          <select
            value={sort}
            onChange={handleSortChange}
            className="select select-bordered w-full"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </label>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="py-20 text-center">
          <span className="loading loading-spinner loading-lg"></span>

          <p className="mt-4 text-base-content/60">Loading products...</p>
        </div>
      ) : error ? (
        /* Error */
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold text-error">{error}</h2>
        </div>
      ) : products.length === 0 ? (
        /* Empty results */
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">No products found</h2>

          <p className="text-base-content/60 mt-3">Try another search term.</p>
        </div>
      ) : (
        /* Product grid */
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
