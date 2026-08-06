import { Link } from "react-router";
import useProducts from "../../../hooks/useProducts";

const TopProducts = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <div className="card bg-base-200 border border-base-300 shadow">
        <div className="card-body">
          <span className="loading loading-spinner"></span>
        </div>
      </div>
    );
  }

  const featured = products.filter((product) => product.isFeatured).slice(0, 5);

  return (
    <div className="card bg-base-200 border border-base-300 shadow">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">Featured Products</h2>

          <Link to="/admin/products" className="text-primary text-sm">
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {featured.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{product.title}</h3>

                <p className="text-sm opacity-70">{product.category}</p>
              </div>

              <span className="badge badge-primary">৳{product.offerPrice}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
