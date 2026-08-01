const orders = [
  {
    id: "#RF10231",
    date: "23 Jul 2026",
    status: "Delivered",
    total: "$129.99",
  },
  {
    id: "#RF10230",
    date: "20 Jul 2026",
    status: "Processing",
    total: "$79.99",
  },
  {
    id: "#RF10228",
    date: "18 Jul 2026",
    status: "Cancelled",
    total: "$49.99",
  },
];

const statusBadge = (status) => {
  switch (status) {
    case "Delivered":
      return "badge badge-success";
    case "Processing":
      return "badge badge-warning";
    case "Cancelled":
      return "badge badge-error";
    default:
      return "badge";
  }
};

const RecentOrders = () => {
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
              <tr key={order.id}>
                <td className="font-semibold">{order.id}</td>

                <td>{order.date}</td>

                <td>
                  <span className={statusBadge(order.status)}>
                    {order.status}
                  </span>
                </td>

                <td className="font-bold text-primary">{order.total}</td>

                <td>
                  <button className="btn btn-xs btn-primary">Details</button>
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
