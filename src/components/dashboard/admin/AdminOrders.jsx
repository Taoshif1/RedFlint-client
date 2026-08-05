import { Link } from "react-router";
import useAdminOrders from "../../../hooks/useAdminOrders";

const badge = (status) => {
  switch (status) {
    case "Delivered":
      return "badge badge-success";

    case "Pending":
      return "badge badge-warning";

    case "Cancelled":
      return "badge badge-error";

    default:
      return "badge";
  }
};

const AdminOrders = () => {
  const { orders, loading } = useAdminOrders();

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="bg-base-200 rounded-box border border-base-300 shadow">
      <div className="p-6 flex justify-between items-center border-b border-base-300">
        <h2 className="text-2xl font-bold">Latest Orders</h2>

        <Link to="/admin/orders">
          <button className="btn btn-primary btn-sm">View All</button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.slice(0, 5).map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>

                <td>
                  <span className={badge(order.orderStatus)}>
                    {order.orderStatus}
                  </span>
                </td>

                <td>৳ {order.total}</td>

                <td>
                  <Link to="/admin/orders">
                    <button className="btn btn-xs btn-primary">Manage</button>
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

export default AdminOrders;
