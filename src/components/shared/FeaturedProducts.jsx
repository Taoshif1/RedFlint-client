import { Link } from "react-router";

import Product from "./Product";
import useFeaturedProducts from "../../hooks/useFeaturedProducts";

const FeaturedProducts = () => {
  const {
    products,
    loading,
    error,
  } = useFeaturedProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-primary text-sm font-semibold uppercase tracking-widest">
            Handpicked for you
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Featured Products
          </h2>
        </div>

        <Link
          to="/products"
          className="btn btn-outline btn-sm"
        >
          View All
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-error">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 border border-base-300 rounded-xl">
          <h3 className="text-xl font-semibold">
            No featured products available
          </h3>

          <p className="text-base-content/60 mt-2">
            Featured products will appear here soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;