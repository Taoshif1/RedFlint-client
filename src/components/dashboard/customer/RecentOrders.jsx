import useOrders from "../../../hooks/useOrders";
import { Link } from "react-router";

const statusBadge = (status) => {
  switch (status) {
    case "Delivered":
      return "badge badge-success";

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
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="bg-base-200 rounded-box border border-base-300 shadow-md">
      <div className="p-6 border-b border-base-300 flex justify-between items-center">
        <h2 className="text-2xl font-bold red-hat">Recent Orders</h2>

        <button className="btn btn-sm btn-outline btn-primary">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="font-semibold">
                  #{order._id.toString().slice(-6).toUpperCase()}
                </td>

                <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                <td>
                  <span className={statusBadge(order.orderStatus)}>
                    {order.orderStatus}
                  </span>
                </td>

                <td className="font-bold text-primary">৳{order.total ?? 0}</td>

                <td>
                  <Link to={`/dashboard/orders/${order._id}`}>
                    <button className="btn btn-xs btn-primary">Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentOrders;
