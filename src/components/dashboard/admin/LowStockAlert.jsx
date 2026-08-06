import { Link } from "react-router";
import useProducts from "../../../hooks/useProducts";

const LowStockAlert = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <div className="card bg-base-200">
        <div className="card-body">
          <span className="loading loading-spinner"></span>
        </div>
      </div>
    );
  }

  const lowStock = products
    .filter((product) => product.totalStock <= 10)
    .sort((a, b) => a.totalStock - b.totalStock);

  return (
    <div className="card bg-base-200 border border-base-300 shadow">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">Low Stock Alert</h2>

          <Link to="/admin/products" className="text-primary text-sm">
            View Products
          </Link>
        </div>

        {lowStock.length === 0 ? (
          <p className="text-success">🎉 All products have sufficient stock.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>
                {lowStock.slice(0, 5).map((product) => (
                  <tr key={product._id}>
                    <td>{product.title}</td>

                    <td>
                      <span className="badge badge-error">
                        {product.totalStock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LowStockAlert;
