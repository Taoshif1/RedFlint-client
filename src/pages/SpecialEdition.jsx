import { Link } from "react-router";
import useSpecialProducts from "../hooks/useSpecialProducts";

const SpecialEdition = () => {
  const { products, loading } = useSpecialProducts();

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">
          No Special Edition Products Found
        </h2>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Special Edition Collection
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product._id} className="card bg-base-200 shadow-xl">
            <figure className="h-72 bg-base-300">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>

              <p className="text-sm opacity-70 line-clamp-2">
                {product.description}
              </p>

              <div className="mt-2 flex justify-between items-center">
                <span className="text-xl font-bold text-primary">
                  ৳{product.price}
                </span>

                <div className="badge badge-secondary">Special</div>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/products/${product._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialEdition;
