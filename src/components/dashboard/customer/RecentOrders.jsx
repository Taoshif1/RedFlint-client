import useOrders from "../../../hooks/useOrders";
import { Link } from "react-router";

const statusBadge = (status) => {
  switch (status) {
    case "Delivered":
      return "badge badge-success";
    case "Processing":
      return "badge badge-info";
    case "Shipped":
      return "badge badge-secondary";
    case "Pending":
      return "badge badge-warning";
    case "Cancelled":
      return "badge badge-error";
    default:
      return "badge badge-neutral";
  }
};

const RecentOrders = () => {
  const { orders, loading } = useOrders();

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <section className="bg-base-200 rounded-box border border-base-300 shadow-md">
      <div className="p-6 border-b border-base-300 flex justify-between items-center">
        <h2 className="text-2xl font-bold red-hat">Recent Orders</h2>
        <Link to="/dashboard/recent-orders" className="btn btn-sm btn-outline btn-primary">
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-base-content/60">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="font-mono font-semibold">
                    {order.orderNumber || `#${String(order._id).slice(-6).toUpperCase()}`}
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={statusBadge(order.orderStatus)}>
                      {order.orderStatus || "Pending"}
                    </span>
                  </td>
                  <td className="font-bold text-primary">৳{Number(order.total || 0).toLocaleString("en-BD")}</td>
                  <td>
                    <Link to={`/dashboard/orders/${order._id}`} className="btn btn-xs btn-primary">
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentOrders;
