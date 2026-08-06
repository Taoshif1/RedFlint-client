import { Link } from "react-router";
import useAdminOrders from "../../../hooks/useAdminOrders";

const RecentOrders = () => {
  const { orders, loading } = useAdminOrders();

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "badge badge-warning";

      case "Processing":
        return "badge badge-info";

      case "Delivered":
        return "badge badge-success";

      case "Cancelled":
        return "badge badge-error";

      default:
        return "badge";
    }
  };

  if (loading) {
    return (
      <div className="card bg-base-200 border border-base-300 shadow">
        <div className="card-body">
          <span className="loading loading-spinner"></span>
        </div>
      </div>
    );
  }

  const recent = orders.slice(0, 5);

  return (
    <div className="card bg-base-200 border border-base-300 shadow">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">Recent Orders</h2>

          <Link to="/admin/orders" className="text-primary text-sm">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recent.map((order) => (
                <tr key={order._id}>
                  <td>{order.customerName || "Unknown"}</td>

                  <td>৳{order.total ?? 0}</td>

                  <td>
                    <span className={getStatusBadge(order.orderStatus)}>
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
