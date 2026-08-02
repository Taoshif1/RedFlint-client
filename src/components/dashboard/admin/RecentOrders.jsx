const orders = [
  {
    id: "#RF10231",
    customer: "John Doe",
    date: "23 Jul 2026",
    payment: "Paid",
    status: "Delivered",
    amount: "$129.99",
  },
  {
    id: "#RF10230",
    customer: "Alex Johnson",
    date: "20 Jul 2026",
    payment: "COD",
    status: "Processing",
    amount: "$79.99",
  },
  {
    id: "#RF10228",
    customer: "Sarah Williams",
    date: "18 Jul 2026",
    payment: "Paid",
    status: "Cancelled",
    amount: "$49.99",
  },
  {
    id: "#RF10227",
    customer: "Michael Brown",
    date: "17 Jul 2026",
    payment: "Paid",
    status: "Delivered",
    amount: "$220.00",
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

const paymentBadge = (payment) => {
  switch (payment) {
    case "Paid":
      return "badge badge-info";
    case "COD":
      return "badge badge-neutral";
    default:
      return "badge";
  }
};

const RecentOrders = () => {
  return (
    <section className="bg-[#181818] border border-zinc-800 rounded-2xl shadow-md mt-8">

      <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recent Orders</h2>

        <button className="btn btn-sm btn-outline btn-error">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>

                <td className="font-semibold">
                  {order.id}
                </td>

                <td>{order.customer}</td>

                <td>{order.date}</td>

                <td>
                  <span className={paymentBadge(order.payment)}>
                    {order.payment}
                  </span>
                </td>

                <td>
                  <span className={statusBadge(order.status)}>
                    {order.status}
                  </span>
                </td>

                <td className="font-bold text-red-500">
                  {order.amount}
                </td>

                <td>
                  <button className="btn btn-xs btn-error">
                    View
                  </button>
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