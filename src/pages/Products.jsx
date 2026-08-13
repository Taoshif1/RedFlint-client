import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

import useAxiosSecure from "../hooks/useAxiosSecure";
import useInventoryVersion from "../hooks/useInventoryVersion";
import Product from "../components/shared/Product";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const sort = searchParams.get("sort") || "newest";

  const axiosSecure = useAxiosSecure();
  const inventoryVersion = useInventoryVersion();

  const requestKey = `${search}\u0000${sort}`;

  const [result, setResult] = useState({
    requestKey: "",
    products: [],
    error: "",
  });

  const isLoading = result.requestKey !== requestKey;
  const products = isLoading ? [] : result.products;
  const error = isLoading ? "" : result.error;

  useEffect(() => {
    const controller = new AbortController();

    axiosSecure
      .get("/products", {
        signal: controller.signal,
        params: {
          search,
          sort,
          view: "card",
        },
      })
      .then((response) => {
        setResult({
          requestKey,
          products: Array.isArray(response.data) ? response.data : [],
          error: "",
        });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;

        console.error("Products loading error:", error);

        setResult({
          requestKey,
          products: [],
          error: "Failed to load products.",
        });
      });

    return () => controller.abort();
  }, [axiosSecure, inventoryVersion, requestKey, search, sort]);

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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
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
          <h1 className="break-words text-2xl font-bold sm:text-3xl">
            {search ? `Search results for "${search}"` : "All Products"}
          </h1>

          {!isLoading && !error && (
            <p className="mt-2 text-sm text-base-content/60">
              {products.length} product
              {products.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        <label className="flex w-full flex-col items-start gap-2 sm:w-72">
          <span className="w-full text-left text-sm font-semibold sm:text-center sm:text-base">
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
        <div className="grid grid-cols-1 gap-4 min-[390px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
