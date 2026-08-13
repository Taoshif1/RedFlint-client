import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";

import useAxiosSecure from "../hooks/useAxiosSecure";
import Product from "../components/shared/Product";

const EMPTY_PRODUCTS = [];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const sort = searchParams.get("sort") || "newest";

  const category = searchParams.get("category") || "";

  const axiosSecure = useAxiosSecure();

  const requestKey = `${search}\u0000${sort}`;

  const [result, setResult] = useState({
    requestKey: "",
    products: [],
    error: "",
  });

  const isLoading = result.requestKey !== requestKey;
  const products = isLoading ? EMPTY_PRODUCTS : result.products;
  const error = isLoading ? "" : result.error;

  const categories = useMemo(
    () =>
      [...new Set(products.map((product) => product.category?.trim()).filter(Boolean))]
        .sort((first, second) => first.localeCompare(second)),
    [products],
  );

  const filteredProducts = useMemo(
    () =>
      category
        ? products.filter((product) => product.category?.trim() === category)
        : products,
    [category, products],
  );

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
  }, [axiosSecure, requestKey, search, sort]);

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

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    const updatedParams = new URLSearchParams(searchParams);

    if (selectedCategory) {
      updatedParams.set("category", selectedCategory);
    } else {
      updatedParams.delete("category");
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

      {/* Heading, filtering, and sorting */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
        <div>
          <h1 className="break-words text-2xl font-bold sm:text-3xl">
            {search ? `Search results for "${search}"` : "All Products"}
          </h1>

          {!isLoading && !error && (
            <p className="mt-2 text-sm text-base-content/60">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        <div className="grid w-full gap-4 sm:w-auto sm:grid-cols-2">
          <label className="flex w-full flex-col items-start gap-2 sm:w-60">
            <span className="w-full text-left text-sm font-semibold sm:text-base">
              Filter by Category
            </span>

            <select
              value={category}
              onChange={handleCategoryChange}
              className="select select-bordered w-full"
            >
              <option value="">All Categories</option>
              {categories.map((availableCategory) => (
                <option key={availableCategory} value={availableCategory}>
                  {availableCategory}
                </option>
              ))}
            </select>
          </label>

          <label className="flex w-full flex-col items-start gap-2 sm:w-60">
            <span className="w-full text-left text-sm font-semibold sm:text-base">
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
      ) : filteredProducts.length === 0 ? (
        /* Empty results */
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">No products found</h2>

          <p className="text-base-content/60 mt-3">
            Try another search term or category.
          </p>
        </div>
      ) : (
        /* Product grid */
        <div className="grid grid-cols-1 gap-4 min-[390px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
